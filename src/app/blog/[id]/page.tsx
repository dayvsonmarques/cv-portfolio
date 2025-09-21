import React from 'react';
import { blogPosts } from '@/components/BlogPosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === Number(params.id));
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      url: `/blog/${post.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const BlogPostPage = ({ params }: { params: { id: string } }) => {
  const post = blogPosts.find(p => p.id === Number(params.id));
  if (!post) return notFound();

  // Navegação entre posts
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = blogPosts[currentIndex - 1];
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:underline text-yellow-600">Blog</Link>
            <span>/</span>
            <span className="text-black dark:text-white font-bold">{post.title}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-6 mt-12 text-black dark:text-white text-center">{post.title}</h1>
          <div className="flex flex-col items-center mb-4">
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {post.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <span className="block text-xs text-gray-400 mb-2">Por {post.author}</span>
          </div>
          <div className="w-full h-64 relative mb-8 rounded-lg overflow-hidden">
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority unoptimized />
          </div>
          <p className="text-sm text-gray-500 mb-4 text-center">{new Date(post.date).toLocaleDateString()}</p>
          <article className="prose prose-lg dark:prose-invert mx-auto">
            <p>{post.excerpt}</p>
            <div className="mt-6">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>
          {/* Navegação entre posts */}
          <div className="flex justify-between items-center mt-12">
            {prevPost ? (
              <Link href={`/blog/${prevPost.id}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-yellow-500 hover:text-white transition-colors">← {prevPost.title}</Link>
            ) : <span />}
            <Link href="/blog" className="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition-colors">Voltar ao Blog</Link>
            {nextPost ? (
              <Link href={`/blog/${nextPost.id}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-yellow-500 hover:text-white transition-colors">{nextPost.title} →</Link>
            ) : <span />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
