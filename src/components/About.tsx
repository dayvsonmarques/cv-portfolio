'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';

const About = () => {
  const { t } = useApp();

  return (
    <section id="about" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 mt-10 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-display font-heading font-bold text-black dark:text-white mb-6 tracking-tight">{t('about.title')}</h2>
          <div className="w-24 sm:w-32 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center mb-8 lg:mb-0">
            <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-black via-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center text-white text-7xl font-bold overflow-hidden shadow-2xl border-4 border-black dark:border-white">
              <Image 
                src="/yo-2k25.jpeg" 
                alt="Profile" 
                width={384} 
                height={384} 
                className="w-full h-full rounded-full object-cover aspect-square" 
              />
            </div>
          </div>

          <div>
            <h3 className="text-1xl font-heading font-semibold text-black dark:text-white mb-1 sm:mb-4 tracking-tight">
              {t('hero.title')}
            </h3>
            <h4 className="text-1xl mb-4">{t('about.subtitle')}</h4>
            <p className="text-2xl text-left font-body text-black dark:text-white font-light mb-4 sm:mb-6 leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
