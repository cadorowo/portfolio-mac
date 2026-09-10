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
    id: 'nurse-issues',
    title: 'Nurse Issues',
    year: '2023',
    context: 'Gift',
    src: '/art/poster/nurse.png',
    aspectRatio: '3 / 4',
    description:
      'This project was born as a Christmas gift for my girlfriend, who, since she started studying pediatric nursing, she has self-diagnosed herself with a hundred different rare diseases. This was my way of reassuring her.',
  },
  {
    id: 'crosswords',
    title: 'Crosswords',
    year: '2024',
    context: 'Personal project',
    src: '/art/poster/cruciverba.png',
    aspectRatio: '3 / 4',
    description:
      'I originally thought at this poster as a gift for my father, who really loves doing crosswords, but when I finished it I simply liked it so much that I had to keep it for myself. My father didn’t even had the much free space anyway…',
  },
  {
    id: 'chats-with-the-devil',
    title: 'Chats with the Devil',
    year: '2025',
    context: 'Personal project',
    src: '/art/poster/devil.png',
    aspectRatio: '4 / 5',
    description:
      'I came up with this idea by discovering a really cool website, plenty of old illustrations taken from books, magazines and newspapers from all over the world. In that period I was really trying to learn how to use blending modes in photoshop so I took the best Image I found and made a poster out of it.',
  },
  {
    id: 'dejan-stankovic',
    title: 'Dejan Stankovic',
    year: '2026',
    context: 'Personal project',
    src: '/art/poster/stankovic.jpg',
    aspectRatio: '4 / 5',
    description:
      'Not much to say here, just my favorite Inter’s player. He deserved a poster, I made it.',
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
                    <span className="sidebar-kicker">2023 / Today</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">Graphic Design</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Posters</h1>
                    <p className="sidebar-subtitle">Graphic design &amp; personal works</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Overview</span>
                    <p className="sidebar-description-text">
                      Posters are elements that are highly underestimated, especially considering their constant presence and influence. A single piece of paper that always stands in front of our sight can have a deep impact on our mood and could lead us to build a strong relation with it. These projects in particular are personal works, which allowed me to improve my skills and to learn something new every time.
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
