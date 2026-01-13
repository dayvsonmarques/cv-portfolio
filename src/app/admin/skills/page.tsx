"use client";

import React from "react";
import Link from "next/link";

type SkillItem = { id: string; name: string };
type SkillCategory = { id: string; title: string; skills: SkillItem[] };

type ApiResponse = {
  id: number | null;
  language: string;
  title: string;
  categories: SkillCategory[];
};

export default function AdminSkillsPage() {
  const [categories, setCategories] = React.useState<SkillCategory[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [openCategoryId, setOpenCategoryId] = React.useState<string | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/skills");
      if (!res.ok) throw new Error("Falha ao carregar skills");
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

  React.useEffect(() => {
    if (categories.length === 0) {
      setOpenCategoryId(null);
      return;
    }

    if (openCategoryId && categories.some((c) => c.id === openCategoryId)) return;
    setOpenCategoryId(categories[0].id);
  }, [categories, openCategoryId]);

  const persist = React.useCallback(
    async (next: { categories: SkillCategory[] }) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories: next.categories }),
        });
        if (!res.ok) throw new Error("Falha ao salvar skills");
        const saved: ApiResponse = await res.json();
        setCategories(Array.isArray(saved.categories) ? saved.categories : []);
        showToast("Skills salvas.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setSaving(false);
      }
    },
    [showToast]
  );

  const filteredCategories = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        skills: c.skills.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((c) => c.title.toLowerCase().includes(q) || c.skills.length > 0);
  }, [categories, search]);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Habilidades</h1>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              className="border rounded-lg px-3 py-2 w-full sm:max-w-md"
              placeholder="Buscar por categoria ou skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading || saving}
            />
            <div className="flex flex-wrap gap-2">
              <Link
                href="../skills/add"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black disabled:opacity-60"
                aria-disabled={loading || saving}
                tabIndex={loading || saving ? -1 : 0}
              >
                Adicionar skill
              </Link>

              <Link
                href="/admin/skills/categories"
                className={`px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 text-gray-700 font-medium ${
                  loading || saving ? "pointer-events-none opacity-60" : ""
                }`}
              >
                + Categoria
              </Link>
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        {loading ? (
          <div className="text-gray-500">Carregando...</div>
        ) : (
          <div className="grid gap-4">
            {filteredCategories.map((cat) => {
              const isOpen = openCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <input
                      className="border rounded-lg px-3 py-2 w-full sm:max-w-md"
                      value={cat.title}
                      onChange={(e) => {
                        const next = categories.map((c) =>
                          c.id === cat.id ? { ...c, title: e.target.value } : c
                        );
                        setCategories(next);
                      }}
                      onBlur={async () => {
                        await persist({ categories });
                      }}
                      disabled={saving}
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                        disabled={saving}
                        onClick={() => {
                          setOpenCategoryId((prev) => (prev === cat.id ? null : cat.id));
                        }}
                      >
                        {isOpen ? "Fechar" : "Abrir"}
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                        disabled={saving}
                        onClick={async () => {
                          if (!confirm(`Excluir a categoria "${cat.title}"?`)) return;
                          const next = categories.filter((c) => c.id !== cat.id);
                          setCategories(next);
                          await persist({ categories: next });
                        }}
                      >
                        Excluir categoria
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 grid gap-2">
                      {cat.skills.map((skill) => (
                        <div key={skill.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input
                            className="border rounded-lg px-3 py-2 w-full"
                            value={skill.name}
                            onChange={(e) => {
                              const next = categories.map((c) => {
                                if (c.id !== cat.id) return c;
                                return {
                                  ...c,
                                  skills: c.skills.map((s) =>
                                    s.id === skill.id ? { ...s, name: e.target.value } : s
                                  ),
                                };
                              });
                              setCategories(next);
                            }}
                            onBlur={async () => {
                                await persist({ categories });
                            }}
                            disabled={saving}
                          />
                          <button
                            type="button"
                            className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-60"
                            disabled={saving}
                            onClick={async () => {
                              const next = categories.map((c) => {
                                if (c.id !== cat.id) return c;
                                return { ...c, skills: c.skills.filter((s) => s.id !== skill.id) };
                              });
                              setCategories(next);
                              await persist({ categories: next });
                            }}
                          >
                            Remover
                          </button>
                        </div>
                      ))}

                      <Link
                        href="../skills/add"
                        className="mt-2 inline-flex w-fit px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black"
                      >
                        Adicionar skill
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="text-gray-600 dark:text-gray-300">Nenhuma categoria encontrada.</div>
            )}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
