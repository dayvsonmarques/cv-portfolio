'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const projects = [
  {
    name: 'DGASP',
    description: {
      pt: 'Site do III Seminário Estadual de Atenção à Saúde Prisional de Pernambuco e à III Mostra Estadual de Experiências na Saúde Prisional.',
      en: 'Website of the III State Seminar on Prison Health Care in Pernambuco and the III State Exhibition of Experiences in Prison Health.',
      es: 'Sitio del III Seminario Estatal de Atención a la Salud Penitenciaria de Pernambuco y la III Muestra Estatal de Experiencias en Salud Penitenciaria.',
    },
    year: 2026,
    category: {
      pt: 'Site institucional',
      en: 'Institutional website',
      es: 'Sitio institucional',
    },
    url: 'https://dgasp.webdev.recife.br/',
    preview: 'https://dgasp.webdev.recife.br/wp-content/themes/congresso-custom/assets/img/logo-header.png',
    previewType: 'logo',
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
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
              <div className={`relative h-56 overflow-hidden ${project.previewType === 'logo' ? 'bg-white dark:bg-gray-100 flex items-center justify-center p-8' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <img
                  src={project.preview}
                  alt={project.name}
                  className={project.previewType === 'logo'
                    ? 'max-h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500'
                    : 'w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category[lang]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{project.year}</span>
                </div>
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
