"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface Permission {
  id: number;
  name: string;
  groupId?: number;
  group?: { id: number; name: string };
}

interface Group {
  id: number;
  name: string;
}

export default function EditPermissionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const permissionId = useMemo(() => Number(params?.id), [params]);

  const [groups, setGroups] = useState<Group[]>([]);
  const [permission, setPermission] = useState<Permission | null>(null);
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

  useEffect(() => {
    if (!Number.isFinite(permissionId)) return;

    fetch("/api/admin/permissions")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.permissions)
            ? data.permissions
            : [];

        const found = list.find((p: Permission) => p.id === permissionId) ?? null;
        setPermission(found);

        if (found) {
          setName(found.name ?? "");
          setGroupId(found.groupId ? String(found.groupId) : "");
        }
      });
  }, [permissionId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/permissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: permissionId,
          name,
          groupId: groupId ? Number(groupId) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Erro ao atualizar permissão.");
        return;
      }

      router.push("/admin/permissions");
      router.refresh();
    } catch {
      setMessage("Erro ao atualizar permissão. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (!Number.isFinite(permissionId)) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto w-full max-w-xl">
          <p className="text-red-600">ID inválido.</p>
          <Link href="/admin/permissions" className="text-sm text-blue-700 hover:underline">
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
          <h2 className="text-2xl font-bold">Editar Permissão</h2>
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
            disabled={saving || !permission}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          {!permission && (
            <p className="mt-4 text-center text-red-600">
              Permissão não encontrada.
            </p>
          )}

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
