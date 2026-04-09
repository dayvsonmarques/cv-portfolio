'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const projects = [
  {
    name: 'Manuela Rios',
    description: {
      pt: 'Site institucional e portfólio de arquitetura e design de interiores.',
      en: 'Institutional website and architecture and interior design portfolio.',
      es: 'Sitio institucional y portafolio de arquitectura y diseño de interiores.',
    },
    url: 'https://manuelarios.com.br/',
    preview: `https://api.microlink.io/?url=https://manuelarios.com.br/&screenshot=true&meta=false&embed=screenshot.url`,
  },
  {
    name: 'DGASP',
    description: {
      pt: 'Diretoria Geral de Administração e Serviços Públicos — Prefeitura do Recife.',
      en: 'General Directorate of Administration and Public Services — Recife City Hall.',
      es: 'Dirección General de Administración y Servicios Públicos — Ayuntamiento de Recife.',
    },
    url: 'https://dgasp.webdev.recife.br/',
    preview: `https://api.microlink.io/?url=https://dgasp.webdev.recife.br/&screenshot=true&meta=false&embed=screenshot.url`,
  },
];

type LangKey = 'pt' | 'en' | 'es';

const PortfolioProjects = () => {
  const { t, language } = useApp();
  const lang = (language as LangKey) ?? 'pt';

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-800 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gray-700 dark:bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                  src={project.preview}
                  alt={project.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description[lang]}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                  {t('projects.viewProject')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioProjects;
