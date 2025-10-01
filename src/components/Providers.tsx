'use client';

import { AppProvider } from "@/contexts/AppContext";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
  initialTheme: "light" | "dark";
  initialLanguage: "pt" | "en" | "es";
};

export default function Providers({ children, initialTheme, initialLanguage }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false} refetchWhenOffline={false}>
      <AppProvider initialTheme={initialTheme} initialLanguage={initialLanguage}>
        {children}
      </AppProvider>
    </SessionProvider>
  );
}
