"use client";
import React from 'react';
import { useTheme } from 'next-themes';
import { useParallax } from '@/hooks/useParallax';

export const ParallaxBackground = () => {
  const { theme } = useTheme();
  const { x, y } = useParallax();

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
      {/* Fundo gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-50 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900" />
      {/* SVG do mangue-circuito inline com parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30"
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      >
        <svg width="600" height="400" viewBox="0 0 600 400" className="w-full h-full scale-150">
          <g className="text-black dark:text-white">
            {/* Raízes centrais principais */}
            <path
              d="M300 400 C300 300, 300 250, 300 180 C300 130, 250 100, 200 140 C150 180, 100 150, 150 80"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d="M300 400 C300 300, 350 250, 400 180 C450 130, 500 180, 450 80"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Nós principais */}
            <circle cx="300" cy="180" r="5" fill="currentColor" opacity="0.9"/>
            <circle cx="200" cy="140" r="4" fill="currentColor" opacity="0.8"/>
            <circle cx="400" cy="180" r="4" fill="currentColor" opacity="0.8"/>
            <circle cx="150" cy="80" r="4" fill="currentColor" opacity="0.8"/>
            <circle cx="450" cy="80" r="4" fill="currentColor" opacity="0.8"/>
            {/* Raízes de base (estilo manguezal) */}
            <path
              d="M50 400 C80 380, 120 390, 150 370"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path
              d="M150 400 C180 380, 220 390, 250 370"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path
              d="M350 400 C380 380, 420 390, 450 370"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path
              d="M450 400 C480 380, 520 390, 550 370"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
