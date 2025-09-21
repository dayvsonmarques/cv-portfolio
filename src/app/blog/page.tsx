import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPosts from '../../components/BlogPosts';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white text-center">Blog</h1>
          <BlogPosts />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
