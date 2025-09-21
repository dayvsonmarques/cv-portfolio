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
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", groupId: "" });
  const [message, setMessage] = useState("");
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", groupId: "" });
  const [filter, setFilter] = useState({ name: "", email: "", group: "", order: "name" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...createForm, groupId: createForm.groupId ? Number(createForm.groupId) : undefined })
    });
    const data = await res.json();
    setMessage(data.error || "Usuário criado!");
    if (!data.error) {
      setUsers([...users, data]);
      setCreateForm({ name: "", email: "", password: "", groupId: "" });
    }
  };

  useEffect(() => {
    fetch("/api/admin/groups")
      .then(res => res.json())
      .then(setGroups);
    setLoading(true);
    const params = new URLSearchParams({
      name: filter.name,
      email: filter.email,
      group: filter.group,
      page: page.toString(),
      pageSize: pageSize.toString()
    });
    fetch(`/api/admin/users?${params}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setTotal(data.total);
        setLoading(false);
      });
  }, [filter, page, pageSize]);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setPage(1);
  };
  const totalPages = Math.ceil(total / pageSize);

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
      <form onSubmit={handleCreate} className="bg-white p-8 rounded shadow-md w-full max-w-xl mb-8">
        <h3 className="text-xl font-bold mb-4">Criar Usuário</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" type="text" placeholder="Nome" className="mb-4 w-full p-2 border rounded" value={createForm.name} onChange={e => setCreateForm({ ...createForm, name: e.target.value })} required />
          <input name="email" type="email" placeholder="Email" className="mb-4 w-full p-2 border rounded" value={createForm.email} onChange={e => setCreateForm({ ...createForm, email: e.target.value })} required />
          <input name="password" type="password" placeholder="Senha" className="mb-4 w-full p-2 border rounded" value={createForm.password} onChange={e => setCreateForm({ ...createForm, password: e.target.value })} required />
          <select name="groupId" className="mb-4 w-full p-2 border rounded" value={createForm.groupId} onChange={e => setCreateForm({ ...createForm, groupId: e.target.value })}>
            <option value="">Selecione o grupo</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Criar</button>
      </form>
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-6xl mb-8 flex flex-col gap-4 border border-gray-200">
        <div className="flex flex-wrap gap-4 mb-4">
          <input name="name" type="text" placeholder="Filtrar por nome" className="p-2 border rounded" value={filter.name} onChange={handleFilterChange} />
          <input name="email" type="text" placeholder="Filtrar por email" className="p-2 border rounded" value={filter.email} onChange={handleFilterChange} />
          <select name="group" className="p-2 border rounded" value={filter.group} onChange={handleFilterChange}>
            <option value="">Filtrar por grupo</option>
            {groups.map(g => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-gray-500">Carregando...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 cursor-pointer" onClick={() => setFilter(f => ({ ...f, order: f.order === 'name' ? '-name' : 'name' }))}>Nome</th>
                <th className="p-2 cursor-pointer" onClick={() => setFilter(f => ({ ...f, order: f.order === 'email' ? '-email' : 'email' }))}>Email</th>
                <th className="p-2 cursor-pointer" onClick={() => setFilter(f => ({ ...f, order: f.order === 'group' ? '-group' : 'group' }))}>Grupo</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.group?.name || user.groupId || "-"}</td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(user)}>Editar</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-between items-center mt-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Próxima</button>
        </div>
      </div>
      {editId && (
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded shadow-md w-full max-w-xl mb-8">
          <h3 className="text-xl font-bold mb-4">Editar Usuário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Nome" className="mb-4 w-full p-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input name="email" type="email" placeholder="Email" className="mb-4 w-full p-2 border rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input name="groupId" type="number" placeholder="ID do grupo" className="mb-4 w-full p-2 border rounded" value={form.groupId} onChange={e => setForm({ ...form, groupId: e.target.value })} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Salvar</button>
        </form>
      )}
      {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
