export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dayvsonmarques.dev',
  organization: {
    name: 'Dayvson Marques',
    legalName: 'Dayvson Marques',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dayvsonmarques.dev',
    logo: '/api/og?title=Dayvson%20Marques',
  },
  socials: {
    linkedin: 'https://linkedin.com/in/dayvsonmarques',
    github: 'https://github.com/dayvsonmarques',
    email: 'mailto:dayvson.marques@gmail.com',
    whatsapp: 'https://wa.me/5581999623374?text=Oi%2C%20tudo%20bem%3F%20Gostaria%20de%20entrar%20em%20contato.%20Aguardo%20retorno',
  },
  defaultLocale: 'pt-BR',
  availableLocales: {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
  },
} as const;
