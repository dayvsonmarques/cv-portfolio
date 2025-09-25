import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import UsersBarChart from "@/components/UsersBarChart";
import GroupsPieChart from "@/components/GroupsPieChart";
import PermissionsLineChart from "@/components/PermissionsLineChart";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  // Exemplo: só permite acesso se usuário for do grupo 1 (admin)
  // Permissões podem ser consultadas via getUserPermissions(session.user.id)
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
      <p>Bem-vindo, {session?.user?.name || "usuário"}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Dashboard de exemplo - gráficos */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Gráfico de Usuários</h2>
          <div className="h-48 flex items-center justify-center">
            <div className="w-full h-full">
              <UsersBarChart />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Grupos de Usuários</h2>
          <div className="h-48 flex items-center justify-center">
            <div className="w-full h-full">
              <GroupsPieChart />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Permissões</h2>
          <div className="h-48 flex items-center justify-center">
            <div className="w-full h-full">
              <PermissionsLineChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
