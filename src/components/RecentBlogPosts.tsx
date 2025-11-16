'use client';

import React from 'react';
import { blogPosts } from './BlogPosts';
import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/PostDate';
import { useApp } from '@/contexts/AppContext';

const RecentBlogPosts: React.FC = () => {
  const { t } = useApp();
  
  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
    
  return (
    <section id="blog" className="my-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center pb-5 mb-10 pt-10">
          <h2 className="text-display font-heading font-bold mb-4 text-black dark:text-white text-center pt-10 mt-10">
            {t('blogSection.title')}
          </h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {recent.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
              <div className="w-full h-40 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-t-lg"
                  priority={true}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 text-center">{post.title}</h3>
                <PostDate date={post.date} className="text-sm text-gray-500 mb-3 text-center block" />
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                  {post.categories.map((category, idx) => (
                    <span 
                      key={idx}
                      className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-4 text-justify">{post.excerpt} [...]</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-block px-8 py-3 bg-gray-800 text-white font-bold rounded hover:bg-yellow-600 transition-colors">
            {t('blogSection.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
