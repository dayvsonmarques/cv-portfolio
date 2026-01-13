"use client";

import React from "react";
import type { ExperienceType } from "@/types/experience";

type TitlesByLang = { pt: string; en: string; es: string };
type ApiResponse = { titlesByLang: TitlesByLang; items: ExperienceType[] };

const LANGS = [
  { key: "pt", label: "Português" },
  { key: "en", label: "Inglês" },
  { key: "es", label: "Espanhol" },
] as const;

function emptyI18n() {
  return { pt: "", en: "", es: "" };
}

function parseTech(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminExperiencePage() {
  const [titlesByLang, setTitlesByLang] = React.useState<TitlesByLang>({
    pt: "Experiência",
    en: "Experience",
    es: "Experiencia",
  });
  const [items, setItems] = React.useState<ExperienceType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<ExperienceDraft | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/experience");
      if (!res.ok) throw new Error("Falha ao carregar experiências");
      const data: ApiResponse = await res.json();
      setTitlesByLang((prev) => data.titlesByLang ?? prev);
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const persist = React.useCallback(
    async (next: { titlesByLang: TitlesByLang; items: ExperienceType[] }, toastMessage?: string) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/experience", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (!res.ok) throw new Error("Falha ao salvar experiências");
        const saved: ApiResponse = await res.json();
        setTitlesByLang(saved.titlesByLang);
        setItems(saved.items);
        showToast(toastMessage ?? "Experiências salvas.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setSaving(false);
      }
    },
    [showToast]
  );

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((exp) => {
      const hay = [
        exp.company.pt,
        exp.company.en,
        exp.company.es,
        exp.title.pt,
        exp.title.en,
        exp.title.es,
        exp.description.pt,
        exp.description.en,
        exp.description.es,
        ...(exp.technologies ?? []),
        exp.startDate,
        exp.endDate ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, search]);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Gerenciar Experiências</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            CRUD completo (inclui textos pt/en/es e tecnologias).
          </p>
        </div>

        <button
          type="button"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-60"
          disabled={loading || saving}
          onClick={() => {
            setEditingIndex(null);
            setDraft(draftFromExperience(null));
          }}
        >
          + Nova experiência
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Título da seção</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {LANGS.map((l) => (
              <label key={l.key} className="grid gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{l.label}</span>
                <input
                  className="border rounded-lg px-3 py-2"
                  value={titlesByLang[l.key]}
                  onChange={(e) => setTitlesByLang((prev) => ({ ...prev, [l.key]: e.target.value }))}
                  disabled={loading || saving}
                />
              </label>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <input
              className="border rounded-lg px-3 py-2 w-full sm:max-w-md"
              placeholder="Buscar por empresa, cargo, tecnologia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading || saving}
            />
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black disabled:opacity-60"
              disabled={loading || saving}
              onClick={() => persist({ titlesByLang, items }, "Título salvo.")}
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        {loading ? (
          <div className="text-gray-500">Carregando...</div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((exp) => (
              <div
                key={`${exp.company.pt}-${exp.startDate}-${exp.endDate ?? "present"}`}
                className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {exp.title.pt || exp.title.en || exp.title.es} · {exp.company.pt || exp.company.en || exp.company.es}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)}
                      {exp.technologies?.length ? ` · ${exp.technologies.length} techs` : ""}
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
                      {exp.description.pt || exp.description.en || exp.description.es}
                    </div>
                  </div>

                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 text-gray-700 font-medium disabled:opacity-60"
                      disabled={saving}
                      onClick={() => {
                        const idx = items.indexOf(exp);
                        setEditingIndex(idx);
                        setDraft(draftFromExperience(exp));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-medium disabled:opacity-60"
                      disabled={saving}
                      onClick={async () => {
                        if (!confirm("Excluir esta experiência?")) return;
                        const nextItems = items.filter((x) => x !== exp);
                        setItems(nextItems);
                        await persist({ titlesByLang, items: nextItems }, "Experiência removida.");
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-gray-600 dark:text-gray-300">Nenhuma experiência encontrada.</div>
            )}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}

      {draft && (
        <ExperienceModal
          saving={saving}
          draft={draft}
          onClose={() => setDraft(null)}
          onChange={setDraft}
          onSave={async () => {
            const normalized = draftToExperience(draft);
            const validation = validateExperience(normalized);
            if (validation) {
              showToast(validation);
              return;
            }

            const nextItems = [...items];
            if (editingIndex == null) {
              nextItems.unshift(normalized);
            } else {
              nextItems[editingIndex] = normalized;
            }
            setItems(nextItems);
            await persist(
              { titlesByLang, items: nextItems },
              editingIndex == null ? "Experiência criada." : "Experiência atualizada."
            );
            setDraft(null);
          }}
        />
      )}
    </div>
  );
}

function formatPeriod(startDate: string, endDate?: string | null, isCurrent?: boolean) {
  const end = isCurrent ? "atual" : endDate || "";
  return end ? `${startDate} → ${end}` : startDate;
}

type ExperienceDraft = {
  title: TitlesByLang;
  company: TitlesByLang;
  description: TitlesByLang;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  technologiesText: string;
};

function draftFromExperience(exp: ExperienceType | null): ExperienceDraft {
  if (!exp) {
    return {
      title: emptyI18n(),
      company: emptyI18n(),
      description: emptyI18n(),
      startDate: "",
      endDate: "",
      isCurrent: false,
      technologiesText: "",
    };
  }

  return {
    title: { ...exp.title },
    company: { ...exp.company },
    description: { ...exp.description },
    startDate: exp.startDate,
    endDate: exp.endDate ?? "",
    isCurrent: Boolean(exp.isCurrent),
    technologiesText: (exp.technologies ?? []).join(", "),
  };
}

function draftToExperience(d: ExperienceDraft): ExperienceType {
  return {
    title: {
      pt: d.title.pt.trim(),
      en: d.title.en.trim(),
      es: d.title.es.trim(),
    },
    company: {
      pt: d.company.pt.trim(),
      en: d.company.en.trim(),
      es: d.company.es.trim(),
    },
    description: {
      pt: d.description.pt.trim(),
      en: d.description.en.trim(),
      es: d.description.es.trim(),
    },
    startDate: d.startDate.trim(),
    endDate: d.isCurrent ? null : d.endDate.trim() || null,
    isCurrent: d.isCurrent,
    technologies: parseTech(d.technologiesText),
  };
}

function validateExperience(exp: ExperienceType): string | null {
  if (!exp.startDate.trim()) return "Start date é obrigatório.";
  if (!exp.title.pt && !exp.title.en && !exp.title.es) return "Informe ao menos um título (pt/en/es).";
  if (!exp.company.pt && !exp.company.en && !exp.company.es) return "Informe ao menos uma empresa (pt/en/es).";
  if (!exp.description.pt && !exp.description.en && !exp.description.es) return "Informe ao menos uma descrição (pt/en/es).";
  return null;
}

function ExperienceModal({
  draft,
  onChange,
  onClose,
  onSave,
  saving,
}: {
  draft: ExperienceDraft;
  onChange: (d: ExperienceDraft) => void;
  onClose: () => void;
  onSave: () => Promise<void>;
  saving: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Editar experiência"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-gray-950 p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">Experiência</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Edite os textos em pt/en/es e tecnologias.</div>
          </div>
          <button
            type="button"
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={onClose}
            disabled={saving}
          >
            Fechar
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Início (YYYY-MM-DD)</span>
              <input
                className="border rounded-lg px-3 py-2"
                value={draft.startDate}
                onChange={(e) => onChange({ ...draft, startDate: e.target.value })}
                disabled={saving}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Fim (YYYY-MM-DD)</span>
              <input
                className="border rounded-lg px-3 py-2"
                value={draft.endDate}
                onChange={(e) => onChange({ ...draft, endDate: e.target.value })}
                disabled={saving || draft.isCurrent}
              />
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={draft.isCurrent}
                onChange={(e) => onChange({ ...draft, isCurrent: e.target.checked })}
                disabled={saving}
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">Atual</span>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {LANGS.map((l) => (
              <label key={`title-${l.key}`} className="grid gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Título ({l.key})</span>
                <input
                  className="border rounded-lg px-3 py-2"
                  value={draft.title[l.key]}
                  onChange={(e) => onChange({ ...draft, title: { ...draft.title, [l.key]: e.target.value } })}
                  disabled={saving}
                />
              </label>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {LANGS.map((l) => (
              <label key={`company-${l.key}`} className="grid gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Empresa ({l.key})</span>
                <input
                  className="border rounded-lg px-3 py-2"
                  value={draft.company[l.key]}
                  onChange={(e) => onChange({ ...draft, company: { ...draft.company, [l.key]: e.target.value } })}
                  disabled={saving}
                />
              </label>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {LANGS.map((l) => (
              <label key={`desc-${l.key}`} className="grid gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Descrição ({l.key})</span>
                <textarea
                  className="border rounded-lg px-3 py-2 min-h-28"
                  value={draft.description[l.key]}
                  onChange={(e) =>
                    onChange({
                      ...draft,
                      description: { ...draft.description, [l.key]: e.target.value },
                    })
                  }
                  disabled={saving}
                />
              </label>
            ))}
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Tecnologias (separado por vírgula)</span>
            <input
              className="border rounded-lg px-3 py-2"
              value={draft.technologiesText}
              onChange={(e) => onChange({ ...draft, technologiesText: e.target.value })}
              disabled={saving}
              placeholder="React, TypeScript, Next.js"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
