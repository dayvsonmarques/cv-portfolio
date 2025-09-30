'use client';

import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import Menu from './Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      let heroHeight = 0;
      if (heroSection) {
        heroHeight = heroSection.offsetHeight;
      }
      // Margem para o conteúdo da próxima sessão
      const threshold = window.innerWidth < 640 ? 40 : 100;
      const scrolled = window.scrollY > (heroHeight ? heroHeight - threshold : threshold);
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoColorClass = (() => {
    if (isMobileMenuOpen) {
      return 'text-black dark:text-white';
    }
    if (!isHome) {
      return 'text-black dark:text-white';
    }
    return isScrolled ? 'text-black dark:text-white' : 'text-white dark:text-white';
  })();

  const hasLightBackground = !isMobileMenuOpen && (isScrolled || !isHome);

  const headerBackgroundClass = isMobileMenuOpen
    ? 'fixed bg-transparent dark:bg-transparent'
    : hasLightBackground
      ? 'fixed bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-800'
      : 'absolute bg-transparent';

  return (
    <header
      className={`${headerBackgroundClass} top-0 left-0 right-0 transition-all duration-300 z-50`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`text-3xl md:text-4xl font-bold ${logoColorClass} z-50 relative font-logo tracking-wider transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} focus:outline-none hover:text-yellow-500 hover:opacity-70 hover:transition-colors hover:duration-300 cursor-pointer`}
            aria-label="Ir para a página inicial"
          >
            Dayvson Marques
          </Link>

          <div className="flex items-center space-x-3 z-50 relative">
            <div className={`flex items-center space-x-3 transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <div className="z-50 relative">
              <Menu
                isOpen={isMobileMenuOpen}
                onToggle={toggleMobileMenu}
                isScrolled={isScrolled}
                hasLightBackground={hasLightBackground}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
