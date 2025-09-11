'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';

const About = () => {
  const { t } = useApp();

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 font-heading">{t('about.title')}</h2>
          <div className="w-32 h-1 bg-gray-600 dark:bg-gray-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-96 h-96 mx-auto bg-gradient-to-br  dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center text-white text-7xl font-bold">
              <Image src="/yo-2k25.jpeg" alt="Profile" width={350} height={350} className="rounded-full object-cover" />
            </div>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-8 font-heading">
              {t('about.subtitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-xl">
              {t('about.description')}
            </p>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
