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

  const composedClassName = clsx('text-sm text-gray-800 dark:text-gray-200', className);

  return (
    <time className={composedClassName} dateTime={isoDate}>
      {formattedDate}
    </time>
  );
};

export default PostDate;
