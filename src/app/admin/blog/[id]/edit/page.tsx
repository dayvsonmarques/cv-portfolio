"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogPostForm, { BlogPostFormValues } from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Partial<BlogPostFormValues> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/blog/${params.id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Falha ao carregar post");
        const post = json.post;
        setInitialValues({
          title: post.title,
          slug: post.slug,
          image: post.image,
          date: post.date,
          excerpt: post.excerpt,
          content: post.content,
          tags: (post.tags ?? []).join(", "),
          categories: (post.categories ?? []).join(", "),
          author: post.author ?? "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    })();
  }, [params.id]);

  const handleSubmit = async (values: BlogPostFormValues) => {
    const res = await fetch(`/api/admin/blog/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
        categories: values.categories.split(",").map((c) => c.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Falha ao salvar post");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar post</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-3xl">{error}</div>}
      {!error && !initialValues && <p className="text-gray-500">Carregando...</p>}
      {!error && initialValues && (
        <BlogPostForm mode="edit" initialValues={initialValues} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
