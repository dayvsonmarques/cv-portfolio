import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Lovers_Quarrel, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { siteConfig } from "@/lib/siteConfig";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${loversQuarrel.variable} ${roboto.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
