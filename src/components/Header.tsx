'use client';

import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelectorSimple';
import { useApp } from '@/contexts/AppContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrolled = window.scrollY > heroHeight - 100; // -100 para começar a transição um pouco antes
        setIsScrolled(scrolled);
      }
    };

    handleScroll(); // Verificar posição inicial
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Impedir rolagem quando o menu estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`${
          isScrolled ? 'fixed bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'absolute bg-transparent'
        } top-0 left-0 right-0 transition-all duration-300 z-50`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className={`text-2xl font-bold text-gray-800 dark:text-white z-50 relative font-logo tracking-wider transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
              Dayvson Marques
            </div>
            
            <div className="flex items-center space-x-3 z-50 relative">
              <div className={`flex items-center space-x-3 transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
                <LanguageSelector />
                <ThemeToggle />
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <svg 
                  className="w-8 h-8 transition-transform duration-300 ease-in-out" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Fullscreen Menu */}
      <div 
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex items-center justify-center pt-20 pb-10">
          <div className="flex flex-col items-center justify-between h-full max-h-[600px]">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
            >
              {t('nav.skills')}
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
            >
              {t('nav.experience')}
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
            >
              {t('nav.projects')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-4xl lg:text-5xl font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-500 ease-in-out font-[var(--font-inter)] uppercase tracking-wider"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
