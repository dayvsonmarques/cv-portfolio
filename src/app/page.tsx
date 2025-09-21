'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

import Footer from '@/components/Footer';
import RecentBlogPosts from '@/components/RecentBlogPosts';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
  {/* Últimas postagens do blog */}
  <RecentBlogPosts />
      <Footer />
    </div>
  );
}
