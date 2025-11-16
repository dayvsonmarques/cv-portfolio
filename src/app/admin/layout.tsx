import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área Administrativa | Dayvson Marques",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
