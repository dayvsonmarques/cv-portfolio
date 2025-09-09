"use client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await res.json();
    setMessage(data.error || data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Redefinir Senha</h2>
        <input name="token" type="text" placeholder="Token de recuperação" className="mb-4 w-full p-2 border rounded" value={token} onChange={e => setToken(e.target.value)} required />
        <input name="newPassword" type="password" placeholder="Nova senha" className="mb-4 w-full p-2 border rounded" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Redefinir</button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
