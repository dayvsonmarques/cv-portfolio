'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const About = () => {
  const { t } = useApp();
  
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 font-heading">{t('about.title')}</h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10">{t('about.subtitle')}</p>
          <div className="w-32 h-1 bg-gray-600 dark:bg-gray-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center text-white text-7xl font-bold">
              👨‍💻
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-8 font-heading">
              {t('about.subtitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-xl">
              {t('about.description')}
            </p>
            
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-700 dark:text-gray-300 mb-4 font-heading">5+</div>
                <div className="text-xl text-gray-600 dark:text-gray-400">{t('about.experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-700 dark:text-gray-300 mb-4 font-heading">50+</div>
                <div className="text-xl text-gray-600 dark:text-gray-400">{t('about.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-700 dark:text-gray-300 mb-4 font-heading">20+</div>
                <div className="text-xl text-gray-600 dark:text-gray-400">{t('about.clients')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
