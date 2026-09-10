'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface TraccePageItem {
  id: string;
  src: string;
  alt: string;
}

const pages: TraccePageItem[] = [
  {
    id: 'copertina',
    src: '/art/tracce/Copertina Front-clean.jpg',
    alt: 'Tracce Magazine - Cover',
  },
  {
    id: 'pag-1',
    src: '/art/tracce/Pag.1-clean.jpg',
    alt: 'Tracce Magazine - Page 1',
  },
  {
    id: 'pag-2',
    src: '/art/tracce/Pag 2-clean.jpg',
    alt: 'Tracce Magazine - Page 2',
  },
  {
    id: 'pag-3',
    src: '/art/tracce/Pag.3-clean.jpg',
    alt: 'Tracce Magazine - Page 3',
  },
];

const magazineDescription =
  'Tracce is a magazine written for Triciclo, a small Turin-based company committed to reuse and recycling. Our task was to integrate these topics into a project specifically designed for design lovers. Tracce talks about healthy values in the coolest way possible.';

function playPaperSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const bufferSize = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * 0.28));
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1050, ctx.currentTime);
    filter.Q.setValueAtTime(1.4, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.onended = () => {
      ctx.close().catch(() => {});
    };
  } catch {}
}

export default function TracceMagazinePage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  const maxIndex = pages.length - 2;

  const move = (step: 1 | -1) => {
    if (!muted) playPaperSound();
    setDirection(step === 1 ? 'next' : 'previous');
    setPageIndex((v) => Math.max(0, Math.min(maxIndex, v + step)));
  };

  const openMagazine = () => {
    if (!muted) playPaperSound();
    setDirection('next');
    setPageIndex(0);
    setOpen(true);
  };

  const toggleSound = () => {
    setMuted((prev) => {
      const next = !prev;
      if (!next) {
        setTimeout(playPaperSound, 40);
      }
      return next;
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, pageIndex, maxIndex, muted]);

  const leftPage = pages[pageIndex];
  const rightPage = pages[pageIndex + 1];

  return (
    <main className="portfolio-stage magazine-page-stage">
      <section className="vinyl-table magazine-table" aria-label="Tracce Magazine">
        <img className="desk-background" src="/art/desk-photo.png" alt="" />
        <div className="stage-split-layout">
          <div className="stage-media-area">
            <HomeBackdropSheet />
            {!open ? (
              <button
                className="magazine-cover-card"
                onClick={openMagazine}
                aria-label="Open Tracce Magazine"
              >
                <img src={pages[0].src} alt="Tracce Magazine Cover" />
              </button>
            ) : (
              <div className={`magazine-reader magazine-reader-${direction}`}>
                <Button
                  className="vinyl-back-button"
                  variant="outline"
                  size="icon-lg"
                  onClick={() => setOpen(false)}
                  aria-label="Close magazine"
                >
                  <X />
                </Button>
                <Button
                  className="magazine-sound"
                  variant="outline"
                  size="icon-lg"
                  onClick={toggleSound}
                  aria-label="Toggle audio"
                >
                  {muted ? <VolumeX /> : <Volume2 />}
                </Button>

                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-prev"
                  onClick={() => move(-1)}
                  disabled={pageIndex === 0}
                  aria-label="Previous spread"
                >
                  <ArrowLeft size={22} />
                </button>

                <div className="magazine-spread" key={pageIndex}>
                  <div
                    className={`magazine-page magazine-page-left ${pageIndex > 0 ? 'magazine-page-clickable' : ''}`}
                    onClick={() => pageIndex > 0 && move(-1)}
                    title={pageIndex > 0 ? 'Click to return to previous page' : undefined}
                  >
                    <img src={leftPage.src} alt={leftPage.alt} />
                  </div>
                  <div
                    className={`magazine-page magazine-page-right ${pageIndex < maxIndex ? 'magazine-page-clickable' : ''}`}
                    onClick={() => pageIndex < maxIndex && move(1)}
                    title={pageIndex < maxIndex ? 'Click to turn to next page' : undefined}
                  >
                    <img src={rightPage.src} alt={rightPage.alt} />
                  </div>
                </div>

                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-next"
                  onClick={() => move(1)}
                  disabled={pageIndex === maxIndex}
                  aria-label="Next spread"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>

          <aside className="stage-info-sidebar" aria-label="Magazine details and overview">
            {open ? (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">2024</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">University Exam</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Tracce Magazine</h1>
                    <p className="sidebar-subtitle">Typography &amp; Communication Design • Triciclo</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Project Overview</span>
                    <p className="sidebar-description-text">{magazineDescription}</p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <button type="button" className="sidebar-return-btn" onClick={() => setOpen(false)}>
                    Back to selection
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">2024</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">University Exam</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Tracce Magazine</h1>
                    <p className="sidebar-subtitle">Typography &amp; Communication Design • Triciclo</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Project Overview</span>
                    <p className="sidebar-description-text">{magazineDescription}</p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <p className="sidebar-hint">Click the cover on the desk to start reading</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

