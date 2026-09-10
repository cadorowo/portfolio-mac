'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface TraccePageItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  description: string;
}

const pages: TraccePageItem[] = [
  {
    id: 'copertina',
    title: 'Cover',
    subtitle: 'Issue Zero • January 2025',
    src: '/art/tracce/Copertina Front-clean.jpg',
    alt: 'Tracce Magazine Cover',
    description:
      'Official cover for Issue Zero of Tracce Magazine. An independent editorial project documenting visual culture, fashion, and subcultures through tactile analogue photography and experimental layouts.',
  },
  {
    id: 'editoriale',
    title: 'Editorial',
    subtitle: 'The Triciclo Vision',
    src: '/art/tracce/Pag.1-clean.jpg',
    alt: 'Editorial - Page 1',
    description:
      'Introductory manifesto of the magazine. Laying down the editorial vision, chronicling the collective\'s origins and the urge to spotlight tangible stories beyond the frenzy of digital algorithms.',
  },
  {
    id: 'denim',
    title: 'A Sea of Denim',
    subtitle: 'Elvis Presley',
    src: '/art/tracce/Pag 2-clean.jpg',
    alt: 'A Sea of Denim - Page 2',
    description:
      'An in-depth exploration of denim and its iconic 20th-century impact. From the youthful rebellion embodied by Elvis Presley to the evolution of jeans into a universal pop-culture staple.',
  },
  {
    id: 'strauss',
    title: 'Levi Strauss',
    subtitle: 'The Turning Point',
    src: '/art/tracce/Pag.3-clean.jpg',
    alt: 'Levi Strauss - Page 3',
    description:
      'The industrial and social genesis of the brand that redefined American workwear, turning copper rivets and heavy-duty canvas into a global cultural phenomenon.',
  },
];

const magazineDescription =
  'Tracce Magazine is an independent editorial project created to document visual culture, fashion, and subcultures through tactile analogue photography and experimental layouts. A tangible journey exploring visual stories and social customs, far from the frenzy of digital algorithms.';

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
                    <span className="sidebar-kicker">Fanzine</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">January 2025</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">{leftPage.title} &amp; {rightPage.title}</h1>
                    <p className="sidebar-subtitle">B5 Double-page spread • {leftPage.subtitle}</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">{leftPage.title}</span>
                    <p className="sidebar-description-text">{leftPage.description}</p>
                  </div>
                  <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                    <span className="sidebar-description-heading">{rightPage.title}</span>
                    <p className="sidebar-description-text">{rightPage.description}</p>
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
                    <span className="sidebar-kicker">Editorial Project</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">Issue Zero</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">2025</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Tracce Magazine</h1>
                    <p className="sidebar-subtitle">Independent printed fanzine • Triciclo</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Vision &amp; Manifesto</span>
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

