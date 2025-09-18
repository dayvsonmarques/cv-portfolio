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
      title: 'Dayvson Marques',
      subtitle: 'Desenvolvedor Web',
      greeting: 'sites * ecommerces * aplicações web',
      name: 'Desenvolvedor Web Full Stack',
      description: 'desenvolvimento web moderno, criação de sites responsivos, lojas online e aplicações web. Mais de 15 anos de experiência transformando ideias em soluções digitais.',
      cta: 'Ver Projetos',
      contact: 'Entre em Contato',
      download: 'Baixar CV'
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Desenvolvedor web * Recife/PE * 35 anos',
      description: 'Graduado em Sistemas de Informação pela UniNabuco (2008 - 2012). Desenvolvedor web a +15 anos, especialista na criação de sites, lojas online e aplicações web (front-end & back-end) usando tecnologias modernas.',
      text1: 'Sou Dayvson Marques, desenvolvedor web com mais de 15 anos de experiência baseado em Recife-PE. Especializado em desenvolvimento full-stack e criação de soluções digitais personalizadas. Minha paixão é transformar ideias em experiências web excepcionais.',
      text2: 'Trabalho com tecnologias como React, Next.js, Node.js e tenho expertise em otimização de performance e desenvolvimento responsivo. Sempre em busca de entregar soluções que combinem funcionalidade e design moderno.',
      experience: 'Anos de Experiência',
      projects: 'Projetos Realizados',
      clients: 'Clientes Satisfeitos',
      frontend: 'Frontend',
      backend: 'Backend'
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologias que domino',
      description: 'Aqui estão as principais tecnologias e ferramentas que domino, com anos de experiência prática e projetos reais.',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Ferramentas',
      toolsAndOthers: 'Ferramentas & Outros',
      projectsCompleted: 'Projetos Concluídos',
      yearsExperience: 'Anos de Experiência',
      technologies: 'Tecnologias',
      satisfaction: 'Satisfação'
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Minha jornada no desenvolvimento web'
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos meus trabalhos recentes',
      description: 'Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas habilidades e experiência em diferentes tecnologias.',
      viewProject: 'Ver Projeto',
      sourceCode: 'Código Fonte',
      github: {
        title: 'Projetos no GitHub',
        subtitle: 'Confira meus projetos open source mais recentes',
        viewMore: 'Ver mais no GitHub',
        noDescription: 'Sem descrição disponível',
        viewCode: 'Ver Código',
        liveDemo: 'Ver Demo'
      },
      featuredProjects: 'Projetos em Destaque',
      otherProjects: 'Outros Projetos',
      viewDemo: 'Ver Demo',
      githubLink: 'GitHub',
      demo: 'Demo',
      ecommerce: 'Plataforma completa de e-commerce com carrinho de compras, sistema de pagamento e painel administrativo. Construído com Next.js, Stripe e PostgreSQL.',
      taskManagement: 'Aplicativo de gerenciamento de tarefas com recursos de arrastar e soltar, colaboração em tempo real e notificações push.',
      portfolio: 'Site de portfólio responsivo e moderno para um designer com galeria interativa e formulário de contato integrado.',
      weather: 'Painel meteorológico com previsões detalhadas, mapas interativos e alertas personalizados para várias cidades.',
      socialMedia: 'Painel de análise de mídia social com métricas em tempo real, gráficos interativos e relatórios automatizados.',
      chat: 'Aplicativo de chat em tempo real com salas privadas, compartilhamento de arquivos e suporte a emojis personalizados.'
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos trabalhar juntos',
      description: 'Tem um projeto em mente? Vamos conversar! Estou sempre aberto a novas oportunidades e desafios interessantes.',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      location: 'Recife, PE - Brasil',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      info: 'Informações de Contato',
      socialMedia: 'Redes Sociais',
      sendMessage: 'Envie uma Mensagem',
      yourName: 'Seu nome',
      yourEmail: 'seu@email.com',
      subject: 'Assunto',
      messageSubject: 'Assunto da mensagem',
      yourMessage: 'Sua mensagem...',
      sendMessageButton: 'Enviar Mensagem'
    },
    footer: {
      description: 'Criando experiências digitais excepcionais com tecnologias modernas. Especializado em React, Next.js, Node.js e muito mais.',
      quickLinks: 'Links Rápidos',
      home: 'Início',
      contactInfo: 'Informações de Contato',
      rights: 'Todos os direitos reservados.',
      madeWith: 'Desenvolvido com ❤️ usando Next.js & Tailwind CSS',
      allRightsReserved: 'Todos os direitos reservados.',
      developedWith: 'Desenvolvido com',
      using: 'usando'
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
      title: 'Dayvson Marques',
      subtitle: 'Full Stack Developer',
      greeting: 'Hello, I am',
      name: 'Full Stack Developer',
      description: 'Creating exceptional digital experiences with modern technologies. Specialized in React, Next.js, Node.js with over 5 years of experience transforming ideas into digital solutions.',
      cta: 'View Projects',
      contact: 'Get in Touch',
      download: 'Download CV'
    },
    about: {
      title: 'About Me',
      subtitle: 'Full Stack Developer passionate about technology',
      description: "I'm Dayvson Marques, a web developer with over 5 years of experience based in Recife-PE, Brazil. I specialize in full-stack development and creating custom digital solutions. My passion is turning ideas into exceptional web experiences.",
      text1: "I'm Dayvson Marques, a web developer with over 5 years of experience based in Recife-PE, Brazil. I specialize in full-stack development and creating custom digital solutions. My passion is turning ideas into exceptional web experiences.",
      text2: 'I work with technologies like React, Next.js, Node.js and have expertise in performance optimization and responsive development. Always striving to deliver solutions that combine functionality and modern design.',
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Happy Clients',
      frontend: 'Frontend',
      backend: 'Backend'
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies I master',
      description: 'Here are the main technologies and tools I master, with years of practical experience and real projects.',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools',
      toolsAndOthers: 'Tools & Others',
      projectsCompleted: 'Completed Projects',
      yearsExperience: 'Years Experience',
      technologies: 'Technologies',
      satisfaction: 'Satisfaction'
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
      title: 'Dayvson Marques',
      greeting: 'Hola, soy',
      name: 'Desarrollador Full Stack',
      subtitle: 'Creando experiencias digitales excepcionales con tecnologías modernas',
      description: 'Especializado en React, Next.js, Node.js y mucho más. Transformo ideas en soluciones digitales innovadoras.',
      cta: 'Ver Proyectos',
      contact: 'Ponerse en Contacto',
      download: 'Descargar CV'
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
