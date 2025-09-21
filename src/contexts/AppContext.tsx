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
  contact: 'Contato',
  blog: 'Blog'
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
      title: 'Sobre',
      subtitle: 'Recife/PE * 35 anos * Web Deb',
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
      title: 'Experiência',
      subtitle: 'Jornada profissional no desenvolvimento web'
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
  contact: 'Contact',
  blog: 'Blog'
    },
    hero: {
      title: 'Dayvson Marques',
      subtitle: 'Web Developer',
      greeting: 'websites * ecommerces * web applications',
      name: 'Full Stack Web Developer',
      description: 'Modern web development, creating responsive websites, online stores and web applications. Over 15 years of experience turning ideas into digital solutions.',
      cta: 'View Projects',
      contact: 'Contact Me',
      download: 'Download CV'
    },
    about: {
      title: 'About',
      subtitle: 'Web developer * Recife/PE * 35 years old',
      description: 'Graduated in Information Systems from UniNabuco (2008 - 2012). Web developer for over 15 years, specialist in creating websites, online stores and web applications (front-end & back-end) using modern technologies.',
      text1: "I'm Dayvson Marques, a web developer with over 15 years of experience based in Recife-PE. Specialized in full-stack development and creating custom digital solutions. My passion is turning ideas into exceptional web experiences.",
      text2: "I work with technologies like React, Next.js, Node.js and have expertise in performance optimization and responsive development. Always striving to deliver solutions that combine functionality and modern design.",
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
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
      yearsExperience: 'Years of Experience',
      technologies: 'Technologies',
      satisfaction: 'Satisfaction'
    },
    experience: {
      title: 'Experience',
      subtitle: 'Professional journey in web development'
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some of my recent work',
      description: 'Here are some of the projects I have developed, demonstrating my skills and experience in different technologies.',
      viewProject: 'View Project',
      sourceCode: 'Source Code',
      github: {
        title: 'GitHub Projects',
        subtitle: 'Check out my latest open source projects',
        viewMore: 'View more on GitHub',
        noDescription: 'No description available',
        viewCode: 'View Code',
        liveDemo: 'Live Demo'
      },
      featuredProjects: 'Featured Projects',
      otherProjects: 'Other Projects',
      viewDemo: 'Live Demo',
      githubLink: 'GitHub',
      demo: 'Demo',
      ecommerce: 'Complete e-commerce platform with shopping cart, payment system and admin panel. Built with Next.js, Stripe and PostgreSQL.',
      taskManagement: 'Task management app with drag-and-drop, real-time collaboration and push notifications.',
      portfolio: 'Responsive and modern portfolio site for a designer with interactive gallery and integrated contact form.',
      weather: 'Weather dashboard with detailed forecasts, interactive maps and personalized alerts for various cities.',
      socialMedia: 'Social media analytics dashboard with real-time metrics, interactive charts and automated reports.',
      chat: 'Real-time chat app with private rooms, file sharing and custom emoji support.'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let’s work together',
      description: 'Have a project in mind? Let’s talk! I’m always open to new opportunities and interesting challenges.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Recife, PE - Brazil',
      message: 'Message',
      send: 'Send Message',
      info: 'Contact Information',
      socialMedia: 'Social Media',
      sendMessage: 'Send a Message',
      yourName: 'Your name',
      yourEmail: 'your@email.com',
      subject: 'Subject',
      messageSubject: 'Message subject',
      yourMessage: 'Your message...',
      sendMessageButton: 'Send Message'
    },
    footer: {
      description: 'Creating exceptional digital experiences with modern technologies. Specialized in React, Next.js, Node.js and much more.',
      quickLinks: 'Quick Links',
      home: 'Home',
      contactInfo: 'Contact Information',
      rights: 'All rights reserved.',
      madeWith: 'Made with ❤️ using Next.js & Tailwind CSS',
      allRightsReserved: 'All rights reserved.',
      developedWith: 'Developed with',
      using: 'using'
    }
  },
  es: {
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
  contact: 'Contacto',
  blog: 'Blog'
    },
    hero: {
      title: 'Dayvson Marques',
      subtitle: 'Desarrollador Web',
      greeting: 'sitios * ecommerces * aplicaciones web',
      name: 'Desarrollador Web Full Stack',
      description: 'Desarrollo web moderno, creación de sitios responsivos, tiendas online y aplicaciones web. Más de 15 años de experiencia transformando ideas en soluciones digitales.',
      cta: 'Ver Proyectos',
      contact: 'Contáctame',
      download: 'Descargar CV'
    },
    about: {
      title: 'Sobre',
      subtitle: 'Desarrollador web * Recife/PE * 35 años',
      description: 'Graduado en Sistemas de Información por UniNabuco (2008 - 2012). Desarrollador web hace más de 15 años, especialista en la creación de sitios, tiendas online y aplicaciones web (front-end & back-end) usando tecnologías modernas.',
      text1: 'Soy Dayvson Marques, desarrollador web con más de 15 años de experiencia radicado en Recife-PE. Especializado en desarrollo full-stack y creación de soluciones digitales personalizadas. Mi pasión es transformar ideas en experiencias web excepcionales.',
      text2: 'Trabajo con tecnologías como React, Next.js, Node.js y tengo experiencia en optimización de rendimiento y desarrollo responsivo. Siempre buscando entregar soluciones que combinen funcionalidad y diseño moderno.',
      experience: 'Años de Experiencia',
      projects: 'Proyectos Realizados',
      clients: 'Clientes Satisfechos',
      frontend: 'Frontend',
      backend: 'Backend'
    },
    skills: {
      title: 'Habilidades',
      subtitle: 'Tecnologías que domino',
      description: 'Aquí están las principales tecnologías y herramientas que domino, con años de experiencia práctica y proyectos reales.',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Herramientas',
      toolsAndOthers: 'Herramientas & Otros',
      projectsCompleted: 'Proyectos Completados',
      yearsExperience: 'Años de Experiencia',
      technologies: 'Tecnologías',
      satisfaction: 'Satisfacción'
    },
    experience: {
      title: 'Experiencia',
      subtitle: 'Trayectoria profesional en desarrollo web'
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Algunos de mis trabajos recientes',
      description: 'Aquí están algunos de los proyectos que desarrollé, demostrando mis habilidades y experiencia en diferentes tecnologías.',
      viewProject: 'Ver Proyecto',
      sourceCode: 'Código Fuente',
      github: {
        title: 'Proyectos en GitHub',
        subtitle: 'Consulta mis últimos proyectos open source',
        viewMore: 'Ver más en GitHub',
        noDescription: 'Sin descripción disponible',
        viewCode: 'Ver Código',
        liveDemo: 'Ver Demo'
      },
      featuredProjects: 'Proyectos Destacados',
      otherProjects: 'Otros Proyectos',
      viewDemo: 'Ver Demo',
      githubLink: 'GitHub',
      demo: 'Demo',
      ecommerce: 'Plataforma completa de e-commerce con carrito de compras, sistema de pago y panel administrativo. Construido con Next.js, Stripe y PostgreSQL.',
      taskManagement: 'Aplicación de gestión de tareas con arrastrar y soltar, colaboración en tiempo real y notificaciones push.',
      portfolio: 'Sitio de portafolio responsivo y moderno para un diseñador con galería interactiva y formulario de contacto integrado.',
      weather: 'Panel meteorológico con pronósticos detallados, mapas interactivos y alertas personalizadas para varias ciudades.',
      socialMedia: 'Panel de análisis de redes sociales con métricas en tiempo real, gráficos interactivos e informes automatizados.',
      chat: 'Aplicación de chat en tiempo real con salas privadas, compartición de archivos y soporte para emojis personalizados.'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos',
      description: '¿Tienes un proyecto en mente? ¡Hablemos! Siempre estoy abierto a nuevas oportunidades y desafíos interesantes.',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      location: 'Recife, PE - Brasil',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      info: 'Información de Contacto',
      socialMedia: 'Redes Sociales',
      sendMessage: 'Enviar un Mensaje',
      yourName: 'Tu nombre',
      yourEmail: 'tu@email.com',
      subject: 'Asunto',
      messageSubject: 'Asunto del mensaje',
      yourMessage: 'Tu mensaje...',
      sendMessageButton: 'Enviar Mensaje'
    },
    footer: {
      description: 'Creando experiencias digitales excepcionales con tecnologías modernas. Especializado en React, Next.js, Node.js y mucho más.',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      contactInfo: 'Información de Contacto',
      rights: 'Todos los derechos reservados.',
      madeWith: 'Hecho con ❤️ usando Next.js & Tailwind CSS',
      allRightsReserved: 'Todos los derechos reservados.',
      developedWith: 'Desarrollado con',
      using: 'usando'
    }
  },
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
        initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (error) {
      console.log('Error loading theme:', error);
      initialTheme = 'light';
    }
    setTheme(initialTheme);

    // Carregar idioma do localStorage ou detectar idioma do navegador
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      } else {
        // Detecta idioma do navegador
        const browserLang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
        if (browserLang.startsWith('pt')) {
          setLanguage('pt');
        } else if (browserLang.startsWith('en')) {
          setLanguage('en');
        } else if (browserLang.startsWith('es')) {
          setLanguage('es');
        } else {
          setLanguage('pt'); // padrão
        }
      }
    } catch (error) {
      console.log('Error loading language:', error);
      setLanguage('pt');
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
