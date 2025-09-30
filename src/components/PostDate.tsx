"use client";
import React, { useMemo } from "react";
import clsx from "clsx";
import { useApp } from "@/contexts/AppContext";

interface PostDateProps {
  date: string;
  className?: string;
}

const localeMap = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES"
} as const;

const PostDate: React.FC<PostDateProps> = ({ date, className }) => {
  const { language } = useApp();
  const locale = localeMap[language] ?? localeMap.pt;

  const { formattedDate, isoDate } = useMemo(() => {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return { formattedDate: date, isoDate: undefined };
    }

    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    return {
      formattedDate: formatter.format(parsedDate),
      isoDate: parsedDate.toISOString()
    };
  }, [date, locale]);

  const composedClassName = clsx(
    'inline-flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200',
    className
  );

  return (
    <time className={composedClassName} dateTime={isoDate}>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span>{formattedDate}</span>
    </time>
  );
};

export default PostDate;
