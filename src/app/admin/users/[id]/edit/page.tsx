"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface Group {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  groupId?: number;
  group?: { id: number; name: string };
}

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const userId = useMemo(() => Number(params?.id), [params]);

  const [groups, setGroups] = useState<Group[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  useEffect(() => {
    if (!Number.isFinite(userId)) return;

    const paramsSearch = new URLSearchParams({ page: "1", pageSize: "200" });

    fetch(`/api/admin/users?${paramsSearch}`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.users) ? data.users : [];
        const found = list.find((u: User) => u.id === userId) ?? null;

        setUser(found);
        if (found) {
          setName(found.name ?? "");
          setEmail(found.email ?? "");
          setGroupId(found.groupId ? String(found.groupId) : "");
        }
      });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          name,
          email,
          groupId: groupId ? Number(groupId) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Erro ao atualizar usuário.");
        return;
      }

      router.push("/admin/users");
      router.refresh();
    } catch {
      setMessage("Erro ao atualizar usuário. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (!Number.isFinite(userId)) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto w-full max-w-xl">
          <p className="text-red-600">ID inválido.</p>
          <Link href="/admin/users" className="text-sm text-blue-700 hover:underline">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Editar Usuário</h2>
          <Link href="/admin/users" className="text-sm text-blue-700 hover:underline">
            Voltar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                className="mb-4 w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="mb-4 w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
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
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !user}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          {!user && <p className="mt-4 text-center text-red-600">Usuário não encontrado.</p>}
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
