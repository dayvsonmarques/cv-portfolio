import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Blog | Dayvson Marques',
  description: 'Postagens sobre desenvolvimento web, Next.js, Tailwind CSS, IA e produtividade.',
  alternates: {
    canonical: new URL('/blog', siteConfig.siteUrl).toString(),
  },
  openGraph: {
    title: 'Blog | Dayvson Marques',
    description: 'Artigos sobre desenvolvimento web moderno, desempenho e automação.',
    url: new URL('/blog', siteConfig.siteUrl).toString(),
    siteName: 'Dayvson Marques',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Dayvson Marques',
    description: 'Artigos sobre desenvolvimento web moderno, desempenho e automação.',
  },
};
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPosts from '@/components/BlogPosts';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <BlogPosts />
        </div>
      </main>
      <Footer />
    </div>
  );

};

export default BlogPage;
