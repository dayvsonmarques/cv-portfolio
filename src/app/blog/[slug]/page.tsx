import React from 'react';
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
            <span className="block text-xs text-gray-400 mb-2">Por {post.author}</span>
          </div>

          {/* Renderiza a data apenas no cliente para evitar mismatch SSR/CSR */}
          {typeof window !== 'undefined' ? (
            <p className="text-sm text-gray-500 mb-4 text-center">{new Date(post.date).toLocaleDateString()}</p>
          ) : (
            <p className="text-sm text-gray-500 mb-4 text-center">{post.date}</p>
          )}
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
