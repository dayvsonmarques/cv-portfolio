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

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
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

const BlogPostPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
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
              {post.author && (
                <span className="inline-flex items-center gap-2 text-base text-gray-700 dark:text-gray-300 font-medium h-7">
                  <svg
                    className="h-5 w-5 text-yellow-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M7 9a4 4 0 1 0 10 0 4 4 0 0 0-10 0" />
                    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                  </svg>
                  <span className="leading-none text-sm lg:text-base text-gray-800 dark:text-gray-200">{post.author}</span>
                </span>
              )}
              <PostDate
                date={post.date}
                className="leading-none text-base text-gray-700 dark:text-gray-300 font-medium"
              />
            </div>
          </div>
          <article className="prose prose-xl dark:prose-invert mx-auto mt-10 pt-10 mb-10 pb-10 font-roboto">
            <p className="text-2xl mb-5 font-roboto">{post.excerpt}</p>
            <div className="mt-6">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-5 text-2xl font-roboto">{paragraph}</p>
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
