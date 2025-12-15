import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Lovers_Quarrel, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { siteConfig } from "@/lib/siteConfig";
import { cookies, headers } from "next/headers";

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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Dayvson Marques | Desenvolvedor Web Full Stack",
    template: "%s | Dayvson Marques",
  },
  description:
    "Portfólio profissional de Dayvson Marques, desenvolvedor web full stack em Recife-PE. Projetos com React, Next.js, Node.js e tecnologias modernas.",
  keywords: [
    "Dayvson Marques",
    "desenvolvedor web",
    "full stack",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "desenvolvimento web Recife",
  ],
  authors: [{ name: "Dayvson Marques", url: siteConfig.siteUrl }],
  creator: "Dayvson Marques",
  openGraph: {
    title: "Dayvson Marques | Desenvolvedor Web Full Stack",
    description:
      "Portfólio de Dayvson Marques com projetos em Next.js, React, Node.js e soluções digitais sob medida.",
    type: "website",
    locale: siteConfig.availableLocales.pt,
    url: siteConfig.siteUrl,
    siteName: "Dayvson Marques",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dayvson Marques | Desenvolvedor Web Full Stack",
    description:
      "Portfólio de Dayvson Marques com projetos modernos em React, Next.js e Node.js.",
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  type LanguageKey = "pt" | "en" | "es";
  type ThemeMode = "light" | "dark";

  const languageToLocale: Record<LanguageKey, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  const cookieLanguage = cookieStore.get("language")?.value as LanguageKey | undefined;
  const cookieTheme = cookieStore.get("theme")?.value as ThemeMode | undefined;

  const detectLanguageFromHeader = (): LanguageKey => {
    const acceptLanguage = requestHeaders.get("accept-language") ?? "";
    const languageCandidates = acceptLanguage
      .split(",")
      .map((part: string) => part.trim().split(";")[0]?.toLowerCase())
      .filter(Boolean) as string[];

    for (const candidate of languageCandidates) {
      if (candidate.startsWith("pt")) return "pt";
      if (candidate.startsWith("en")) return "en";
      if (candidate.startsWith("es")) return "es";
    }

    return "pt";
  };

  const initialLanguage: LanguageKey = cookieLanguage ?? detectLanguageFromHeader();
  const initialTheme: ThemeMode = cookieTheme === "dark" ? "dark" : "light";
  const htmlLang = languageToLocale[initialLanguage] ?? languageToLocale.pt;

  return (
    <html lang={htmlLang} className={initialTheme === "dark" ? "dark" : undefined}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dayvson Marques",
              jobTitle: "Full Stack Web Developer",
              url: siteConfig.siteUrl,
              image: `${siteConfig.siteUrl}/api/og?title=Dayvson%20Marques`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Recife",
                addressRegion: "PE",
                addressCountry: "BR",
              },
              sameAs: [
                siteConfig.socials.linkedin,
                siteConfig.socials.github,
                siteConfig.socials.email,
                siteConfig.socials.whatsapp,
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const cookieThemeMatch = document.cookie.match(/(?:^|; )theme=(dark|light)(?:;|$)/);
                const storedTheme = cookieThemeMatch?.[1] || localStorage.getItem('theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />

        <script
          data-goatcounter="https://dayvsonmarques.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${loversQuarrel.variable} ${roboto.variable} font-sans antialiased`}
      >
        <Providers initialTheme={initialTheme} initialLanguage={initialLanguage}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
