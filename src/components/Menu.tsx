'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isScrolled?: boolean;
}

const Menu = ({ isOpen, onToggle, isScrolled = false }: MenuProps) => {
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

  const buttonIconClasses = isOpen
    ? 'text-white hover:text-yellow-400 dark:text-white dark:hover:text-yellow-400'
    : isScrolled
      ? 'text-black dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400'
      : 'text-white dark:text-gray-300 hover:text-yellow-400 dark:hover:text-white';

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={onToggle}
        className={`transition-colors z-50 relative ${buttonIconClasses}`}
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
          className="fixed inset-0 z-40 transition-opacity duration-300 ease-out bg-gradient-to-br from-neutral-900/95 via-black/90 to-neutral-900/95 text-white backdrop-blur-xl"
        >
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center justify-center gap-8 text-center">
              {[{id:'about',label:t('nav.about')},{id:'skills',label:t('nav.skills')},{id:'experience',label:t('nav.experience')},{id:'projects',label:t('nav.projects')},{id:'contact',label:t('nav.contact')}].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="menu-fullscreen-item group text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider relative px-2 py-2 transition-all duration-500 ease-in-out text-white hover:text-yellow-400"
                >
                  {item.label}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full menu-fullscreen-underline"></span>
                </button>
              ))}
              {/* Blog button */}
              <Link
                href="/blog"
                onClick={onToggle}
                className="menu-fullscreen-item group text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider relative px-2 py-2 transition-all duration-500 ease-in-out text-white hover:text-yellow-400"
              >
                {t('nav.blog')}
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full menu-fullscreen-underline"></span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;