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
      <footer className="bg-black text-white py-4">
        <div className="max-w-6xl mx-auto px-6">
          {/* Social Links Section */}
          <div className="flex justify-center mb-16 sm:mb-20 pt-24 pb-10">
            <SocialIcons variant="hero" showTooltips={true} />
          </div>

          {/* Bottom Section */}
          <div>
            <div className="text-center">
              <p className="text-white text-sm">
                <Link href="/" className="hover:text-yellow-500 transition-colors">
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
