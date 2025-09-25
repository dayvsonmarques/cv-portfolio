"use client";
import React from "react";
import Link from "next/link";
import { menuItems } from "@/components/adminMenu";

const icons: Record<string, React.ReactElement> = {
  users: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87"/><path d="M9 20H4v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>,
  layers: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  shield: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  key: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="7" cy="15" r="4"/><path d="M7 15v-4a4 4 0 0 1 4-4h6"/><line x1="15" y1="7" x2="15" y2="7"/></svg>,
  edit: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
};

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-10">
        <span className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">CV</span>
        <span className="text-lg font-bold text-blue-700 tracking-wide">TailAdmin</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition">
                {icons[item.icon]}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
