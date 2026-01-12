"use client";

import React from "react";

type SkillItem = { id: string; name: string };
type SkillCategory = { id: string; title: string; skills: SkillItem[] };

type ApiResponse = {
  id: number | null;
  language: string;
  title: string;
  categories: SkillCategory[];
};

const LANGS = [
  { key: "pt", label: "Português" },
  { key: "en", label: "Inglês" },
  { key: "es", label: "Espanhol" },
] as const;

function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AdminSkillsPage() {
  const [language, setLanguage] = React.useState<(typeof LANGS)[number]["key"]>("pt");
  const [title, setTitle] = React.useState<string>("");
  const [categories, setCategories] = React.useState<SkillCategory[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchData = React.useCallback(async (lang: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/skills?language=${encodeURIComponent(lang)}`);
      if (!res.ok) throw new Error("Falha ao carregar skills");
      const data: ApiResponse = await res.json();
      setTitle(data.title ?? "");
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData(language);
  }, [fetchData, language]);

  const persist = React.useCallback(
    async (next: { title: string; categories: SkillCategory[] }) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, title: next.title, categories: next.categories }),
        });
        if (!res.ok) throw new Error("Falha ao salvar skills");
        const saved: ApiResponse = await res.json();
        setTitle(saved.title ?? "");
        setCategories(Array.isArray(saved.categories) ? saved.categories : []);
        showToast("Skills salvas.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setSaving(false);
      }
    },
    [language, showToast]
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
          <h1 className="text-2xl font-bold text-blue-700">Gerenciar Skills</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            CRUD de categorias e skills, com persistência em banco.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {LANGS.map((l) => (
            <button
              key={l.key}
              type="button"
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                language === l.key
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"
              }`}
              onClick={() => setLanguage(l.key)}
              disabled={saving}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="grid gap-1 flex-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Título da seção</span>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Skills"
                disabled={loading || saving}
              />
            </label>

            <button
              type="button"
              className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-60"
              onClick={() => persist({ title, categories })}
              disabled={loading || saving}
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              className="border rounded-lg px-3 py-2 w-full sm:max-w-md"
              placeholder="Buscar por categoria ou skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading || saving}
            />
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 text-gray-700 font-medium disabled:opacity-60"
              disabled={loading || saving}
              onClick={async () => {
                const next = [
                  ...categories,
                  { id: uuid(), title: "Nova categoria", skills: [] },
                ];
                setCategories(next);
                await persist({ title, categories: next });
              }}
            >
              + Categoria
            </button>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        {loading ? (
          <div className="text-gray-500">Carregando...</div>
        ) : (
          <div className="grid gap-4">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    className="border rounded-lg px-3 py-2 w-full sm:max-w-md"
                    value={cat.title}
                    onChange={(e) => {
                      const next = categories.map((c) => (c.id === cat.id ? { ...c, title: e.target.value } : c));
                      setCategories(next);
                    }}
                    onBlur={async () => {
                      await persist({ title, categories });
                    }}
                    disabled={saving}
                  />

                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                    disabled={saving}
                    onClick={async () => {
                      if (!confirm(`Excluir a categoria "${cat.title}"?`)) return;
                      const next = categories.filter((c) => c.id !== cat.id);
                      setCategories(next);
                      await persist({ title, categories: next });
                    }}
                  >
                    Excluir categoria
                  </button>
                </div>

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
                              skills: c.skills.map((s) => (s.id === skill.id ? { ...s, name: e.target.value } : s)),
                            };
                          });
                          setCategories(next);
                        }}
                        onBlur={async () => {
                          await persist({ title, categories });
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
                          await persist({ title, categories: next });
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  ))}

                  <AddSkillRow
                    disabled={saving}
                    onAdd={async (name) => {
                      const next = categories.map((c) => {
                        if (c.id !== cat.id) return c;
                        return { ...c, skills: [...c.skills, { id: uuid(), name }] };
                      });
                      setCategories(next);
                      await persist({ title, categories: next });
                    }}
                  />
                </div>
              </div>
            ))}

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

function AddSkillRow({ disabled, onAdd }: { disabled: boolean; onAdd: (name: string) => Promise<void> }) {
  const [value, setValue] = React.useState("");

  return (
    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        className="border rounded-lg px-3 py-2 w-full"
        placeholder="Adicionar skill (ex: TypeScript)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black disabled:opacity-60"
        disabled={disabled || !value.trim()}
        onClick={async () => {
          const name = value.trim();
          if (!name) return;
          setValue("");
          await onAdd(name);
        }}
      >
        Adicionar
      </button>
    </div>
  );
}
