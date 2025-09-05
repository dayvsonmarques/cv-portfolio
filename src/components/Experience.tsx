'use client';

import React, { useRef } from 'react';
import { useApp } from '@/contexts/AppContext';

const Experience = () => {
  const { t } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const experiences = [
    {
      title: "Desenvolvedor Web Full-Stack",
      company: "WebDev Recife",
      period: "2022 - Presente",
      description: "Desenvolvimento de sites, lojas online e aplicações web usando WordPress, React e tecnologias modernas. Especialização em soluções personalizadas para clientes diversos.",
      technologies: ["WordPress", "React", "Next.js", "PHP", "JavaScript", "CSS3"]
    },
    {
      title: "Desenvolvedor WordPress",
      company: "Freelancer",
      period: "2020 - 2022",
      description: "Criação de sites responsivos e lojas online com WordPress. Desenvolvimento de temas customizados e integração com sistemas de pagamento.",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "WooCommerce"]
    },
    {
      title: "Desenvolvedor Front-End",
      company: "Agência Digital",
      period: "2019 - 2020",
      description: "Desenvolvimento de interfaces web responsivas e otimização de experiência do usuário. Colaboração em projetos de e-commerce e sites institucionais.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"]
    },
    {
      title: "Desenvolvedor Junior",
      company: "Startup Local",
      period: "2018 - 2019",
      description: "Início da carreira profissional desenvolvendo aplicações web. Aprendizado de melhores práticas e metodologias ágeis de desenvolvimento.",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "Bootstrap"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Voltar"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Avançar"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden horizontal-scroll pb-4"
          >
            <div className="relative flex items-start gap-8 px-16 py-8" style={{ width: `${experiences.length * 350}px` }}>
              <div 
                className="absolute top-24 h-0.5 bg-blue-600 dark:bg-blue-400"
                style={{ 
                  left: '80px', 
                  right: '80px'
                }}
              ></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex-shrink-0 w-80">
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 z-10 shadow-lg"></div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {exp.period}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
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
          
          <div className="flex justify-center mt-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-medium">Use as setas ou deslize para navegar</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
