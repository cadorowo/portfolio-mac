'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_has_visited';

export function SiteLoader() {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Show animation only on first visit (sessionStorage)
    const hasVisited = sessionStorage.getItem(STORAGE_KEY);
    const forcePreview = new URLSearchParams(window.location.search).has('intro');

    if (hasVisited && !forcePreview) {
      document.documentElement.classList.add('loader-seen');
      setIsMounted(false);
      return;
    }

    // First visit: mark session as visited and start 5-second timer
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsFading(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFading) {
      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
        document.documentElement.classList.add('loader-seen');
      }, 700);
      return () => clearTimeout(unmountTimer);
    }
  }, [isFading]);

  // Click to dismiss early
  const handleDismiss = () => {
    if (!isFading) {
      setIsFading(true);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-label="Site loading"
      onClick={handleDismiss}
      className={`site-loader ${isFading ? 'site-loader-fading' : ''}`}
    >
      <div className="site-loader-content">
        <span className="site-loader-author">MARCO BALLISTA</span>
        <img
          src="/art/loader/mushroom-loading.gif"
          alt="Loading..."
          className="site-loader-img"
        />
        <span className="site-loader-title">PORTFOLIO</span>
      </div>
    </div>
  );
}
