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

export default function AddSkillCategoryPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

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
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      })
      .catch((e) => {
        setMessage(e instanceof Error ? e.message : "Erro desconhecido");
      })
      .finally(() => setLoading(false));
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(categoryTitle.trim()) && !loading && !saving;
  }, [categoryTitle, loading, saving]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const nextCategories: SkillCategory[] = [
        ...categories,
        { id: uuid(), title: categoryTitle.trim(), skills: [] },
      ];

      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: nextCategories }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Erro ao criar categoria.");
        return;
      }

      router.push("/admin/skills/categories");
      router.refresh();
    } catch {
      setMessage("Erro ao criar categoria. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Nova categoria</h2>
          <Link href="/admin/skills/categories" className="text-sm text-blue-700 hover:underline">
            Voltar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="categoryTitle">
            Nome da categoria
          </label>
          <input
            id="categoryTitle"
            name="categoryTitle"
            type="text"
            placeholder="Ex: Front-end"
            className="mb-6 w-full p-2 border rounded"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            disabled={loading || saving}
            required
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Criar"}
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
