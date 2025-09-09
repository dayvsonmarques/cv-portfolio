"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  groupId?: number;
  group?: { id: number; name: string };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", groupId: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleEdit = (user: User) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, groupId: user.groupId ? user.groupId.toString() : "" });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, ...form, groupId: form.groupId ? Number(form.groupId) : undefined })
    });
    const data = await res.json();
    setMessage(data.error || "Usuário atualizado!");
    if (!data.error) {
      setUsers(users.map(u => u.id === editId ? data : u));
      setEditId(null);
      setForm({ name: "", email: "", groupId: "" });
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    setMessage(data.error || data.message);
    if (!data.error) setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Usuários</h2>
      <ul className="w-80 mb-8">
        {users.map(user => (
          <li key={user.id} className="mb-2 p-2 border rounded bg-white flex flex-col">
            <span><strong>{user.name}</strong> ({user.email})</span>
            <span>Grupo: {user.group?.name || user.groupId || "-"}</span>
            <div className="flex gap-2 mt-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(user)}>Editar</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      {editId && (
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded shadow-md w-80 mb-8">
          <h3 className="text-xl font-bold mb-4">Editar Usuário</h3>
          <input name="name" type="text" placeholder="Nome" className="mb-4 w-full p-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input name="email" type="email" placeholder="Email" className="mb-4 w-full p-2 border rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input name="groupId" type="number" placeholder="ID do grupo" className="mb-4 w-full p-2 border rounded" value={form.groupId} onChange={e => setForm({ ...form, groupId: e.target.value })} />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Salvar</button>
        </form>
      )}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
