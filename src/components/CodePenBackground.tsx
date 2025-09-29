'use client';

import React, { useEffect, useRef } from 'react';

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
  phase: number;
};

const MAX_PARTICLES = 420;
const BACKGROUND_ALPHA = 0.12;

const CodePenBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const context = canvas.getContext('2d');
    if (!context || prefersReducedMotion) {
      return;
    }

    const particles = particlesRef.current;
    const size = sizeRef.current;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      size.width = rect.width;
      size.height = rect.height;
      size.dpr = dpr;

      const baseCount = Math.min(MAX_PARTICLES, Math.round((rect.width + rect.height) / 3));
      particles.length = 0;
      const radiusBase = Math.min(rect.width, rect.height) / 2;

      for (let i = 0; i < baseCount; i += 1) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          radius: radiusBase * (0.25 + Math.random() * 0.55),
          speed: (Math.random() * 0.0006 + 0.0002) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 1.8 + 0.4,
          hue: 200 + Math.random() * 140,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();

    let lastTime = performance.now();

    const draw = (time: number) => {
      const { width, height } = size;
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const delta = Math.min(time - lastTime, 60);
      lastTime = time;

      context.fillStyle = `rgba(10, 14, 24, ${BACKGROUND_ALPHA})`;
      context.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const timeFactor = time * 0.0004;

      particles.forEach((particle, index) => {
        particle.angle += particle.speed * delta;
        const pulse = 0.85 + Math.sin(timeFactor + particle.phase + index * 0.05) * 0.18;
        const radius = particle.radius * pulse;

        const x = centerX + Math.cos(particle.angle + particle.phase) * radius;
        const y = centerY + Math.sin(particle.angle + particle.phase) * radius * 0.9;

        const tailX = centerX + Math.cos(particle.angle - particle.speed * 180) * radius;
        const tailY = centerY + Math.sin(particle.angle - particle.speed * 180) * radius * 0.9;

        const strokeGradient = context.createLinearGradient(tailX, tailY, x, y);
        strokeGradient.addColorStop(0, `hsla(${particle.hue}, 92%, 58%, 0)`);
        strokeGradient.addColorStop(0.6, `hsla(${particle.hue}, 100%, 68%, 0.18)`);
        strokeGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 72%, 0.45)`);

        context.lineWidth = particle.size * 0.8;
        context.strokeStyle = strokeGradient;
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.stroke();

        const glow = context.createRadialGradient(x, y, 0, x, y, particle.size * 16);
        glow.addColorStop(0, `hsla(${particle.hue}, 95%, 80%, 0.9)`);
        glow.addColorStop(1, 'hsla(220, 100%, 10%, 0)');

        context.beginPath();
        context.fillStyle = glow;
        context.arc(x, y, particle.size * 2, 0, Math.PI * 2);
        context.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      context.clearRect(0, 0, size.width, size.height);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-transparent dark:from-slate-900/70 dark:via-slate-800/40 dark:to-transparent" />
    </div>
  );
};

export default CodePenBackground;
