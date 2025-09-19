'use client';

import React, { useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ExperienceType {
  title: { pt: string; en: string; es: string };
  company: { pt: string; en: string; es: string };
  period: string;
  description: { pt: string; en: string; es: string };
  technologies: string[];
}

const Experience = () => {
  const { t, language } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Atualiza visibilidade das setas ao scrollar
  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 10);
  };

  React.useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const experiences: ExperienceType[] = [
    {
      title: {
        pt: "Desenvolvedor Web",
        en: "Web Developer",
        es: "Desarrollador Web"
      },
      company: {
        pt: "Corptech",
        en: "Corptech",
        es: "Corptech"
      },
      period: "04/2011 - 04/2013",
      description: {
        pt: "Desenvolvimento e manutenção de aplicação web ERP integrada com SAP, geração de gráficos e relatórios customizados.",
        en: "Development and maintenance of ERP web application integrated with SAP, generation of custom charts and reports.",
        es: "Desarrollo y mantenimiento de aplicação web ERP integrada com SAP, geração de gráficos y reportes personalizados."
      },
      technologies: ["Java (J2EE)", "JSP / JSF", "Hibernate", "MySQL", "PostgreSQL", "Google Maps & Charts", "HTML", "CSS", "JavaScript", "jQuery"]
    },
    {
      title: {
        pt: "Desenvolvedor Web",
        en: "Web Developer",
        es: "Desarrollador Web"
      },
      company: {
        pt: "Freelancer",
        en: "Freelancer",
        es: "Freelancer"
      },
      period: "06/2013 - 01/2015",
      description: {
        pt: "Análise e manutenção de sites e lojas online, correção de bugs e implementação de melhorias.",
        en: "Analysis and maintenance of websites and online stores, bug fixing and improvements implementation.",
        es: "Análisis y mantenimiento de sitios e tiendas online, corrección de errores e implementación de mejoras."
      },
      technologies: ["WordPress", "PHP", "HTML5", "CSS3", "MySQL"]
    },
    {
      title: {
        pt: "Desenvolvedor Front-end",
        en: "Front-end Developer",
        es: "Desarrollador Front-end"
      },
      company: {
        pt: "Agências de Publicidade",
        en: "Advertising Agencies",
        es: "Agencias de Publicidad"
      },
      period: "02/2015 - 11/2015",
      description: {
        pt: "Desenvolvimento e manutenção de lojas online, plugins e templates para diversos clientes do setor publicitário.",
        en: "Development and maintenance of online stores, plugins and templates for various advertising clients.",
        es: "Desarrollo y mantenimiento de tiendas online, plugins y plantillas para diversos clientes del sector publicitario."
      },
      technologies: ["PHP", "WordPress", "WooCommerce", "OpenCart", "MySQL", "HTML", "CSS", "JavaScript"]
    },
    {
      title: {
        pt: "Desenvolvedor Web",
        en: "Web Developer",
        es: "Desarrollador Web"
      },
      company: {
        pt: "Bold Comunicação",
        en: "Bold Comunicação",
        es: "Bold Comunicação"
      },
      period: "12/2015 - 02/2017",
      description: {
        pt: "Desenvolvimento de protótipo de ecommerce B2B integrado com ERPs, focando em usabilidade e performance.",
        en: "Development of B2B ecommerce prototype integrated with ERPs, focusing on usability and performance.",
        es: "Desarrollo de prototipo de ecommerce B2B integrado com ERPs, enfocado em usabilidade e desempenho."
      },
      technologies: ["Laravel", "PHP", "HTML5", "CSS3", "JavaScript", "Bootstrap"]
    },
    {
      title: {
        pt: "Desenvolvedor Web",
        en: "Web Developer",
        es: "Desarrollador Web"
      },
      company: {
        pt: "Freelancer",
        en: "Freelancer",
        es: "Freelancer"
      },
      period: "03/2017 - 03/2018",
      description: {
        pt: "Desenvolvimento de lojas online, plugins e templates customizados para diversos clientes.",
        en: "Development of online stores, plugins and custom templates for various clients.",
        es: "Desarrollo de tiendas online, plugins y plantillas personalizadas para diversos clientes."
      },
      technologies: ["WordPress", "WooCommerce", "Laravel", "PHP 7", "HTML5", "CSS3/Sass", "JavaScript"]
    },
    {
      title: {
        pt: "Desenvolvedor PHP",
        en: "PHP Developer",
        es: "Desarrollador PHP"
      },
      company: {
        pt: "Idealizza",
        en: "Idealizza",
        es: "Idealizza"
      },
      period: "03/2018 - 01/2019",
      description: {
        pt: "Desenvolvimento de lojas online, plugins e templates customizados para diversos clientes.",
        en: "Development of online stores, plugins and custom templates for various clients.",
        es: "Desarrollo de tiendas online, plugins y plantillas personalizadas para diversos clientes."
      },
      technologies: ["WordPress", "WooCommerce", "Laravel", "PHP 7", "HTML5", "CSS3/Sass", "JavaScript"]
    },
    {
      title: {
        pt: "Desenvolvedor Ecommerce",
        en: "Ecommerce Developer",
        es: "Desarrollador Ecommerce"
      },
      company: {
        pt: "Agile Ecommerce",
        en: "Agile Ecommerce",
        es: "Agile Ecommerce"
      },
      period: "01/2019 - 07/2019",
      description: {
        pt: "Desenvolvimento de protótipo de ecommerce B2B integrado com ERPs, focando em usabilidade e performance.",
        en: "Development of B2B ecommerce prototype integrated with ERPs, focusing on usability and performance.",
        es: "Desarrollo de prototipo de ecommerce B2B integrado com ERPs, enfocado em usabilidade e desempenho."
      },
      technologies: ["Laravel", "PHP", "HTML5", "CSS3", "JavaScript", "Bootstrap"]
    },
    {
      title: {
        pt: "Front-end Analista (Pleno)",
        en: "Front-end Analyst (Mid)",
        es: "Analista Front-end (Pleno)"
      },
      company: {
        pt: "Accenture",
        en: "Accenture",
        es: "Accenture"
      },
      period: "08/2019 - 12/2023",
      description: {
        pt: "Desenvolvimento e manutenção de aplicações front-end com foco em performance e acessibilidade.",
        en: "Development and maintenance of front-end applications focused on performance and accessibility.",
        es: "Desarrollo y mantenimiento de aplicaciones front-end con enfoque em rendimiento y accesibilidad."
      },
      technologies: ["React", "TypeScript", "Node.js", "Jest", "Cypress", "HTML5", "CSS3", "JavaScript"]
    },
    {
      title: {
        pt: "Desenvolvedor Fullstack",
        en: "Fullstack Developer",
        es: "Desarrollador Fullstack"
      },
      company: {
        pt: "Agile Ecommerce",
        en: "Agile Ecommerce",
        es: "Agile Ecommerce"
      },
      period: "01/2024 - 07/2024",
      description: {
        pt: "Desenvolvimento e manutenção de ecommerce web (B2B), implementação de funcionalidades complexas e integração com sistemas.",
        en: "Development and maintenance of B2B web ecommerce, implementation of complex features and system integration.",
        es: "Desarrollo y manutenção de ecommerce web (B2B), implementación de funcionalidades complejas e integração com sistemas."
      },
      technologies: ["Laravel", "PHP 7", "HTML5", "CSS3", "JavaScript"]
    },
    {
      title: {
        pt: "Desenvolvedor Web Fullstack",
        en: "Fullstack Web Developer",
        es: "Desarrollador Web Fullstack"
      },
      company: {
        pt: "Freelancer",
        en: "Freelancer",
        es: "Freelancer"
      },
      period: "08/2023 - Presente",
      description: {
        pt: "Desenvolvimento de soluções web personalizadas, incluindo sites, sistemas e integrações.",
        en: "Development of custom web solutions, including websites, systems and integrations.",
        es: "Desarrollo de soluciones web personalizadas, incluindo sitios, sistemas e integraciones."
      },
      technologies: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)]">
        <div className="text-center mb-16">
          <h2 className="text-display font-heading font-bold text-black dark:text-white mb-4 tracking-tight">
            {t('experience.title')}
          </h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0.5 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
              aria-label="Voltar"
            >
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
              aria-label="Avançar"
            >
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden horizontal-scroll pb-4 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative flex items-stretch gap-8 px-16 py-8" style={{ width: `${experiences.length * 350}px` }}>
              
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex-shrink-0 w-80">
                  <div className="bg-gray-50 dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 h-full">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-black dark:text-white tracking-tight">{exp.title[language]}</h3>
                      <h4 className="text-lg font-body font-medium text-gray-800 dark:text-gray-200">{exp.company[language]}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">({exp.period})</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 text-md text-justify font-body leading-relaxed">{exp.description[language]}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
