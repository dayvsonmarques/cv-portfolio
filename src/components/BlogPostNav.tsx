'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';

type BlogPostNavProps = {
  nextPostSlug?: string;
};

const BlogPostNav = ({ nextPostSlug }: BlogPostNavProps) => {
  const { t } = useApp();

  return (
    <div className="flex justify-between items-center mt-12">
      <Link href="/blog" className="text-black italic text-lg font-title transition-colors flex items-center gap-2 hover:text-yellow-500">
        <span aria-hidden="true">←</span>
        {t('blogSection.backToBlog')}
      </Link>
      {nextPostSlug && (
        <Link href={`/blog/${nextPostSlug}`} className="text-black italic text-lg font-title transition-colors flex items-center gap-2 hover:text-yellow-500">
          {t('blogSection.nextPost')}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
};

export default BlogPostNav;
