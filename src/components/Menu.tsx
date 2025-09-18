'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Menu = ({ isOpen, onToggle }: MenuProps) => {
  const { t } = useApp();

  // Impedir rolagem quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    onToggle(); // Fecha o menu
  };

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={onToggle}
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors z-50 relative"
        aria-label="Toggle menu"
      >
        <svg 
          className="w-8 h-8 transition-transform duration-300 ease-in-out" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Fullscreen Menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white dark:bg-black z-40 transition-all duration-300 ease-in-out"
        >
          <div className="h-full flex items-center justify-center pt-20 pb-10">
            <div className="flex flex-col items-center justify-between h-full max-h-[600px]">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-4xl lg:text-5xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-4xl lg:text-5xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
              >
                {t('nav.skills')}
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-4xl lg:text-5xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
              >
                {t('nav.experience')}
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-4xl lg:text-5xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
              >
                {t('nav.projects')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-4xl lg:text-5xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;