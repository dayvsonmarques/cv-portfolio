'use client';

import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelectorSimple';
import Menu from './Menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`${
        isScrolled ? 'fixed bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-800' : 'absolute bg-transparent'
      } top-0 left-0 right-0 transition-all duration-300 z-50`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className={`text-3xl md:text-4xl font-bold text-black dark:text-white z-50 relative font-logo tracking-wider transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
            Dayvson Marques
          </div>
          
          <div className="flex items-center space-x-3 z-50 relative">
            <div className={`flex items-center space-x-3 transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <div className="z-50 relative">
              <Menu isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
