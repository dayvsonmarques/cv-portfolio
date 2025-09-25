"use client";
import React from "react";


export default function AdminContentPage() {
  // CRUD State & Logic
  interface Content {
    id?: number;
    section?: string;
    language?: string;
    title?: string;
    subtitle?: string;
    description?: string;
  data?: Record<string, unknown>;
    updatedAt?: string;
  }
  const [contents, setContents] = React.useState<Content[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState<Content | null>(null);
  const [form, setForm] = React.useState<Partial<Content>>({});

  const sections = [
    { key: "hero", label: "Hero" },
    { key: "about", label: "Sobre" },
    { key: "skills", label: "Skills" },
    { key: "experience", label: "Experiência" },
    { key: "projects", label: "Projetos" },
    { key: "contact", label: "Contato" },
    { key: "footer", label: "Footer" },
  ];
  const languages = [
    { key: "pt", label: "Português" },
    { key: "en", label: "Inglês" },
    { key: "es", label: "Espanhol" },
  ];

  const fetchContents = React.useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data: Content[] = await res.json();
    setContents(data);
    setLoading(false);
  }, []);
  React.useEffect(() => { fetchContents(); }, [fetchContents]);

  const handleEdit = (content: Content) => {
    setEditing(content);
    setForm(content);
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este conteúdo?")) return;
    await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchContents();
    setEditing(null);
  };
  const handleSave = async () => {
    if (editing) {
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing.id }),
      });
    } else {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    fetchContents();
    setEditing(null);
    setForm({});
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Gerenciar Conteúdo da Página Inicial</h1>
      <div className="mb-6 flex gap-4">
        <select
          className="border rounded px-3 py-2"
          value={form.section || ""}
          onChange={e => setForm((f: Partial<Content>) => ({ ...f, section: e.target.value }))}
        >
          <option value="">Selecione a seção</option>
          {sections.map(s => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={form.language || ""}
          onChange={e => setForm((f: Partial<Content>) => ({ ...f, language: e.target.value }))}
        >
          <option value="">Selecione o idioma</option>
          {languages.map(l => (
            <option key={l.key} value={l.key}>{l.label}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <input
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="Título"
          value={form.title || ""}
          onChange={e => setForm((f: Partial<Content>) => ({ ...f, title: e.target.value }))}
        />
        <input
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="Subtítulo"
          value={form.subtitle || ""}
          onChange={e => setForm((f: Partial<Content>) => ({ ...f, subtitle: e.target.value }))}
        />
        <textarea
          className="border rounded px-3 py-2 mb-2 w-full"
          placeholder="Descrição"
          value={form.description || ""}
          onChange={e => setForm((f: Partial<Content>) => ({ ...f, description: e.target.value }))}
        />
        <button
          className="bg-blue-700 text-white px-6 py-2 rounded font-semibold mt-2"
          onClick={handleSave}
        >
          {editing ? "Salvar Alterações" : "Adicionar Conteúdo"}
        </button>
        {editing && (
          <button
            className="ml-4 px-6 py-2 rounded border border-gray-400 text-gray-700"
            onClick={() => { setEditing(null); setForm({}); }}
          >
            Cancelar
          </button>
        )}
      </div>
      <h2 className="text-lg font-semibold mb-2">Conteúdos Cadastrados</h2>
      {loading ? (
        <div className="text-gray-500">Carregando...</div>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Seção</th>
              <th className="p-2">Idioma</th>
              <th className="p-2">Título</th>
              <th className="p-2">Subtítulo</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contents.map(content => (
              <tr key={content.id} className="border-t">
                <td className="p-2">{content.section}</td>
                <td className="p-2">{content.language}</td>
                <td className="p-2">{content.title}</td>
                <td className="p-2">{content.subtitle}</td>
                <td className="p-2">{content.description}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="text-blue-700 underline"
                    onClick={() => handleEdit(content)}
                  >Editar</button>
                  <button
                    className="text-red-600 underline"
                    onClick={() => content.id && handleDelete(content.id)}
                  >Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
