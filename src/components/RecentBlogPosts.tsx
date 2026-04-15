'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { blogPosts } from './BlogPosts';
import Link from 'next/link';
import Image from 'next/image';
import PostDate from '@/components/PostDate';
import { useApp } from '@/contexts/AppContext';

type RecentBlogPostsProps = {
  title?: string;
  viewAll?: string;
};

const CARD_WIDTH = 288; // w-72 = 288px
const GAP = 24;         // gap-6 = 24px
const STEP = CARD_WIDTH + GAP;
const AUTO_INTERVAL = 4000;

const RecentBlogPosts: React.FC<RecentBlogPostsProps> = ({ title, viewAll }) => {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);

  // currentRef is the source of truth — avoids stale closures in callbacks
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  // Flag to ignore scroll events fired during programmatic scrollTo
  const isProgrammaticScroll = useRef(false);

  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const total = recent.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      currentRef.current = next;
      setCurrent(next);

      isProgrammaticScroll.current = true;
      trackRef.current?.scrollTo({ left: next * STEP, behavior: 'smooth' });

      // Release the lock after smooth scroll animation (~500ms)
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    },
    [total]
  );

  // Always read from ref so these callbacks never go stale
  const goNext = useCallback(() => goTo(currentRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(currentRef.current - 1), [goTo]);

  // Auto-advance — depends on `current` state to reset the timer each step
  useEffect(() => {
    if (hovered) return;
    timerRef.current = setTimeout(goNext, AUTO_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current, hovered, goNext]);

  // Sync dot only on real user drag/touch scroll
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / STEP) % total;
    const safe = idx < 0 ? 0 : idx;
    currentRef.current = safe;
    setCurrent(safe);
  }, [total]);

  return (
    <section id="blog" className="my-4">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center pb-5 mb-10 pt-10">
          <h2 className="text-display font-heading font-bold mb-4 text-black dark:text-white text-center pt-10 mt-10">
            {title ?? t('blogSection.title')}
          </h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full" />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white dark:from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white dark:from-black to-transparent" />

        {/* Arrow prev */}
        <button
          onClick={goPrev}
          aria-label="Post anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-500 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow next */}
        <button
          onClick={goNext}
          aria-label="Próximo post"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-500 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-4 px-14 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {recent.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex-shrink-0 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="w-full h-44 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="288px"
                  className="object-cover"
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

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {recent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Ir para post ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'w-6 h-2 bg-black dark:bg-white'
                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'
            }`}
          />
        ))}
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
