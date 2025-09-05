'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'pt' | 'en' | 'es';
type Theme = 'light' | 'dark';

// Traduções
const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      experience: 'Experiência',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Desenvolvedor Full Stack',
      subtitle: 'Criando experiências digitais excepcionais com tecnologias modernas',
      description: 'Especializado em React, Next.js, Node.js e muito mais. Transformo ideias em soluções digitais inovadoras.',
      cta: 'Ver Projetos',
      contact: 'Entre em Contato'
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Conheça um pouco da minha história',
      description: 'Sou um desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência criando aplicações web modernas. Especializado em JavaScript, TypeScript, React, Next.js e Node.js.',
      experience: 'Anos de Experiência',
      projects: 'Projetos Concluídos',
      clients: 'Clientes Satisfeitos'
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologias que domino',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Ferramentas'
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Minha jornada no desenvolvimento web'
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos meus trabalhos recentes',
      viewProject: 'Ver Projeto',
      sourceCode: 'Código Fonte'
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos trabalhar juntos',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      info: 'Informações de Contato',
      phone: 'Telefone',
      location: 'Localização'
    },
    footer: {
      description: 'Criando experiências digitais excepcionais com tecnologias modernas. Especializado em React, Next.js, Node.js e muito mais.',
      quickLinks: 'Links Rápidos',
      contactInfo: 'Informações de Contato',
      rights: 'Todos os direitos reservados.',
      madeWith: 'Desenvolvido com ❤️ usando Next.js & Tailwind CSS'
    }
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Full Stack Developer',
      subtitle: 'Creating exceptional digital experiences with modern technologies',
      description: 'Specialized in React, Next.js, Node.js and much more. I transform ideas into innovative digital solutions.',
      cta: 'View Projects',
      contact: 'Get in Touch'
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know a little of my story',
      description: 'I am a technology-passionate developer with over 5 years of experience creating modern web applications. Specialized in JavaScript, TypeScript, React, Next.js and Node.js.',
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients'
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies I master',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools'
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey in web development'
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      sourceCode: 'Source Code'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s work together',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      info: 'Contact Information',
      phone: 'Phone',
      location: 'Location'
    },
    footer: {
      description: 'Creating exceptional digital experiences with modern technologies. Specialized in React, Next.js, Node.js and much more.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Information',
      rights: 'All rights reserved.',
      madeWith: 'Made with ❤️ using Next.js & Tailwind CSS'
    }
  },
  es: {
    nav: {
      about: 'Acerca',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Desarrollador Full Stack',
      subtitle: 'Creando experiencias digitales excepcionales con tecnologías modernas',
      description: 'Especializado en React, Next.js, Node.js y mucho más. Transformo ideas en soluciones digitales innovadoras.',
      cta: 'Ver Proyectos',
      contact: 'Ponerse en Contacto'
    },
    about: {
      title: 'Acerca de Mí',
      subtitle: 'Conoce un poco de mi historia',
      description: 'Soy un desarrollador apasionado por la tecnología con más de 5 años de experiencia creando aplicaciones web modernas. Especializado en JavaScript, TypeScript, React, Next.js y Node.js.',
      experience: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      clients: 'Clientes Satisfechos'
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologías que domino',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Herramientas'
    },
    experience: {
      title: 'Experiencia Profesional',
      subtitle: 'Mi trayectoria en desarrollo web'
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Algunos de mis trabajos recientes',
      viewProject: 'Ver Proyecto',
      sourceCode: 'Código Fuente'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      info: 'Información de Contacto',
      phone: 'Teléfono',
      location: 'Ubicación'
    },
    footer: {
      description: 'Creando experiencias digitales excepcionales con tecnologías modernas. Especializado en React, Next.js, Node.js y mucho más.',
      quickLinks: 'Enlaces Rápidos',
      contactInfo: 'Información de Contacto',
      rights: 'Todos los derechos reservados.',
      madeWith: 'Hecho con ❤️ usando Next.js & Tailwind CSS'
    }
  }
} as const;

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carregar tema do localStorage ou usar preferência do sistema
    let initialTheme: Theme = 'light';
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      } else {
        // Usar preferência do sistema se não houver tema salvo
        initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (error) {
      console.log('Error loading theme:', error);
      initialTheme = 'light';
    }
    
    setTheme(initialTheme);

    // Carregar idioma do localStorage
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Aplicar tema ao documento
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Also apply to body for extra compatibility
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    localStorage.setItem('theme', theme);
    
    console.log('Theme applied:', theme, 'Classes on html:', root.classList.toString());
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('language', language);
  }, [language, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Prevent hydration mismatch by showing loading state until mounted
  const value = {
    theme: mounted ? theme : 'light',
    language: mounted ? language : 'pt',
    toggleTheme,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
