'use client';

import React from 'react';
import Link from 'next/link';
import SocialIcons from './SocialIcons';
import CurrentYear from './CurrentYear';
import WaveDivider from './WaveDivider';

const Footer = () => {
  return (
    <>
      <WaveDivider />
      <footer className="bg-black text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Social Links Section */}
          <div className="flex justify-center mb-8">
            <SocialIcons variant="hero" showTooltips={true} />
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                <Link href="/" className="hover:text-white transition-colors">
                  Dayvson Marques
                </Link>{' '}
                © <CurrentYear />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
