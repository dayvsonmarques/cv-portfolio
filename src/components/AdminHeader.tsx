"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const user = session?.user;
  return (
    <header className="w-full flex justify-between items-center bg-white border-b px-6 py-3 shadow-sm">
      <div className="text-xl font-bold text-blue-700 tracking-wide">CV Portfolio</div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 border"
          onClick={() => setOpen(!open)}
        >
          <span className="font-semibold">{user?.name || user?.email || "Usuário"}</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5"/></svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white text-gray-900 rounded shadow-lg z-10 border">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50" onClick={() => alert('Editar dados do usuário')}>Editar dados</button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50" onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
