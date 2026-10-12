import React from 'react';
import PostDate from '@/components/PostDate';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogImageParallax from '@/components/BlogImageParallax';
import BlogPostNav from '@/components/BlogPostNav';
import Breadcrumb from '@/components/Breadcrumb';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const nextPost = allPosts[currentIndex + 1];

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
              <PostDate
                date={post.date}
                className="leading-none text-base text-gray-700 dark:text-gray-300 font-medium"
              />
            </div>
          </div>
          <article className="prose prose-xl dark:prose-invert mx-auto mt-10 pt-10 mb-10 pb-10 font-roboto">
            <p className="text-2xl mb-5 font-roboto">{post.excerpt}</p>
            <div
              className="mt-6 [&_a]:font-bold [&_a]:italic [&_a]:text-black [&_a]:dark:text-white [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <BlogPostNav nextPostSlug={nextPost?.slug} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
