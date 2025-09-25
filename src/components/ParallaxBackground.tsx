"use client";
import React from 'react';
import { useParallax } from '@/hooks/useParallax';

export const ParallaxBackground = () => {
  const { x, y } = useParallax();

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
      {/* Fundo gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-50 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900" />
      
      {/* SVG de tecnologia e desenvolvimento web com parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30"
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      >
        <svg width="800" height="500" viewBox="0 0 800 500" className="w-full h-full scale-125">
          <g className="text-black dark:text-white">
            
            {/* Circuito principal - representa conexões de rede/API */}
            <path
              d="M100 250 L200 250 L200 150 L350 150 L350 200 L500 200 L500 100 L650 100"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              opacity="0.8"
              strokeDasharray="5,5"
            />
            <path
              d="M100 250 L200 250 L200 350 L350 350 L350 300 L500 300 L500 400 L650 400"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              opacity="0.8"
              strokeDasharray="5,5"
            />
            
            {/* Nós representando diferentes tecnologias */}
            {/* Servidor/Backend */}
            <rect x="90" y="235" width="20" height="30" fill="currentColor" opacity="0.9" rx="2"/>
            <rect x="94" y="240" width="12" height="3" fill="white" opacity="0.8"/>
            <rect x="94" y="245" width="12" height="3" fill="white" opacity="0.8"/>
            <rect x="94" y="250" width="12" height="3" fill="white" opacity="0.8"/>
            
            {/* Database */}
            <ellipse cx="200" cy="350" rx="15" ry="8" fill="currentColor" opacity="0.8"/>
            <ellipse cx="200" cy="347" rx="15" ry="8" fill="currentColor" opacity="0.8"/>
            <ellipse cx="200" cy="344" rx="15" ry="8" fill="currentColor" opacity="0.8"/>
            
            {/* API Gateway */}
            <circle cx="350" cy="200" r="12" fill="currentColor" opacity="0.9"/>
            <text x="350" y="206" textAnchor="middle" className="text-xs fill-white font-bold">API</text>
            
            {/* Frontend/Browser */}
            <rect x="635" y="85" width="30" height="20" fill="currentColor" opacity="0.9" rx="3"/>
            <rect x="640" y="90" width="20" height="10" fill="white" opacity="0.8"/>
            
            {/* Mobile */}
            <rect x="640" y="390" width="20" height="30" fill="currentColor" opacity="0.9" rx="8"/>
            <rect x="645" y="395" width="10" height="15" fill="white" opacity="0.8"/>
            <circle cx="650" cy="415" r="2" fill="white" opacity="0.8"/>
            
            {/* Código representado por linhas */}
            <g opacity="0.6">
              {/* Bloco de código 1 */}
              <rect x="250" y="50" width="100" height="60" fill="currentColor" opacity="0.1" rx="5"/>
              <line x1="260" y1="60" x2="320" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="260" y1="70" x2="310" y2="70" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="270" y1="80" x2="330" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="260" y1="90" x2="300" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              
              {/* Bloco de código 2 */}
              <rect x="450" y="400" width="100" height="60" fill="currentColor" opacity="0.1" rx="5"/>
              <line x1="460" y1="410" x2="520" y2="410" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="460" y1="420" x2="510" y2="420" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="470" y1="430" x2="530" y2="430" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
              <line x1="460" y1="440" x2="500" y2="440" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
            </g>
            
            {/* Elementos flutuantes de tecnologia */}
            {/* React symbol */}
            <g transform="translate(150, 120)">
              <circle r="3" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
              <ellipse rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" transform="rotate(60)"/>
              <ellipse rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" transform="rotate(-60)"/>
              <circle r="1.5" fill="currentColor" opacity="0.8"/>
            </g>
            
            {/* Node.js hexagon */}
            <g transform="translate(550, 250)">
              <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="currentColor" opacity="0.6"/>
            </g>
            
            {/* Git branches */}
            <g opacity="0.5">
              <circle cx="400" cy="50" r="3" fill="currentColor"/>
              <circle cx="420" cy="40" r="3" fill="currentColor"/>
              <circle cx="440" cy="50" r="3" fill="currentColor"/>
              <path d="M400 50 Q410 35 420 40 Q430 45 440 50" stroke="currentColor" fill="none" strokeWidth="1.5"/>
            </g>
            
            {/* Sinal de rede/conectividade */}
            <g transform="translate(70, 100)" opacity="0.6">
              <path d="M0 10 Q5 5 10 10" stroke="currentColor" fill="none" strokeWidth="1.5"/>
              <path d="M-3 13 Q5 2 13 13" stroke="currentColor" fill="none" strokeWidth="1.5"/>
              <path d="M-6 16 Q5 -1 16 16" stroke="currentColor" fill="none" strokeWidth="1.5"/>
            </g>
            
            {/* Partículas/pixels flutuantes */}
            <g opacity="0.4">
              <rect x="300" y="400" width="2" height="2" fill="currentColor"/>
              <rect x="450" y="150" width="2" height="2" fill="currentColor"/>
              <rect x="180" y="80" width="2" height="2" fill="currentColor"/>
              <rect x="600" y="300" width="2" height="2" fill="currentColor"/>
              <rect x="120" y="350" width="2" height="2" fill="currentColor"/>
              <rect x="720" y="180" width="2" height="2" fill="currentColor"/>
            </g>
            
          </g>
        </svg>
      </div>
    </div>
  );
};
