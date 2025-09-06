import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserPermissions } from "@/lib/userService";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  // Exemplo: só permite acesso se usuário for do grupo 1 (admin)
  if (session.user.group !== "1") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-xl">Acesso restrito ao grupo administrador.</p></div>;
  }
  // Permissões podem ser consultadas via getUserPermissions(session.user.id)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
      <p>Bem-vindo, {session?.user?.name || "usuário"}!</p>
      {/* Adicione funcionalidades administrativas aqui */}
    </div>
  );
}
