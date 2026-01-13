"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Permission {
  id: number;
  name: string;
  groupId?: number;
  group?: { id: number; name: string };
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/permissions")
      .then((res) => res.json())
      .then((data) => {
        const nextPermissions = Array.isArray(data)
          ? data
          : Array.isArray(data?.permissions)
            ? data.permissions
            : [];
        setPermissions(nextPermissions);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/admin/permissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    setMessage(data.error || data.message);
    if (!data.error) setPermissions(permissions.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Permissões</h2>
          <Link
            href="/admin/permissions/new"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Novo
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg w-full mb-8 flex flex-col gap-4 border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Nome</th>
                <th className="p-2">Grupo</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">{perm.name}</td>
                  <td className="p-2">{perm.group?.name || perm.groupId || "-"}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Link
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        href={`/admin/permissions/${perm.id}/edit`}
                      >
                        Editar
                      </Link>
                      <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(perm.id)}>
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {permissions.length === 0 && (
            <div className="text-sm text-gray-600">Nenhuma permissão encontrada.</div>
          )}
        </div>

        {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
