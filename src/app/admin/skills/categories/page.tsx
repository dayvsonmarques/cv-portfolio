"use client";

import Link from "next/link";
import React from "react";

type SkillItem = { id: string; name: string };
type SkillCategory = { id: string; title: string; skills: SkillItem[] };

type ApiResponse = {
  id: number | null;
  language: string;
  title: string;
  categories: SkillCategory[];
};

export default function SkillsCategoriesPage() {
  const [categories, setCategories] = React.useState<SkillCategory[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/skills");
      if (!res.ok) throw new Error("Falha ao carregar categorias");
      const data: ApiResponse = await res.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const persistCategories = React.useCallback(
    async (nextCategories: SkillCategory[], toastMessage: string) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories: nextCategories }),
        });
        if (!res.ok) throw new Error("Falha ao salvar categorias");
        const saved: ApiResponse = await res.json();
        setCategories(Array.isArray(saved.categories) ? saved.categories : []);
        showToast(toastMessage);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setSaving(false);
      }
    },
    [showToast]
  );

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Categorias</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/skills"
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium"
          >
            Voltar
          </Link>
          <Link
            href="/admin/skills/categories/add"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black"
          >
            Nova categoria
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800">
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          {loading ? (
            <div className="text-gray-500">Carregando...</div>
          ) : categories.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-300">Nenhuma categoria encontrada.</div>
          ) : (
            <div className="grid gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor={`cat-${cat.id}`}>
                        Nome
                      </label>
                      <input
                        id={`cat-${cat.id}`}
                        className="border rounded-lg px-3 py-2 w-full"
                        value={cat.title}
                        disabled={saving}
                        onChange={(e) => {
                          const next = categories.map((c) => (c.id === cat.id ? { ...c, title: e.target.value } : c));
                          setCategories(next);
                        }}
                        onBlur={async () => {
                          await persistCategories(categories, "Categoria atualizada.");
                        }}
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        Skills: {Array.isArray(cat.skills) ? cat.skills.length : 0}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                      disabled={saving}
                      onClick={async () => {
                        if (!confirm(`Excluir a categoria \"${cat.title}\"?`)) return;
                        const next = categories.filter((c) => c.id !== cat.id);
                        setCategories(next);
                        await persistCategories(next, "Categoria excluída.");
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
