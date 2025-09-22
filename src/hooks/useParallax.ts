
"use client";
import { useEffect, useState } from 'react';

export const useParallax = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40; // Aumentado para 40
        const y = (e.clientY / window.innerHeight - 0.5) * 40; // Aumentado para 40
        setOffset({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) return { x: 0, y: 0 };
  return offset;
};
