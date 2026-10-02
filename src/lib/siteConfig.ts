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
    whatsapp: 'https://wa.me/5581999623374?text=Ol%C3%A1!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20entrar%20em%20contato.',
  },
  defaultLocale: 'pt-BR',
  availableLocales: {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
  },
} as const;
