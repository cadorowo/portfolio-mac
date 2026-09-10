'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface VinylItem {
  id: string;
  title: string;
  subtitle?: string;
  year: string;
  context: string;
  src: string;
  description: string;
}

const vinyls: VinylItem[] = [
  {
    id: 'stampede',
    title: 'Stampede',
    subtitle: 'The Doobie Brothers',
    year: '2024',
    context: 'Personal project',
    src: '/art/vinili/stampede-grey.png',
    description:
      'For a few years now, the Doobie Brothers have taken first place on my Spotify listening list, especially thanks to a masterpiece like Stampede. I still don\'t understand why there isn\'t a radio that plays "I cheat the hangman" all day.',
  },
  {
    id: 'casbah',
    title: 'Casbah',
    subtitle: 'Luigi Ballista & Roberto Cassiani',
    year: '2025',
    context: 'Commissioned by my father',
    src: '/art/vinili/casbah.png',
    description:
      'In his 60 years of life, my father wrote so many songs that a playlist containing them all would last at least until 2100. I have to say that they were less simple customers than I expected.',
  },
  {
    id: 'upu-vol-2',
    title: 'UPU Vol. 2',
    year: '2025',
    context: 'Gift',
    src: '/art/vinili/vinyl-back.png',
    description:
      'This was probably the gift I\'m most fond of, because it represents an extremely rare meeting point between my musical tastes and those of my girlfriend. Even though it arrived almost 2 months late, it was still really appreciated.',
  },
  {
    id: 'soi',
    title: 'S.O.I.',
    subtitle: 'Independent Organic Situations',
    year: '2026',
    context: 'Commissioned by my father',
    src: '/art/vinili/soi.png',
    description:
      'My father\'s passion for music took a second youth when he discovered that artificial intelligence would allow him to produce his songs without having too expensive recording equipment. Independent Organic Situations is the result of this machine-man collaboration, the symbol of a union that, if controlled, can create something beautiful.',
  },
];

export default function VinylPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');

  const openVinyl = (index: number) => {
    setDirection('next');
    setSelectedIndex(index);
  };

  const closeVinyl = () => setSelectedIndex(null);

  const moveVinyl = (step: 1 | -1) => {
    if (selectedIndex === null) return;
    setDirection(step === 1 ? 'next' : 'previous');
    setSelectedIndex((selectedIndex + step + vinyls.length) % vinyls.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === 'Escape') closeVinyl();
      if (event.key === 'ArrowRight') moveVinyl(1);
      if (event.key === 'ArrowLeft') moveVinyl(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const selectedVinyl = selectedIndex === null ? null : vinyls[selectedIndex];

  return (
    <main className="portfolio-stage vinyl-page-stage">
      <section className="vinyl-table" aria-label="Vinyl selection">
        <img className="desk-background" src="/art/desk-photo.png" alt="" />
        <div className="stage-split-layout">
          <div className="stage-media-area">
            <HomeBackdropSheet />
            {selectedIndex === null || selectedVinyl === null ? (
              <div className="vinyl-gallery" aria-label="Four vinyls">
                {vinyls.map((vinyl, index) => (
                  <button
                    className="vinyl-card"
                    type="button"
                    key={vinyl.id}
                    onClick={() => openVinyl(index)}
                    aria-label={`Open ${vinyl.title}`}
                  >
                    <img src={vinyl.src} alt={vinyl.title} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="vinyl-detail" aria-label={`Detail: ${selectedVinyl.title}`}>
                <Button
                  className="vinyl-back-button"
                  variant="outline"
                  size="icon-lg"
                  onClick={closeVinyl}
                  aria-label="Back to vinyl selection"
                >
                  <X aria-hidden="true" />
                </Button>
                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-prev"
                  onClick={() => moveVinyl(-1)}
                  aria-label="Previous vinyl"
                >
                  <ArrowLeft size={22} />
                </button>
                <img
                  key={`${selectedVinyl.id}-${direction}`}
                  className={`vinyl-detail-cover vinyl-detail-${direction}`}
                  src={selectedVinyl.src}
                  alt={selectedVinyl.title}
                />
                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-next"
                  onClick={() => moveVinyl(1)}
                  aria-label="Next vinyl"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>

          <aside className="stage-info-sidebar" aria-label="Vinyl details and overview">
            {selectedVinyl && selectedIndex !== null ? (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">{selectedVinyl.year}</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">{selectedVinyl.context}</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">{selectedVinyl.title}</h1>
                    {selectedVinyl.subtitle && (
                      <p className="sidebar-subtitle">{selectedVinyl.subtitle}</p>
                    )}
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Artwork &amp; Concept</span>
                    <p className="sidebar-description-text">{selectedVinyl.description}</p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <button type="button" className="sidebar-return-btn" onClick={closeVinyl}>
                    Back to selection
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-content-top">
                  <div className="sidebar-kicker-row">
                    <span className="sidebar-kicker">2024 / Today</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">Graphic Design &amp; Typography</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Vinyls</h1>
                    <p className="sidebar-subtitle">Album covers &amp; typography</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Overview</span>
                    <p className="sidebar-description-text">
                      Working on album covers is the apotheosis for a designer that loves and lives for music. In this field I’ve tried to revisit covers of albums that I loved and to create completely new ones for emerging albums.
                    </p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <p className="sidebar-hint">Click any vinyl on the desk to inspect artwork</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
