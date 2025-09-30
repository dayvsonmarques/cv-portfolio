import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24 mt-10 pt-10">
        <div className="max-w-2xl text-center">
          <p className="text-8xl font-bold uppercase tracking-[0.3em] text-black mt-10 pt-10">404</p>
          <h1 className="mt-6 text-3xl sm:text-6xl font-heading font-extrabold text-gray-900 dark:text-white">
            Página não encontrada
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            O endereço digitado pode ter sido removido, estar temporariamente indisponível ou nunca ter existido. Vamos te levar de volta para a página inicial?
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-3 text-base font-semibold text-black transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
