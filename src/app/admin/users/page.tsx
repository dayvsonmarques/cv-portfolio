"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState({ name: "", email: "", group: "", order: "name" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/groups")
      .then(res => res.json())
      .then((data) => {
        const nextGroups = Array.isArray(data)
          ? data
          : Array.isArray(data?.groups)
            ? data.groups
            : [];
        setGroups(nextGroups);
      });
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Usuários</h2>
          <Link
            href="/admin/users/new"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Novo
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg w-full mb-8 flex flex-col gap-4 border border-gray-200">
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
                    <Link className="bg-yellow-500 text-white px-2 py-1 rounded" href={`/admin/users/${user.id}/edit`}>Editar</Link>
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

        {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
