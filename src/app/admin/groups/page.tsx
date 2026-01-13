"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Grupos</h2>
          <Link
            href="/admin/groups/new"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Novo
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg w-full flex flex-col gap-4 border border-gray-200">
          <ul>
            {groups.map((g) => (
              <li key={g.id} className="mb-2 p-3 border rounded bg-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-800">{g.name}</div>
                    <div className="text-sm text-gray-600">
                      Permissões: {g.permissions.map((p) => p.name).join(", ")}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {groups.length === 0 && (
            <div className="text-sm text-gray-600">Nenhum grupo encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}
