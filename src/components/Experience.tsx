'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { experiences } from '@/data/experiences';

const Experience = () => {
  const { t, language } = useApp();
  const locale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    [locale]
  );

  const formatPeriod = useCallback(
    (startDate: string, endDate?: string | null, isCurrent?: boolean) => {
      const formatDate = (value?: string | null) => {
        if (!value) return '';
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed);
      };

      const formattedStart = formatDate(startDate);
      const formattedEnd = isCurrent || !endDate ? t('experience.present') : formatDate(endDate);

      return formattedEnd ? `${formattedStart} - ${formattedEnd}` : formattedStart;
    },
    [dateFormatter, t]
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    if (maxScrollLeft <= 5) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 5);
  }, []);

  React.useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const id = window.requestAnimationFrame(() => {
      const maxScrollLeft = Math.max(el.scrollWidth - el.clientWidth, 0);
      el.scrollTo({ left: maxScrollLeft, behavior: 'auto' });
      updateScrollButtons();
    });

    return () => window.cancelAnimationFrame(id);
  }, [language, updateScrollButtons]);


  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)] pt-10">
        <div className="text-center mb-16">
          <h2 className="text-display font-heading font-bold text-black dark:text-white mb-4 tracking-tight">
            {t('experience.title')}
          </h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
        </div>
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0.5 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
              aria-label="Voltar"
            >
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 z-20 p-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
              aria-label="Avançar"
            >
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden horizontal-scroll pb-4 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative flex items-stretch gap-6 px-6 sm:gap-8 sm:px-16 py-8">
              {experiences.map((exp, index) => {
                const periodLabel = formatPeriod(exp.startDate, exp.endDate, exp.isCurrent);
                return (
                  <div
                    key={`${exp.company.en}-${exp.startDate ?? 'unknown'}-${exp.endDate ?? 'present'}-${index}`}
                    className="relative flex-shrink-0 w-full max-w-[22rem] sm:max-w-none sm:w-80 snap-center"
                  >
                    <div className="bg-gray-50 dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 h-full">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-black dark:text-white tracking-tight">{exp.title[language]}</h3>
                        <h4 className="text-lg font-body font-medium text-gray-800 dark:text-gray-200">{exp.company[language]}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">({periodLabel})</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2 text-md text-justify font-body leading-relaxed">{exp.description[language]}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={`${tech}-${techIndex}`}
                            className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
