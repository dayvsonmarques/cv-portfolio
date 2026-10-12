"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RichTextEditor from "./RichTextEditor";

export type BlogPostFormValues = {
  title: string;
  slug: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string;
  categories: string;
  author: string;
};

type BlogPostFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<BlogPostFormValues>;
  onSubmit: (values: BlogPostFormValues) => Promise<void>;
};

const EMPTY: BlogPostFormValues = {
  title: "",
  slug: "",
  image: "",
  date: "",
  excerpt: "",
  content: "",
  tags: "",
  categories: "",
  author: "",
};

export default function BlogPostForm({ mode, initialValues, onSubmit }: BlogPostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<BlogPostFormValues>({ ...EMPTY, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (title: string) => {
    setValues((v) => ({
      ...v,
      title,
      slug: slugTouched ? v.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(values);
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar o post");
    } finally {
      setSaving(false);
    }
  };

  const input = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const label = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}

      <div>
        <label className={label}>Título</label>
        <input
          className={input}
          value={values.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={label}>Slug</label>
        <input
          className={input}
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            setValues((v) => ({ ...v, slug: e.target.value }));
          }}
          required
        />
        <p className="text-xs text-gray-400 mt-1">Usado na URL: /blog/{values.slug || "..."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>Imagem de capa (URL)</label>
          <input
            className={input}
            value={values.image}
            onChange={(e) => setValues((v) => ({ ...v, image: e.target.value }))}
            placeholder="https://..."
            required
          />
        </div>
        <div>
          <label className={label}>Data</label>
          <input
            type="date"
            className={input}
            value={values.date}
            onChange={(e) => setValues((v) => ({ ...v, date: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <label className={label}>Resumo</label>
        <textarea
          className={input}
          rows={3}
          value={values.excerpt}
          onChange={(e) => setValues((v) => ({ ...v, excerpt: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className={label}>Conteúdo</label>
        <RichTextEditor
          value={values.content}
          onChange={(html) => setValues((v) => ({ ...v, content: html }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>Tags (separadas por vírgula)</label>
          <input
            className={input}
            value={values.tags}
            onChange={(e) => setValues((v) => ({ ...v, tags: e.target.value }))}
          />
        </div>
        <div>
          <label className={label}>Categorias (separadas por vírgula)</label>
          <input
            className={input}
            value={values.categories}
            onChange={(e) => setValues((v) => ({ ...v, categories: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className={label}>Autor</label>
        <input
          className={input}
          value={values.author}
          onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {saving ? "Salvando..." : mode === "create" ? "Criar post" : "Salvar alterações"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-5 py-2.5 border rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
