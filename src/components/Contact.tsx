'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const Contact = () => {
  const { t } = useApp();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com um serviço de email como EmailJS, Formspree, etc.
    alert('Mensagem enviada! Entrarei em contato em breve.');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-gray-600 dark:bg-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <p className="text-black">Entre em contato, vamos construir algo juntos.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
