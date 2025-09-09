'use client';

import { AppProvider } from "@/contexts/AppContext";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </SessionProvider>
  );
}
