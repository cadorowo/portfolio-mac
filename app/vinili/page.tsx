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
    id: 'casbah',
    title: 'Casbah',
    subtitle: 'Roberto Cassiani & Luigi Ballista',
    year: '2023',
    context: 'Personal Project',
    src: '/art/vinili/casbah.png',
    description:
      'Vinyl sleeve artwork designed for Roberto Cassiani and Luigi Ballista. A high-contrast visual design built upon an electric blue and pitch black duo-tone, pairing stylized silhouettes with heavily grained rural photography.',
  },
  {
    id: 'soi',
    title: 'Situazioni Organiche Indipendenti',
    subtitle: 'SOI',
    year: '2024',
    context: 'Academic Project',
    src: '/art/vinili/soi.png',
    description:
      'Album concept born from research into the tension between obsolete hardware and wild nature. A vintage CRT monitor immersed in a field of red poppies reflects digital memories settled within organic landscapes.',
  },
  {
    id: 'stampede',
    title: 'Stampede',
    subtitle: 'The Doobie Brothers',
    year: '1975',
    context: 'Academic Project',
    src: '/art/vinili/stampede-grey.png',
    description:
      'Visual redesign for The Doobie Brothers\' classic record. The style pairs high-contrast Western aesthetics with monolithic typography and analogue film grain to elevate tracklisting and visual narrative.',
  },
  {
    id: 'upu-back',
    title: 'UPU back',
    subtitle: 'Ballista\'s Records',
    year: '2025',
    context: 'Personal Project',
    src: '/art/vinili/vinyl-back.png',
    description:
      'Back cover design for Ballista\'s Records. Featuring neon-pink paper textures, restrained typography, and a central distorted image that highlights the tactile craft of musical production.',
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
                    <span className="sidebar-kicker">Vinyl Collection</span>
                    <span className="sidebar-kicker-sep">•</span>
                    <span className="sidebar-kicker">Sleeve Archive</span>
                  </div>
                  <div>
                    <h1 className="sidebar-title">Vinyls &amp; Sleeves</h1>
                    <p className="sidebar-subtitle">Sleeve design &amp; visual direction</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Overview</span>
                    <p className="sidebar-description-text">
                      Editorial and graphic designs for vinyl records produced between 2023 and 2025.
                      A visual investigation balancing sharp duotones, analog print grain, tactile typography,
                      and organic-digital contrasts.
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
