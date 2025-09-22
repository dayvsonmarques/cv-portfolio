import React from 'react';
// ...existing code...
import PostDate from '@/components/PostDate';
import { blogPosts } from '@/components/BlogPosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogImageParallax from '@/components/BlogImageParallax';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();

  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const prevPost = blogPosts[currentIndex - 1];
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-10 mt-10 relative">
        <BlogImageParallax src={post.image} alt={post.title} />
        <div className="container mx-auto max-w-6xl px-4">

          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { href: "/blog", label: "Blog" },
              { href: `/blog/${post.slug}`, label: post.title, active: true },
            ]}
          />

          <h1 className="text-4xl font-bold mb-6 mt-12 text-black dark:text-white text-center">{post.title}</h1>
          <div className="flex flex-col items-center mb-4">
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {post.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-6">
              <div className="flex items-center gap-2 text-base text-gray-700 font-medium h-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="leading-none text-sm text-gray-800">{post.author}</p>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700 font-medium h-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="leading-none"><PostDate date={post.date} /></span>
              </div>
            </div>
          </div>
          <article className="prose prose-lg dark:prose-invert mx-auto mt-10 pt-10 mb-10 pb-10">
            <p>{post.excerpt}</p>
            <div className="mt-6">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="flex justify-between items-center mt-12">
            <Link href="/blog" className="text-black italic text-lg font-title transition-colors flex items-center gap-2 hover:text-yellow-500">
              <span aria-hidden="true">←</span>
              Voltar ao Blog
            </Link>
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="text-black italic text-lg font-title transition-colors flex items-center gap-2 hover:text-yellow-500">
                Próximo Post
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
