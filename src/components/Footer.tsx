'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import SocialIcons from './SocialIcons';
import CurrentYear from './CurrentYear';

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center pb-10 mb-5 m-auto">
          <h3 className="text-display font-heading font-bold text-white mb-6 font-heading">
            Contato
          </h3>
          <div className="w-32 h-1 bg-white mx-auto mb-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="space-y-6 pb-10">
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Email</p>
                  <p className="text-white text-lg font-medium">dayvson.marques@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Telefone</p>
                  <p className="text-white text-lg font-medium">+55 (81) 99962-3374</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Localização</p>
                  <p className="text-white text-lg font-medium">Recife, PE - Brasil</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-center h-full">
              <SocialIcons variant="hero" showTooltips={true} />
            </div>
          </div>

        </div>
        <div className="pt-8 pb-2gi">
          <div className="space-y-4 md:space-y-0">
            <p className="text-gray-300 text-lg font-medium text-center">
              {t('hero.title')} © <CurrentYear />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
