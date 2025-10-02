'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isScrolled?: boolean;
  hasLightBackground?: boolean;
}

const Menu = ({ isOpen, onToggle, isScrolled = false, hasLightBackground = false }: MenuProps) => {
  const { t } = useApp();

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
    onToggle();
  };

  const buttonIconClasses = isOpen
    ? 'text-white hover:text-yellow-400 dark:text-white dark:hover:text-yellow-400'
    : isScrolled || hasLightBackground
      ? 'text-black dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400'
      : 'text-white dark:text-gray-300 hover:text-yellow-400 dark:hover:text-white';

  const menuItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'footer', label: t('nav.contact') },
  ];

  return (
    <>
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

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out bg-gradient-to-br from-neutral-900/95 via-black/90 to-neutral-900/95 text-white backdrop-blur-xl ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'opacity' }}
      >
        <div
          className={`h-full flex flex-col items-center justify-center px-6 transition-all duration-400 ease-out ${
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-105'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="menu-fullscreen-item group text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider relative px-2 py-2 transition-all duration-500 ease-in-out text-white hover:text-yellow-400"
              >
                {item.label}
                <span className="pointer-events-none absolute left-1/2 top-1/2 w-2/3 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full menu-fullscreen-underline"></span>
              </button>
            ))}
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;