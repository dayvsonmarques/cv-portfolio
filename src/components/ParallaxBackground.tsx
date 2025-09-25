"use client";
import React from 'react';
import { useParallax } from '@/hooks/useParallax';

export const ParallaxBackground = () => {
  const { x, y } = useParallax();

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
      {/* Fundo gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-50 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900" />
      
      {/* SVG com fluxo de desenvolvimento: Database → Backend → Frontend */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-35 dark:opacity-45"
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      >
        <svg width="900" height="600" viewBox="0 0 900 600" className="w-full h-full">
          <g className="text-black dark:text-white">
            
            {/* FLUXO PRINCIPAL: Database → Backend → Frontend */}
            
            {/* Linha principal do fluxo */}
            <path
              d="M200 300 L400 300 L600 300"
              stroke="currentColor"
              fill="none"
              strokeWidth="6"
              opacity="0.7"
              strokeDasharray="15,10"
            />
            
            {/* Setas do fluxo */}
            <polygon points="350,290 350,310 375,300" fill="currentColor" opacity="0.8"/>
            <polygon points="550,290 550,310 575,300" fill="currentColor" opacity="0.8"/>
            
            {/* 1. DATABASE - Melhorado com design mais realista */}
            <g transform="translate(200, 300)" opacity="0.9">
              {/* Base do banco */}
              <ellipse cx="0" cy="20" rx="35" ry="10" fill="currentColor"/>
              {/* Camadas do banco */}
              <ellipse cx="0" cy="10" rx="35" ry="10" fill="currentColor"/>
              <ellipse cx="0" cy="0" rx="35" ry="10" fill="currentColor"/>
              <ellipse cx="0" cy="-10" rx="35" ry="10" fill="currentColor"/>
              
              {/* Cilindro lateral */}
              <rect x="-35" y="-10" width="70" height="30" fill="currentColor"/>
              
              {/* Superfícies visíveis */}
              <ellipse cx="0" cy="-10" rx="35" ry="10" fill="white" opacity="0.9"/>
              <ellipse cx="0" cy="0" rx="35" ry="10" fill="white" opacity="0.3"/>
              <ellipse cx="0" cy="10" rx="35" ry="10" fill="white" opacity="0.2"/>
              <ellipse cx="0" cy="20" rx="35" ry="10" fill="white" opacity="0.1"/>
              
              {/* Indicadores de dados */}
              <line x1="-25" y1="-5" x2="25" y2="-5" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
              <line x1="-25" y1="0" x2="20" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
              <line x1="-25" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
              <line x1="-25" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              
              {/* Label */}
              <text x="0" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" opacity="0.8">DATABASE</text>
            </g>

            {/* 2. BACKEND SERVER - Com logo PHP oficial */}
            <g transform="translate(400, 300)" opacity="0.9">
              {/* Servidor */}
              <rect x="-30" y="-25" width="60" height="50" fill="currentColor" rx="8"/>
              <rect x="-25" y="-20" width="50" height="7" fill="white" opacity="0.9"/>
              <rect x="-25" y="-10" width="50" height="7" fill="white" opacity="0.9"/>
              <rect x="-25" y="0" width="50" height="7" fill="white" opacity="0.9"/>
              <rect x="-25" y="10" width="50" height="7" fill="white" opacity="0.9"/>
              
              {/* LEDs de status */}
              <circle cx="20" cy="-15" r="2" fill="#10b981"/>
              <circle cx="20" cy="-5" r="2" fill="#10b981"/>
              <circle cx="20" cy="5" r="2" fill="#f59e0b"/>
              
              {/* Logo PHP oficial */}
              <g transform="translate(0, -50)" opacity="0.9">
                <ellipse cx="0" cy="0" rx="25" ry="15" fill="#777BB4"/>
                <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">PHP</text>
              </g>
              
              {/* Label */}
              <text x="0" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" opacity="0.8">BACKEND</text>
            </g>

            {/* 3. FRONTEND - Browser com tecnologias */}
            <g transform="translate(600, 300)" opacity="0.9">
              {/* Browser window */}
              <rect x="-35" y="-30" width="70" height="55" fill="currentColor" rx="10"/>
              <rect x="-30" y="-20" width="60" height="35" fill="white" opacity="0.95"/>
              
              {/* Browser controls */}
              <circle cx="-25" cy="-25" r="3" fill="#ef4444"/>
              <circle cx="-15" cy="-25" r="3" fill="#f59e0b"/>
              <circle cx="-5" cy="-25" r="3" fill="#10b981"/>
              
              {/* Content representation */}
              <rect x="-25" y="-15" width="50" height="4" fill="currentColor" opacity="0.3"/>
              <rect x="-25" y="-8" width="40" height="4" fill="currentColor" opacity="0.3"/>
              <rect x="-25" y="-1" width="45" height="4" fill="currentColor" opacity="0.3"/>
              <rect x="-25" y="6" width="35" height="4" fill="currentColor" opacity="0.3"/>
              
              {/* Logo React */}
              <g transform="translate(0, -55)" opacity="0.9">
                <circle cx="0" cy="0" r="15" fill="none" stroke="#61dafb" strokeWidth="2"/>
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(60)"/>
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(-60)"/>
                <circle cx="0" cy="0" r="3" fill="#61dafb"/>
              </g>
              
              {/* Label */}
              <text x="0" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" opacity="0.8">FRONTEND</text>
            </g>
            
            {/* WORDPRESS - Conectado ao database */}
            <g transform="translate(150, 180)" opacity="0.8">
              {/* Logo WordPress oficial correta */}
              <g transform="scale(1.8)">
                <svg width="28" height="28" viewBox="0 0 28 28" transform="translate(-14, -14)">
                  <path fill="currentColor" d="M13.6052 0.923525C16.1432 0.923525 18.6137 1.67953 20.7062 3.09703C22.7447 4.47403 24.3512 6.41803 25.3097 8.68603C26.9837 12.6415 26.5382 17.164 24.1352 20.7145C22.7582 22.753 20.8142 24.3595 18.5462 25.318C14.5907 26.992 10.0682 26.5465 6.51772 24.1435C4.47922 22.7665 2.87272 20.8225 1.91422 18.5545C0.240225 14.599 0.685725 10.0765 3.08872 6.52603C4.46572 4.48753 6.40973 2.88103 8.67772 1.92253C10.2302 1.26103 11.9177 0.923525 13.6052 0.923525ZM13.6052 0.113525C6.15322 0.113525 0.105225 6.16153 0.105225 13.6135C0.105225 21.0655 6.15322 27.1135 13.6052 27.1135C21.0572 27.1135 27.1052 21.0655 27.1052 13.6135C27.1052 6.16153 21.0572 0.113525 13.6052 0.113525Z"/>
                  <path fill="currentColor" d="M2.36011 13.6133C2.36011 17.9198 4.81711 21.8618 8.70511 23.7383L3.33211 9.03684C2.68411 10.4813 2.36011 12.0338 2.36011 13.6133ZM21.2061 13.0463C21.2061 11.6558 20.7066 10.6973 20.2746 9.94134C19.8426 9.18534 19.1676 8.22684 19.1676 7.30884C19.1676 6.39084 19.9506 5.31084 21.0576 5.31084H21.2061C16.6296 1.11234 9.51511 1.42284 5.31661 6.01284C4.91161 6.45834 4.53361 6.93084 4.20961 7.43034H4.93861C6.11311 7.43034 7.93561 7.28184 7.93561 7.28184C8.54311 7.24134 8.61061 8.13234 8.00311 8.21334C8.00311 8.21334 7.39561 8.28084 6.72061 8.32134L10.8111 20.5118L13.2681 13.1273L11.5131 8.32134C10.9056 8.28084 10.3386 8.21334 10.3386 8.21334C9.73111 8.17284 9.79861 7.25484 10.4061 7.28184C10.4061 7.28184 12.2691 7.43034 13.3626 7.43034C14.4561 7.43034 16.3596 7.28184 16.3596 7.28184C16.9671 7.24134 17.0346 8.13234 16.4271 8.21334C16.4271 8.21334 15.8196 8.28084 15.1446 8.32134L19.2081 20.4173L20.3691 16.7453C20.8821 15.1388 21.1926 14.0048 21.1926 13.0328L21.2061 13.0463ZM13.7946 14.5853L10.4196 24.3998C12.6876 25.0613 15.1041 25.0073 17.3316 24.2243L17.2506 24.0758L13.7946 14.5853ZM23.4741 8.21334C23.5281 8.59134 23.5551 8.98284 23.5551 9.37434C23.5551 10.5218 23.3391 11.8043 22.7046 13.3973L19.2621 23.3333C24.5271 20.2688 26.4036 13.5593 23.4741 8.21334Z"/>
                </svg>
              </g>
              
              {/* Conexão com database */}
              <path d="M25 15 Q40 40 50 90" stroke="currentColor" fill="none" strokeWidth="2" opacity="0.6" strokeDasharray="4,4"/>
              
              {/* Label */}
              <text x="0" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor" opacity="0.8">WORDPRESS</text>
            </g>

            {/* JAVASCRIPT - Conectando backend e frontend */}
            <g transform="translate(500, 200)" opacity="0.8">
              {/* Logo JS */}
              <rect x="-15" y="-15" width="30" height="30" fill="#f7df1e" rx="5"/>
              <text x="0" y="5" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#323330">JS</text>
              
              {/* Conexões */}
              <path d="M-15 15 Q-30 50 -50 80" stroke="currentColor" fill="none" strokeWidth="2" opacity="0.6" strokeDasharray="4,4"/>
              <path d="M15 15 Q30 50 50 80" stroke="currentColor" fill="none" strokeWidth="2" opacity="0.6" strokeDasharray="4,4"/>
              
              {/* Label */}
              <text x="0" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor" opacity="0.8">JAVASCRIPT</text>
            </g>

            {/* Elementos de suporte visual */}
            
            {/* Código representativo */}
            <g opacity="0.3">
              {/* Bloco de código backend */}
              <rect x="320" y="360" width="160" height="70" fill="currentColor" opacity="0.1" rx="8"/>
              <line x1="330" y1="375" x2="420" y2="375" stroke="currentColor" strokeWidth="2"/>
              <line x1="330" y1="385" x2="400" y2="385" stroke="currentColor" strokeWidth="2"/>
              <line x1="330" y1="395" x2="440" y2="395" stroke="currentColor" strokeWidth="2"/>
              <line x1="330" y1="405" x2="410" y2="405" stroke="currentColor" strokeWidth="2"/>
              <line x1="330" y1="415" x2="390" y2="415" stroke="currentColor" strokeWidth="2"/>
              
              {/* Bloco de código frontend */}
              <rect x="520" y="360" width="160" height="70" fill="currentColor" opacity="0.1" rx="8"/>
              <line x1="530" y1="375" x2="620" y2="375" stroke="currentColor" strokeWidth="2"/>
              <line x1="530" y1="385" x2="600" y2="385" stroke="currentColor" strokeWidth="2"/>
              <line x1="530" y1="395" x2="640" y2="395" stroke="currentColor" strokeWidth="2"/>
              <line x1="530" y1="405" x2="610" y2="405" stroke="currentColor" strokeWidth="2"/>
            </g>

            {/* Partículas de dados fluindo */}
            <g opacity="0.6">
              <circle cx="250" cy="295" r="3" fill="currentColor">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="305" r="3" fill="currentColor">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="0.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="450" cy="295" r="3" fill="currentColor">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="550" cy="305" r="3" fill="currentColor">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1.5s" repeatCount="indefinite"/>
              </circle>
            </g>

            {/* Indicadores de fluxo adiccionais */}
            <g opacity="0.4">
              <text x="275" y="285" textAnchor="middle" fontSize="10" fill="currentColor">query</text>
              <text x="475" y="285" textAnchor="middle" fontSize="10" fill="currentColor">API</text>
              <text x="575" y="285" textAnchor="middle" fontSize="10" fill="currentColor">render</text>
            </g>
            
          </g>
        </svg>
      </div>
    </div>
  );
};
