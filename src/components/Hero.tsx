'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { ParallaxBackground } from './ParallaxBackground';
import SocialIcons from './SocialIcons';

const Hero = () => {
  const { t } = useApp();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 pt-16 sm:pt-20 relative">
      <ParallaxBackground />
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl sm:text-hero font-heading font-extrabold text-black dark:text-white mb-4 sm:mb-6 tracking-tight break-words">
          {t('hero.subtitle')}
        </h1>
        <h2 className="text-xll sm:text-display font-bold text-gray-800 dark:text-gray-200 mb-8 sm:mb-12 tracking-tight break-words">
          {t('hero.greeting')}
        </h2>
        <div className="mt-8 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-8">
          <SocialIcons variant="hero" showTooltips={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
