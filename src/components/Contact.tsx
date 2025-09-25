'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const Contact = () => {
  const { t } = useApp();

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-display font-heading font-bold text-black dark:text-white mb-4 tracking-tight">{t('contact.title')}</h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
          <p className="text-large font-body text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <p className="text-black dark:text-white font-body text-lg">Entre em contato, vamos construir algo juntos.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
