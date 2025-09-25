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

  const handleScrollDown = () => {
    // Encontra a próxima seção após o Hero
    const heroSection = document.querySelector('section');
    let nextSection = null;
    if (heroSection) {
      let el = heroSection.nextElementSibling;
      while (el && el.tagName !== 'SECTION') {
        el = el.nextElementSibling;
      }
      nextSection = el;
    }
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 pt-16 sm:pt-20 relative pb-10">
      <ParallaxBackground />
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl sm:text-hero font-heading font-extrabold text-black dark:text-white mb-4 sm:mb-6 tracking-tight break-words">
          {t('hero.subtitle')}
        </h1>
        <h2 className="text-xll sm:text-xll font-bold text-gray-800 dark:text-gray-200 mb-8 sm:mb-12 tracking-tight break-words">
          {t('hero.greeting')}
        </h2>
        <div className="mt-8 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-8">
          <SocialIcons variant="hero" showTooltips={true} />
        </div>
      </div>
      {/* Botão para avançar para a próxima seção */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <button
          onClick={handleScrollDown}
          className="bg-transparent border-none p-2 flex items-center justify-center group focus:outline-none"
          aria-label="Avançar para a próxima seção"
        >
          <svg className="w-16 h-16 text-black dark:text-white group-hover:text-yellow-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v8m0 0l-5-5m5 5l5-5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13v6m0 0l-5-5m5 5l5-5" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
