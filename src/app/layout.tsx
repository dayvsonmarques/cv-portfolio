import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Lovers_Quarrel } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const loversQuarrel = Lovers_Quarrel({
  variable: "--font-lovers-quarrel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio - Desenvolvedor Full Stack",
  description: "Portfolio profissional de desenvolvedor web especializado em React, Next.js, Node.js e tecnologias modernas. Criando experiências digitais excepcionais.",
  keywords: ["desenvolvedor", "full stack", "react", "nextjs", "nodejs", "typescript", "tailwind"],
  authors: [{ name: "Desenvolvedor Full Stack" }],
  creator: "Desenvolvedor Full Stack",
  openGraph: {
    title: "Portfolio - Desenvolvedor Full Stack",
    description: "Portfolio profissional de desenvolvedor web especializado em tecnologias modernas",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${loversQuarrel.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
