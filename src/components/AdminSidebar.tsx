"use client";
import React from "react";
import Link from "next/link";

const menuItems = [
  { name: "Usuários", href: "/admin/users" },
  { name: "Grupos", href: "/admin/groups" },
  { name: "Permissões", href: "/admin/permissions" },
  { name: "Permissões de Grupo", href: "/admin/groups/permissions" },
];

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="block px-4 py-2 rounded hover:bg-gray-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
