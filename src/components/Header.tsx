'use client';

import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelectorSimple';
import { useApp } from '@/contexts/AppContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useApp();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-white font-heading">
            Portfolio
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              {t('nav.skills')}
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              {t('nav.experience')}
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              {t('nav.projects')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              {t('nav.contact')}
            </button>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2"
              >
                {t('nav.skills')}
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2"
              >
                {t('nav.experience')}
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2"
              >
                {t('nav.projects')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
