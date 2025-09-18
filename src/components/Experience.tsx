'use client';

import React, { useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ExperienceType {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const Experience = () => {
  const { t } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const experiences: ExperienceType[] = [
    {
      title: "Desenvolvedor Web",
      company: "Corptech",
      period: "04/2011 - 04/2013",
      description: "Desenvolvimento e manutenção de aplicação web ERP integrada com SAP, geração de gráficos e relatórios customizados.",
      technologies: ["Java (J2EE)", "JSP", "JSF", "Hibernate", "MySQL", "PostgreSQL", "Google Maps & Charts", "HTML", "CSS", "JavaScript", "jQuery"]
    },
    {
      title: "Desenvolvedor Web",
      company: "Freelancer",
      period: "06/2013 - 01/2015",
      description: "Análise e manutenção de sites e lojas online, correção de bugs e implementação de melhorias.",
      technologies: ["WordPress", "PHP", "HTML5", "CSS3", "MySQL"]
    },
    {
      title: "Desenvolvedor Front-end",
      company: "Agências de Publicidade",
      period: "02/2015 - 11/2015",
      description: "Desenvolvimento e manutenção de lojas online, plugins e templates para diversos clientes do setor publicitário.",
      technologies: ["PHP", "WordPress", "WooCommerce", "OpenCart", "MySQL", "HTML", "CSS", "JavaScript"]
    },
    {
      title: "Desenvolvedor Web",
      company: "Bold Comunicação",
      period: "12/2015 - 02/2017",
      description: "Desenvolvimento de protótipo de ecommerce B2B integrado com ERPs, focando em usabilidade e performance.",
      technologies: ["Laravel", "PHP", "HTML5", "CSS3", "JavaScript", "Bootstrap"]
    },
    {
      title: "Desenvolvedor Web",
      company: "Freelancer",
      period: "03/2017 - 03/2018",
      description: "Desenvolvimento de lojas online, plugins e templates customizados para diversos clientes.",
      technologies: ["WordPress", "WooCommerce", "Laravel", "PHP 7", "HTML5", "CSS3/Sass", "JavaScript"]
    },
    {
      title: "Desenvolvedor PHP",
      company: "Idealizza",
      period: "03/2018 - 01/2019",
      description: "Desenvolvimento de lojas online, plugins e templates customizados para diversos clientes.",
      technologies: ["WordPress", "WooCommerce", "Laravel", "PHP 7", "HTML5", "CSS3/Sass", "JavaScript"]
    },
    {
      title: "Desenvolvedor Ecommerce",
      company: "Agile Ecommerce",
      period: "01/2019 - 07/2019",
      description: "Desenvolvimento de protótipo de ecommerce B2B integrado com ERPs, focando em usabilidade e performance.",
      technologies: ["Laravel", "PHP", "HTML5", "CSS3", "JavaScript", "Bootstrap"]
    },
    {
      title: "Front-end Analista (Pleno)",
      company: "Accenture",
      period: "08/2019 - 12/2023",
      description: "Desenvolvimento e manutenção de aplicações front-end com foco em performance e acessibilidade.",
      technologies: ["React", "TypeScript", "Node.js", "Jest", "Cypress", "HTML5", "CSS3", "JavaScript"]
    },
    {
      title: "Desenvolvedor Fullstack",
      company: "Agile Ecommerce",
      period: "01/2024 - 07/2024",
      description: "Desenvolvimento e manutenção de ecommerce web (B2B), implementação de funcionalidades complexas e integração com sistemas.",
      technologies: ["Laravel", "PHP 7", "HTML5", "CSS3", "JavaScript"]
    },
    {
      title: "Desenvolvedor Web Fullstack",
      company: "Freelancer",
      period: "08/2023 - Presente",
      description: "Desenvolvimento de soluções web personalizadas, incluindo sites, sistemas e integrações.",
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
          <p className="text-large font-body text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            aria-label="Voltar"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            aria-label="Avançar"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden horizontal-scroll pb-4 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative flex items-start gap-8 px-16 py-8" style={{ width: `${experiences.length * 350}px` }}>
              <div 
                className="absolute top-24 h-0.5 bg-black dark:bg-white"
                style={{ 
                  left: '80px', 
                  right: '80px'
                }}
              ></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex-shrink-0 w-80">
                  <div className="bg-gray-50 dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 h-[400px] flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-black dark:text-white mb-2 tracking-tight">{exp.title}</h3>
                      <h4 className="text-lg font-body font-medium text-gray-800 dark:text-gray-200 mb-1">{exp.company}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">{exp.period}</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm font-body leading-relaxed">{exp.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-black dark:bg-white text-white dark:text-black font-medium px-3 py-1 rounded-full"
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
