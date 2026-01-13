"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type SkillItem = { id: string; name: string };
type SkillCategory = { id: string; title: string; skills: SkillItem[] };

type ApiResponse = {
  id: number | null;
  language: string;
  title: string;
  categories: SkillCategory[];
};

function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AddSkillPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setMessage("");

    fetch("/api/admin/skills")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar habilidades");
        return res.json();
      })
      .then((data: ApiResponse) => {
        const nextCategories = Array.isArray(data.categories) ? data.categories : [];
        setCategories(nextCategories);
        setCategoryId(nextCategories[0]?.id ?? "");
      })
      .catch((e) => {
        setMessage(e instanceof Error ? e.message : "Erro desconhecido");
      })
      .finally(() => setLoading(false));
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(categoryId && name.trim()) && !loading && !saving;
  }, [categoryId, name, loading, saving]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const nextCategories = categories.map((c) => {
        if (c.id !== categoryId) return c;
        return { ...c, skills: [...c.skills, { id: uuid(), name: name.trim() }] };
      });

      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: nextCategories }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Erro ao adicionar skill.");
        return;
      }

      router.push("/admin/skills");
      router.refresh();
    } catch {
      setMessage("Erro ao adicionar skill. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Adicionar skill</h2>
          <Link href="/admin/skills" className="text-sm text-blue-700 hover:underline">
            Voltar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="categoryId">
            Categoria
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="mb-4 w-full p-2 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loading || saving}
            required
          >
            {categories.length === 0 ? (
              <option value="">Nenhuma categoria cadastrada</option>
            ) : (
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))
            )}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Nome da skill
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ex: TypeScript"
            className="mb-6 w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || saving}
            required
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Adicionar"}
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}

          {categories.length === 0 && !loading && (
            <p className="mt-4 text-center text-gray-600">
              Crie uma categoria primeiro na página de Habilidades.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
