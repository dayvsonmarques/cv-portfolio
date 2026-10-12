import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PostDate from '@/components/PostDate';
import type { BlogPost } from '@/types/blog';

type BlogPostsProps = {
  posts: BlogPost[];
};

export default function BlogPosts({ posts }: BlogPostsProps) {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-10">
      <div className="text-center pb-10 mb-10">
        <h1 className="text-display font-heading font-bold text-black dark:text-white mb-6 tracking-tight">
          Postagens
        </h1>
        <div className="w-24 sm:w-32 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <article
            key={post.slug}
            id={`post-${post.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <PostDate date={post.date} className="text-sm text-gray-500 dark:text-gray-400" />
              </div>
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-auto"
              >
                Ler mais
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
