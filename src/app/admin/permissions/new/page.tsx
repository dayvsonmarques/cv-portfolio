"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
}

export default function NewPermissionPage() {
  const router = useRouter();

  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/groups")
      .then((res) => res.json())
      .then((data) => {
        const nextGroups = Array.isArray(data)
          ? data
          : Array.isArray(data?.groups)
            ? data.groups
            : [];
        setGroups(nextGroups);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          groupId: groupId ? Number(groupId) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Erro ao criar permissão.");
        return;
      }

      router.push("/admin/permissions");
      router.refresh();
    } catch {
      setMessage("Erro ao criar permissão. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Nova Permissão</h2>
          <Link href="/admin/permissions" className="text-sm text-blue-700 hover:underline">
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
            placeholder="Nome da permissão"
            className="mb-4 w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="groupId">
            Grupo (opcional)
          </label>
          <select
            id="groupId"
            name="groupId"
            className="mb-6 w-full p-2 border rounded"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">Sem grupo</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

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
