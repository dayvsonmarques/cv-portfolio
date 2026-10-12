"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  slug: string;
  title: string;
  date: string;
  categories: string[];
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

function formatDate(date: string): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : dateFormatter.format(parsed);
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blog");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Falha ao carregar posts");
      setPosts(json.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.categories.some((c) => c.toLowerCase().includes(term))
    );
  }, [posts, search]);

  const handleDelete = async (post: Post) => {
    if (!confirm(`Excluir o post "${post.title}"? Essa ação não pode ser desfeita.`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Falha ao excluir post");
      }
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      showToast("Post excluído.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Erro ao excluir post");
    }
  };

  return (
    <div className="p-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-sm text-gray-500">Posts publicados no site</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition"
        >
          + Novo post
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por título ou categoria..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md border rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p className="text-gray-500">Carregando...</p>}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Título</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Categorias</th>
                <th className="px-5 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                    Nenhum post encontrado.
                  </td>
                </tr>
              )}
              {filtered.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="px-5 py-3 font-medium text-gray-900">{post.title}</td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(post.date)}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.categories.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      title="Editar post"
                      aria-label="Editar post"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition mr-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(post)}
                      title="Excluir post"
                      aria-label="Excluir post"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
