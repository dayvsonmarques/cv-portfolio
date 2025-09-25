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
        className="absolute inset-0 flex items-center justify-center opacity-25 dark:opacity-35"
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      >
        <svg width="900" height="600" viewBox="0 0 900 600" className="w-full h-full scale-110">
          <g className="text-black dark:text-white">
            
            {/* Circuito principal - representa conexões de rede/API */}
            <path
              d="M150 300 L250 300 L250 200 L400 200 L400 250 L550 250 L550 150 L700 150"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              opacity="0.9"
              strokeDasharray="8,4"
            />
            <path
              d="M150 300 L250 300 L250 400 L400 400 L400 350 L550 350 L550 450 L700 450"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              opacity="0.9"
              strokeDasharray="8,4"
            />
            
            {/* Nós representando diferentes tecnologias */}
            {/* Servidor/Backend */}
            <rect x="130" y="280" width="40" height="40" fill="currentColor" opacity="0.9" rx="4"/>
            <rect x="138" y="290" width="24" height="4" fill="white" opacity="0.9"/>
            <rect x="138" y="298" width="24" height="4" fill="white" opacity="0.9"/>
            <rect x="138" y="306" width="24" height="4" fill="white" opacity="0.9"/>
            
            {/* Database */}
            <ellipse cx="250" cy="400" rx="25" ry="12" fill="currentColor" opacity="0.9"/>
            <ellipse cx="250" cy="396" rx="25" ry="12" fill="currentColor" opacity="0.9"/>
            <ellipse cx="250" cy="392" rx="25" ry="12" fill="currentColor" opacity="0.9"/>
            
            {/* API Gateway */}
            <circle cx="400" cy="250" r="20" fill="currentColor" opacity="0.9"/>
            <circle cx="400" cy="250" r="8" fill="white" opacity="0.9"/>
            <circle cx="400" cy="250" r="4" fill="currentColor" opacity="0.9"/>
            
            {/* Frontend/Browser */}
            <rect x="680" y="130" width="40" height="30" fill="currentColor" opacity="0.9" rx="5"/>
            <rect x="688" y="140" width="24" height="15" fill="white" opacity="0.9"/>
            <circle cx="692" cy="146" r="2" fill="currentColor" opacity="0.7"/>
            <circle cx="696" cy="146" r="2" fill="currentColor" opacity="0.7"/>
            <circle cx="700" cy="146" r="2" fill="currentColor" opacity="0.7"/>
            
            {/* Mobile */}
            <rect x="680" y="430" width="30" height="50" fill="currentColor" opacity="0.9" rx="12"/>
            <rect x="690" y="440" width="10" height="25" fill="white" opacity="0.9"/>
            <circle cx="695" cy="470" r="3" fill="white" opacity="0.9"/>
            
            {/* Código representado por linhas */}
            <g opacity="0.8">
              {/* Bloco de código 1 */}
              <rect x="300" y="80" width="120" height="80" fill="currentColor" opacity="0.15" rx="8"/>
              <line x1="315" y1="100" x2="380" y2="100" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="315" y1="115" x2="365" y2="115" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="325" y1="130" x2="390" y2="130" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="315" y1="145" x2="355" y2="145" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              
              {/* Bloco de código 2 */}
              <rect x="480" y="480" width="120" height="80" fill="currentColor" opacity="0.15" rx="8"/>
              <line x1="495" y1="500" x2="560" y2="500" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="495" y1="515" x2="545" y2="515" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="505" y1="530" x2="570" y2="530" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
              <line x1="495" y1="545" x2="535" y2="545" stroke="currentColor" strokeWidth="2.5" opacity="0.8"/>
            </g>
            
            {/* Elementos flutuantes de tecnologia */}
            {/* React symbol - maior e mais definido */}
            <g transform="translate(180, 150)" opacity="0.8">
              <circle r="5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
              <ellipse rx="20" ry="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" transform="rotate(60)"/>
              <ellipse rx="20" ry="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" transform="rotate(-60)"/>
              <circle r="3" fill="currentColor" opacity="0.9"/>
            </g>
            
            {/* Node.js hexagon - maior */}
            <g transform="translate(600, 300)" opacity="0.8">
              <polygon points="0,-15 12,-7.5 12,7.5 0,15 -12,7.5 -12,-7.5" fill="currentColor" opacity="0.9"/>
              <circle cx="0" cy="0" r="6" fill="white" opacity="0.9"/>
            </g>
            
            {/* Git branches - mais visível */}
            <g opacity="0.8">
              <circle cx="450" cy="80" r="5" fill="currentColor" opacity="0.9"/>
              <circle cx="480" cy="65" r="5" fill="currentColor" opacity="0.9"/>
              <circle cx="510" cy="80" r="5" fill="currentColor" opacity="0.9"/>
              <path d="M450 80 Q465 55 480 65 Q495 75 510 80" stroke="currentColor" fill="none" strokeWidth="2.5" opacity="0.9"/>
            </g>
            
            {/* Sinal de rede/conectividade - mais forte */}
            <g transform="translate(100, 120)" opacity="0.8">
              <path d="M0 15 Q8 7 15 15" stroke="currentColor" fill="none" strokeWidth="2.5" opacity="0.9"/>
              <path d="M-5 20 Q8 2 20 20" stroke="currentColor" fill="none" strokeWidth="2.5" opacity="0.9"/>
              <path d="M-10 25 Q8 -3 25 25" stroke="currentColor" fill="none" strokeWidth="2.5" opacity="0.9"/>
            </g>
            
            {/* Docker/Container */}
            <g transform="translate(750, 250)" opacity="0.8">
              <rect x="-15" y="-10" width="30" height="20" fill="currentColor" opacity="0.9" rx="3"/>
              <rect x="-12" y="-7" width="8" height="4" fill="white" opacity="0.9"/>
              <rect x="-2" y="-7" width="8" height="4" fill="white" opacity="0.9"/>
              <rect x="8" y="-7" width="4" height="4" fill="white" opacity="0.9"/>
              <rect x="-12" y="-1" width="24" height="2" fill="white" opacity="0.9"/>
              <rect x="-12" y="3" width="24" height="4" fill="white" opacity="0.9"/>
            </g>
            
            {/* Cloud/Deploy */}
            <g transform="translate(150, 500)" opacity="0.8">
              <ellipse cx="0" cy="0" rx="20" ry="8" fill="currentColor" opacity="0.9"/>
              <ellipse cx="-15" cy="-5" rx="12" ry="6" fill="currentColor" opacity="0.9"/>
              <ellipse cx="15" cy="-5" rx="12" ry="6" fill="currentColor" opacity="0.9"/>
            </g>
            
            {/* Partículas/pixels flutuantes - mais visíveis */}
            <g opacity="0.6">
              <rect x="350" y="500" width="3" height="3" fill="currentColor"/>
              <rect x="500" y="180" width="3" height="3" fill="currentColor"/>
              <rect x="200" y="100" width="3" height="3" fill="currentColor"/>
              <rect x="650" y="350" width="3" height="3" fill="currentColor"/>
              <rect x="120" y="400" width="3" height="3" fill="currentColor"/>
              <rect x="780" y="200" width="3" height="3" fill="currentColor"/>
              <rect x="420" y="520" width="3" height="3" fill="currentColor"/>
              <rect x="680" y="100" width="3" height="3" fill="currentColor"/>
            </g>
            
          </g>
        </svg>
      </div>
    </div>
  );
};
