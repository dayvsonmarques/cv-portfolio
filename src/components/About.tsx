'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const About = () => {
  const { t } = useApp();
  
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t('about.subtitle')}</p>
          <div className="w-24 h-1 bg-gray-600 dark:bg-gray-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center text-white text-6xl font-bold">
              👨‍💻
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Desenvolvedor Full Stack apaixonado por tecnologia
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
              {t('about.description')}
            </p>
            
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">5+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('about.experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('about.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">20+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('about.clients')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
