'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function setBarWidth(width: number, opacity: number) {
  const bar = document.getElementById('top-loading-bar');
  if (!bar) return;
  bar.style.opacity = String(opacity);
  bar.style.width = `${width}%`;
}

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rafRef = React.useRef<number | null>(null);
  const safetyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = React.useRef(0);
  const activeRef = React.useRef(false);

  const finish = React.useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    setBarWidth(100, 1);
    setTimeout(() => setBarWidth(100, 0), 200);
    setTimeout(() => setBarWidth(0, 0), 500);
  }, []);

  const start = React.useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    progressRef.current = 8;
    setBarWidth(progressRef.current, 1);

    const tick = () => {
      if (!activeRef.current) return;
      progressRef.current += (90 - progressRef.current) * 0.03 + 0.2;
      if (progressRef.current >= 90) progressRef.current = 90;
      setBarWidth(progressRef.current, 1);
      if (progressRef.current < 90) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(finish, 8000);
  }, [finish]);

  // Proactively start on any internal link click — the App Router intercepts
  // Link navigation before it ever reaches history.pushState, so patching
  // history directly never fires. Watching the click is the reliable signal.
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const isSameLocation =
        url.pathname === window.location.pathname && url.search === window.location.search;
      if (isSameLocation) return;

      start();
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', start);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', start);
    };
  }, [start]);

  // Completion: once the resolved route actually changes, the new segment rendered.
  const routeKey = `${pathname}?${searchParams?.toString() ?? ''}`;
  const prevKeyRef = React.useRef(routeKey);
  React.useEffect(() => {
    if (prevKeyRef.current !== routeKey) {
      prevKeyRef.current = routeKey;
      finish();
    }
  }, [routeKey, finish]);

  return null;
}
