import React from 'react';
import { blogPosts } from './BlogPosts';
import Link from 'next/link';
import Image from 'next/image';

const RecentBlogPosts: React.FC = () => {
  const recent = blogPosts.slice(0, 3);
  return (
    <section className="my-16">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-8 text-black dark:text-white text-center">Últimas do Blog</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {recent.map(post => (
            <Link href={`/blog#post-${post.id}`} key={post.id} className="block bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
              <div className="w-full h-40 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-t-lg"
                  priority={true}
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition-colors">Ver todas as postagens</Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
