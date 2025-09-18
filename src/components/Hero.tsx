'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { ParallaxBackground } from './ParallaxBackground';
import SocialIcons from './SocialIcons';

const Hero = () => {
  const { t } = useApp();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 relative">
      <ParallaxBackground />
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        
        <h1 className="text-hero font-heading font-extrabold text-gray-800 dark:text-white mb-6 tracking-tight">
          {t('hero.subtitle')}
        </h1>
        <h2 className="text-display font-heading font-bold text-gray-700 dark:text-gray-200 mb-12 tracking-tight">
          {t('hero.greeting')}
        </h2>
        
        <div className="mt-16">
          <SocialIcons variant="hero" showTooltips={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
