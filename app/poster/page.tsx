'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface PosterItem {
  id: string;
  title: string;
  year: string;
  context: string;
  src: string;
  aspectRatio: string;
  description: string;
}

const posters: PosterItem[] = [
  {
    id: 'cruciverba',
    title: 'Cruciverba',
    year: '2024',
    context: 'Personal Project',
    src: '/art/poster/cruciverba.png',
    aspectRatio: '3 / 4',
    description:
      'Experimental typographic poster exploring the visual rhythm between crosswords and music. A composition blending a rigid modular grid, high-contrast photography, and sharp chromatic hits of acid green, deep purple, and rich black.',
  },
  {
    id: 'nurse',
    title: 'Nurse',
    year: '2024',
    context: 'Academic Project',
    src: '/art/poster/nurse.png',
    aspectRatio: '3 / 4',
    description:
      'Graphic design project developed in an academic setting, centered on raw social and emotional narrative. The dialogue between magenta and dark purple tones reflects the demanding reality of nursing care through a direct gaze and bitter irony.',
  },
  {
    id: 'devil',
    title: 'Devil',
    year: '2023',
    context: 'Personal Project',
    src: '/art/poster/devil.png',
    aspectRatio: '4 / 5',
    description:
      'Typographic and illustrative artwork with an esoteric, printmaker spirit. Inspired by traditional woodcut engravings and the duality archetype, featuring mirrored golden typography, tactile noise, and inverted chimeric creatures.',
  },
  {
    id: 'stankovic',
    title: 'Stankovic',
    year: '2023',
    context: 'Personal Project',
    src: '/art/poster/stankovic.jpg',
    aspectRatio: '4 / 5',
    description:
      'Graphic homage to iconic Inter Milan midfielder Dejan Stanković (#5). A mixed-media visual piece combining torn paper textures, digital pixel patterns, and classic Nerazzurri tones to merge football fandom with a gritty grunge aesthetic.',
  },
];

export default function PosterPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');

  const closePoster = () => setSelectedIndex(null);
  const movePoster = (step: 1 | -1) => {
    if (selectedIndex === null) return;
    setDirection(step === 1 ? 'next' : 'previous');
    setSelectedIndex((selectedIndex + step + posters.length) % posters.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === 'Escape') closePoster();
      if (event.key === 'ArrowRight') movePoster(1);
      if (event.key === 'ArrowLeft') movePoster(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const selectedPoster = selectedIndex === null ? null : posters[selectedIndex];

  return (
    <main className="portfolio-stage vinyl-page-stage poster-page-stage">
      <section className="vinyl-table" aria-label="Poster selection">
        <img className="desk-background" src="/art/desk-photo.png" alt="" />
        <div className="stage-split-layout">
          <div className="stage-media-area">
            <HomeBackdropSheet />
            {selectedIndex === null || selectedPoster === null ? (
              <div className="poster-gallery" aria-label="Four posters">
                {posters.map((poster, index) => (
                  <button
                    className="poster-card"
                    type="button"
                    key={poster.id}
                    onClick={() => {
                      setDirection('next');
                      setSelectedIndex(index);
                    }}
                    aria-label={`Open ${poster.title}`}
                  >
                    <img src={poster.src} alt={poster.title} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="poster-detail" aria-label={`Detail: ${selectedPoster.title}`}>
                <Button
                  className="vinyl-back-button poster-back-button"
                  variant="outline"
                  size="icon-lg"
                  onClick={closePoster}
                  aria-label="Back to poster selection"
                >
                  <X aria-hidden="true" />
                </Button>
                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-prev"
                  onClick={() => movePoster(-1)}
                  aria-label="Previous poster"
                >
                  <ArrowLeft size={22} />
                </button>
                <img
                  key={`${selectedPoster.id}-${direction}`}
                  className={`poster-detail-image poster-detail-${direction}`}
                  src={selectedPoster.src}
                  alt={selectedPoster.title}
                />
                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-next"
                  onClick={() => movePoster(1)}
                  aria-label="Next poster"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>

          <aside className="stage-info-sidebar" aria-label="Poster details and overview">
            {selectedPoster && selectedIndex !== null ? (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">{selectedPoster.year}</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">{selectedPoster.context}</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">{selectedPoster.title}</h1>
                    <p className="sidebar-subtitle">Aspect Ratio {selectedPoster.aspectRatio} • {selectedPoster.context}</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Concept &amp; Research</span>
                    <p className="sidebar-description-text">{selectedPoster.description}</p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <button type="button" className="sidebar-return-btn" onClick={closePoster}>
                    Back to selection
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">Poster Archive</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">Graphic Design</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Posters &amp; Graphics</h1>
                    <p className="sidebar-subtitle">Typographic and visual experimentation</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Overview</span>
                    <p className="sidebar-description-text">
                      A series of experimental typographic and graphic posters created between 2023 and 2024.
                      Explorations across modular grids, printmaker aesthetics, bold chromatic contrast,
                      and unconventional editorial layouts.
                    </p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <p className="sidebar-hint">Click any poster on the desk to inspect</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
