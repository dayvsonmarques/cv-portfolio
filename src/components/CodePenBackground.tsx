'use client';

import React, { useEffect, useRef } from 'react';

interface GridSpot {
  x: number;
  y: number;
  busyAge: number;
  spotIndex: number;
  isEdge: 'left' | 'right' | 'top' | 'bottom' | false;
  field: number;
}

interface Particle {
  hue: number;
  sat: number;
  lum: number;
  x: number;
  y: number;
  xLast: number;
  yLast: number;
  xSpeed: number;
  ySpeed: number;
  age: number;
  ageSinceStuck: number;
  attractor: {
    oldIndex: number;
    gridSpotIndex: number;
  };
  name: string;
  speed: number;
  dist: number;
}

interface AppState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dataToImageRatio: number;
  xC: number;
  yC: number;
  stepCount: number;
  particles: Particle[];
  lifespan: number;
  popPerBirth: number;
  maxPop: number;
  birthFreq: number;
  gridSize: number;
  gridSteps: number;
  grid: GridSpot[];
  gridMaxIndex: number;
  drawnInLastFrame: number;
  deathCount: number;
}

const GRID_EXTENT = 500;

const createState = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): AppState => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  return {
    canvas,
    ctx,
    width,
    height,
    dataToImageRatio: 1,
    xC: width / 2,
    yC: height / 2,
    stepCount: 0,
    particles: [],
    lifespan: 1000,
    popPerBirth: 1,
    maxPop: 300,
    birthFreq: 2,
    gridSize: 8,
    gridSteps: Math.floor(1000 / 8),
    grid: [],
    gridMaxIndex: 0,
    drawnInLastFrame: 0,
    deathCount: 0,
  };
};

const buildGrid = (state: AppState) => {
  const grid: GridSpot[] = [];
  let spotIndex = 0;

  for (let xx = -GRID_EXTENT; xx < GRID_EXTENT; xx += state.gridSize) {
    for (let yy = -GRID_EXTENT; yy < GRID_EXTENT; yy += state.gridSize) {
      const r = Math.sqrt(xx * xx + yy * yy);
      const r0 = 100;
      let field = 0;

      if (r < r0) {
        field = (255 / r0) * r;
      } else if (r > r0) {
        field = 255 - Math.min(255, (r - r0) / 2);
      } else {
        field = 255;
      }

      const isEdge =
        xx === -GRID_EXTENT
          ? 'left'
          : xx === -GRID_EXTENT + state.gridSize * (state.gridSteps - 1)
          ? 'right'
          : yy === -GRID_EXTENT
          ? 'top'
          : yy === -GRID_EXTENT + state.gridSize * (state.gridSteps - 1)
          ? 'bottom'
          : false;

      grid.push({
        x: xx,
        y: yy,
        busyAge: 0,
        spotIndex,
        isEdge,
        field,
      });

      spotIndex += 1;
    }
  }

  state.grid = grid;
  state.gridMaxIndex = spotIndex;
};

const dataXYtoCanvasXY = (state: AppState, x: number, y: number) => {
  const zoom = 1.6;
  return {
    x: state.xC + x * zoom * state.dataToImageRatio,
    y: state.yC + y * zoom * state.dataToImageRatio,
  };
};

const killParticle = (state: AppState, particleName: string) => {
  state.particles = state.particles.filter((seed) => seed.name !== particleName);
};

const CodePenBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return () => {
        container.removeChild(canvas);
      };
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      return () => {
        container.removeChild(canvas);
      };
    }

    const state = createState(canvas, ctx);
    buildGrid(state);

    const initDraw = () => {
      state.ctx.beginPath();
      state.ctx.rect(0, 0, state.width, state.height);
      state.ctx.fillStyle = 'black';
      state.ctx.fill();
      state.ctx.closePath();
    };

    const birth = () => {
      const gridSpotIndex = Math.floor(Math.random() * state.gridMaxIndex);
      const gridSpot = state.grid[gridSpotIndex];

      const particle: Particle = {
        hue: 200,
        sat: 95,
        lum: 20 + Math.floor(40 * Math.random()),
        x: gridSpot.x,
        y: gridSpot.y,
        xLast: gridSpot.x,
        yLast: gridSpot.y,
        xSpeed: 0,
        ySpeed: 0,
        age: 0,
        ageSinceStuck: 0,
        attractor: {
          oldIndex: gridSpotIndex,
          gridSpotIndex,
        },
        name: `seed-${Math.ceil(10000000 * Math.random())}`,
        speed: 0,
        dist: 0,
      };

      state.particles.push(particle);
    };

    const move = () => {
      const chaos = 30;

      for (let i = 0; i < state.particles.length; i += 1) {
        const p = state.particles[i];

        p.xLast = p.x;
        p.yLast = p.y;

  const index = p.attractor.gridSpotIndex;
  let gridSpot = state.grid[index];

        if (Math.random() < 0.5) {
          if (!gridSpot.isEdge) {
            const topIndex = index - 1;
            const bottomIndex = index + 1;
            const leftIndex = index - state.gridSteps;
            const rightIndex = index + state.gridSteps;

            const neighbours = [
              state.grid[topIndex],
              state.grid[bottomIndex],
              state.grid[leftIndex],
              state.grid[rightIndex],
            ].filter(Boolean) as GridSpot[];

            let maxSpot = neighbours[0];
            let maxValue = -Infinity;

            neighbours.forEach((spot) => {
              const val = spot.field + chaos * Math.random();
              if (val > maxValue) {
                maxValue = val;
                maxSpot = spot;
              }
            });

            const potentialNewGridSpot = maxSpot;
            if (potentialNewGridSpot.busyAge === 0 || potentialNewGridSpot.busyAge > 15) {
              p.ageSinceStuck = 0;
              p.attractor.oldIndex = index;
              p.attractor.gridSpotIndex = potentialNewGridSpot.spotIndex;
              gridSpot = potentialNewGridSpot;
              gridSpot.busyAge = 1;
            } else {
              p.ageSinceStuck += 1;
            }
          } else {
            p.ageSinceStuck += 1;
          }

          if (p.ageSinceStuck === 10) {
            killParticle(state, p.name);
            i -= 1;
            continue;
          }
        }

        const k = 8;
        const visc = 0.4;
        const dx = p.x - gridSpot.x;
        const dy = p.y - gridSpot.y;

        const xAcc = -k * dx;
        const yAcc = -k * dy;

        p.xSpeed += xAcc;
        p.ySpeed += yAcc;

        p.xSpeed *= visc;
        p.ySpeed *= visc;

        p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed);
        p.dist = Math.sqrt(dx * dx + dy * dy);

        p.x += 0.1 * p.xSpeed;
        p.y += 0.1 * p.ySpeed;

        p.age += 1;

        if (p.age > state.lifespan) {
          killParticle(state, p.name);
          state.deathCount += 1;
        }
      }
    };

    const draw = () => {
      state.drawnInLastFrame = 0;
      if (!state.particles.length) {
        return;
      }

      state.ctx.beginPath();
      state.ctx.rect(0, 0, state.width, state.height);
      state.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      state.ctx.fill();
      state.ctx.closePath();

      for (let i = 0; i < state.particles.length; i += 1) {
        const p = state.particles[i];

        const h = p.hue + state.stepCount / 30;
        const s = p.sat;
        const l = p.lum;
        const a = 1;

        const last = dataXYtoCanvasXY(state, p.xLast, p.yLast);
        const now = dataXYtoCanvasXY(state, p.x, p.y);
        const attracSpot = state.grid[p.attractor.gridSpotIndex];
        const attracXY = dataXYtoCanvasXY(state, attracSpot.x, attracSpot.y);
        const oldAttracSpot = state.grid[p.attractor.oldIndex];
        const oldAttracXY = dataXYtoCanvasXY(state, oldAttracSpot.x, oldAttracSpot.y);

        state.ctx.beginPath();
        state.ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
        state.ctx.moveTo(last.x, last.y);
        state.ctx.lineTo(now.x, now.y);
        state.ctx.lineWidth = 1.5 * state.dataToImageRatio;
        state.ctx.stroke();
        state.ctx.closePath();

        state.ctx.beginPath();
        state.ctx.lineWidth = 1.5 * state.dataToImageRatio;
        state.ctx.moveTo(oldAttracXY.x, oldAttracXY.y);
        state.ctx.lineTo(attracXY.x, attracXY.y);
        state.ctx.arc(attracXY.x, attracXY.y, 1.5 * state.dataToImageRatio, 0, Math.PI * 2, false);
        state.ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
        state.ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
        state.ctx.stroke();
        state.ctx.fill();
        state.ctx.closePath();

        state.drawnInLastFrame += 1;
      }
    };

    const evolve = () => {
      state.stepCount += 1;

      state.grid.forEach((spot) => {
        if (spot.busyAge > 0) {
          spot.busyAge += 1;
        }
      });

      if (
        state.stepCount % state.birthFreq === 0 &&
        state.particles.length + state.popPerBirth < state.maxPop
      ) {
        birth();
      }

      move();
      draw();
    };

    const handleResize = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.canvas.width = state.width;
      state.canvas.height = state.height;
      state.xC = state.width / 2;
      state.yC = state.height / 2;
      state.particles = [];
      state.grid = [];
      buildGrid(state);
      initDraw();
    };

    initDraw();

    const frame = () => {
      evolve();
      animationRef.current = requestAnimationFrame(frame);
    };

    animationRef.current = requestAnimationFrame(frame);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-transparent dark:from-slate-900/70 dark:via-slate-800/40 dark:to-transparent" />
    </div>
  );
};

export default CodePenBackground;
