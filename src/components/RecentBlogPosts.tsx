'use client';

import React from 'react';
import { blogPosts } from './BlogPosts';
import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/PostDate';
import { useApp } from '@/contexts/AppContext';

type RecentBlogPostsProps = {
  title?: string;
  viewAll?: string;
};

const RecentBlogPosts: React.FC<RecentBlogPostsProps> = ({ title, viewAll }) => {
  const { t } = useApp();

  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  // Duplicate for seamless infinite loop
  const slides = [...recent, ...recent];

  return (
    <section id="blog" className="my-4">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center pb-5 mb-10 pt-10">
          <h2 className="text-display font-heading font-bold mb-4 text-black dark:text-white text-center pt-10 mt-10">
            {title ?? t('blogSection.title')}
          </h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
        </div>
      </div>

      {/* Infinite horizontal slider — full width */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white dark:from-black to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white dark:from-black to-transparent" />

        <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused] pb-4">
          {slides.map((post, idx) => (
            <Link
              href={`/blog/${post.slug}`}
              key={`${post.id}-${idx}`}
              className="block w-72 flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-full h-44 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="288px"
                  className="object-cover"
                  priority={idx < 4}
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-black dark:text-white mb-2 text-center line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <PostDate date={post.date} className="text-xs text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-1 mb-3 justify-center">
                  {post.categories.slice(0, 2).map((category, cidx) => (
                    <span
                      key={cidx}
                      className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-xs leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-gray-800 text-white font-bold rounded hover:bg-yellow-600 transition-colors"
          >
            {viewAll ?? t('blogSection.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
