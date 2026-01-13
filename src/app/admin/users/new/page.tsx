"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
}

export default function NewUserPage() {
  const router = useRouter();

  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          groupId: groupId ? Number(groupId) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Erro ao criar usuário.");
        return;
      }

      router.push("/admin/users");
      router.refresh();
    } catch {
      setMessage("Erro ao criar usuário. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Novo Usuário</h2>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                className="mb-4 w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="groupId">
                Grupo (opcional)
              </label>
              <select
                id="groupId"
                name="groupId"
                className="mb-4 w-full p-2 border rounded"
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
