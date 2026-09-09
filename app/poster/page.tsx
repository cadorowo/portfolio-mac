'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

const posters = [
  { id: 'cruciverba', title: 'Cruciverba', src: '/art/poster/cruciverba.png' },
  { id: 'nurse', title: 'Nurse', src: '/art/poster/nurse.png' },
  { id: 'devil', title: 'Devil', src: '/art/poster/devil.png' },
  { id: 'stankovic', title: 'Stankovic', src: '/art/poster/stankovic.jpg' },
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
      <section className="vinyl-table" aria-label="Selezione poster">
        <HomeBackdropSheet />
        <img className="desk-background" src="/art/desk-photo.jpg" alt="" />
        <div className="vinyl-deck">
          {selectedIndex === null || selectedPoster === null ? (
            <div className="poster-gallery" aria-label="Quattro poster">
              {posters.map((poster, index) => (
                <button className="poster-card" type="button" key={poster.id} onClick={() => { setDirection('next'); setSelectedIndex(index); }} aria-label={`Apri ${poster.title}`}>
                  <img src={poster.src} alt={poster.title} />
                </button>
              ))}
            </div>
          ) : (
            <div className="poster-detail" aria-label={`Dettaglio: ${selectedPoster.title}`}>
              <Button className="vinyl-back-button poster-back-button" variant="outline" size="icon-lg" onClick={closePoster} aria-label="Torna ai quattro poster">
                <X aria-hidden="true" />
              </Button>
              <Button className="poster-nav poster-nav-previous" variant="outline" size="icon-lg" onClick={() => movePoster(-1)} aria-label="Poster precedente">
                <ArrowLeft aria-hidden="true" />
              </Button>
              <img key={`${selectedPoster.id}-${direction}`} className={`poster-detail-image poster-detail-${direction}`} src={selectedPoster.src} alt={selectedPoster.title} />
              <Button className="poster-nav poster-nav-next" variant="outline" size="icon-lg" onClick={() => movePoster(1)} aria-label="Poster successivo">
                <ArrowRight aria-hidden="true" />
              </Button>
              <div className="poster-detail-meta">
                <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(posters.length).padStart(2, '0')}</span>
                <h1>{selectedPoster.title}</h1>
                <button type="button" className="vinyl-return-link" onClick={closePoster}>Torna alla selezione</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
