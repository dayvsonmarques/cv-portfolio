"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;

  return (
    <header className="w-full flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow">
      <div className="text-2xl font-bold">CV Portfolio</div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
          onClick={() => setOpen(!open)}
        >
          <span>{user?.name || user?.email || "Usuário"}</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5"/></svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded shadow z-10">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => alert('Editar dados do usuário')}>Editar dados</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
