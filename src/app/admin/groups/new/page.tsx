"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewGroupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [message, setMessage] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const permissionIds = permissions
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => Number(p))
      .filter(Number.isFinite);

    try {
      const res = await fetch("/api/admin/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, permissions: permissionIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Erro ao criar grupo.");
        return;
      }

      router.push("/admin/groups");
      router.refresh();
    } catch {
      setMessage("Erro ao criar grupo. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Novo Grupo</h2>
          <Link href="/admin/groups" className="text-sm text-blue-700 hover:underline">
            Voltar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nome do grupo"
            className="mb-4 w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="permissions">
            Permissões (IDs separados por vírgula)
          </label>
          <input
            id="permissions"
            name="permissions"
            type="text"
            placeholder="Ex: 1, 2, 3"
            className="mb-6 w-full p-2 border rounded"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Criando..." : "Criar"}
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
