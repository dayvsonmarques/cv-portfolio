"use client";

import React from "react";
import BlogPostForm, { BlogPostFormValues } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  const handleSubmit = async (values: BlogPostFormValues) => {
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
        categories: values.categories.split(",").map((c) => c.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Falha ao criar post");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Novo post</h1>
      <BlogPostForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
