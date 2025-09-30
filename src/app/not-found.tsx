'use client';

import { useApp } from '@/contexts/AppContext';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFoundPage = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24 mt-10 pt-10">
        <div className="max-w-2xl text-center">
          <p className="text-8xl font-bold uppercase tracking-[0.3em] text-black mt-10 pt-10 dark:text-white">404</p>
          <h1 className="mt-6 text-3xl sm:text-6xl font-heading font-extrabold text-gray-900 dark:text-white">
            {t('notFound.title')}
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('notFound.description')}
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('notFound.prompt')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              aria-label={t('notFound.cta')}
              className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-3 text-base font-semibold text-black transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            >
              {t('notFound.cta')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
