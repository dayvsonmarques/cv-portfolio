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
          className="fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out"
        >
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
              {[{id:'about',label:t('nav.about')},{id:'skills',label:t('nav.skills')},{id:'experience',label:t('nav.experience')},{id:'projects',label:t('nav.projects')},{id:'contact',label:t('nav.contact')}].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="menu-fullscreen-item text-4xl lg:text-5xl font-heading text-black font-bold uppercase tracking-wider relative px-2 py-2 transition-all duration-500 ease-in-out"
                >
                  {item.label}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full menu-fullscreen-underline"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;