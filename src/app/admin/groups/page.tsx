"use client";
import { useEffect, useState } from "react";

interface Permission {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  permissions: Permission[];
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/groups")
      .then(res => res.json())
      .then(data => setGroups(data.groups));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const perms = permissions.split(",").map(p => p.trim()).filter(Boolean);
    try {
      const res = await fetch("/api/admin/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, permissions: perms })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage("Grupo criado com sucesso!");
        setGroups([...groups, data]);
        setName("");
        setPermissions("");
      } else {
        setMessage(data.error || "Erro ao criar grupo");
      }
    } catch {
      setMessage("Erro ao criar grupo. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Grupo</h2>
        <input name="name" type="text" placeholder="Nome do grupo" className="mb-4 w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} required />
        <input name="permissions" type="text" placeholder="Permissões (separadas por vírgula)" className="mb-4 w-full p-2 border rounded" value={permissions} onChange={e => setPermissions(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Criar</button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
      <div className="w-80">
        <h3 className="text-xl font-bold mb-4">Grupos Existentes</h3>
        <ul>
          {groups.map((g) => (
            <li key={g.id} className="mb-2 p-2 border rounded bg-white">
              <strong>{g.name}</strong> <br />
              Permissões: {g.permissions.map((p) => p.name).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
