"use client";
import React, { useEffect, useState } from "react";

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

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [form, setForm] = useState<{ name: string; groupId: string }>({ name: "", groupId: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/permissions").then(res => res.json()).then(setPermissions);
    fetch("/api/admin/groups").then(res => res.json()).then(setGroups);
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin/permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, groupId: form.groupId ? Number(form.groupId) : undefined })
    });
    const data = await res.json();
    setMessage(data.error || "Permissão criada!");
    if (!data.error) {
      setPermissions([...permissions, data]);
      setForm({ name: "", groupId: "" });
    }
  };

  const handleEdit = (perm: Permission) => {
    setEditId(perm.id);
    setForm({ name: perm.name, groupId: perm.groupId ? perm.groupId.toString() : "" });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin/permissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, name: form.name, groupId: form.groupId ? Number(form.groupId) : undefined })
    });
    const data = await res.json();
    setMessage(data.error || "Permissão atualizada!");
    if (!data.error) {
      setPermissions(permissions.map(p => p.id === editId ? data : p));
      setEditId(null);
      setForm({ name: "", groupId: "" });
    }
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Permissões</h2>
      <form onSubmit={editId ? handleUpdate : handleCreate} className="bg-white p-8 rounded shadow-md w-full max-w-xl mb-8">
        <h3 className="text-xl font-bold mb-4">{editId ? "Editar Permissão" : "Criar Permissão"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" type="text" placeholder="Nome da permissão" className="mb-4 w-full p-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <select name="groupId" className="mb-4 w-full p-2 border rounded" value={form.groupId} onChange={e => setForm({ ...form, groupId: e.target.value })}>
            <option value="">Associar a grupo</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{editId ? "Salvar" : "Criar"}</button>
        {editId && (
          <button type="button" className="ml-4 px-6 py-2 rounded border border-gray-400 text-gray-700" onClick={() => { setEditId(null); setForm({ name: "", groupId: "" }); }}>Cancelar</button>
        )}
      </form>
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl mb-8 flex flex-col gap-4 border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nome</th>
              <th className="p-2">Grupo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(perm => (
              <tr key={perm.id} className="border-t hover:bg-gray-50">
                <td className="p-2 font-semibold text-gray-700">{perm.name}</td>
                <td className="p-2">{perm.group?.name || perm.groupId || "-"}</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(perm)}>Editar</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(perm.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
