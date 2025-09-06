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

export default function GroupPermissionsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/groups")
      .then(res => res.json())
      .then(setGroups);
    fetch("/api/admin/permissions")
      .then(res => res.json())
      .then(setPermissions);
  }, []);

  useEffect(() => {
    if (selectedGroup !== null) {
      const group = groups.find(g => g.id === selectedGroup);
      setSelectedPermissions(group?.permissions.map(p => p.id) || []);
    }
  }, [selectedGroup, groups]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin/groups/permissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId: selectedGroup, permissionIds: selectedPermissions })
    });
    const data = await res.json();
    setMessage(data.error || "Permissões atualizadas!");
    if (!data.error) {
      setGroups(groups.map(g => g.id === selectedGroup ? data : g));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Permissões do Grupo</h2>
        <select className="mb-4 w-full p-2 border rounded" value={selectedGroup ?? ""} onChange={e => setSelectedGroup(Number(e.target.value))} required>
          <option value="">Selecione um grupo</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <div className="mb-4">
          {permissions.map(p => (
            <label key={p.id} className="block mb-2">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(p.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedPermissions([...selectedPermissions, p.id]);
                  } else {
                    setSelectedPermissions(selectedPermissions.filter(id => id !== p.id));
                  }
                }}
              /> {p.name}
            </label>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Salvar Permissões</button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
