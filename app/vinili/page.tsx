'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

const vinyls = [
  { id: 'casbah', title: 'Casbah', src: '/art/vinili/casbah.png' },
  { id: 'soi', title: 'Situazioni Organiche Indipendenti', src: '/art/vinili/soi.png' },
  { id: 'stampede', title: 'Stampede', src: '/art/vinili/stampede-grey.png' },
  { id: 'upu-back', title: 'UPU back', src: '/art/vinili/vinyl-back.png' },
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
      <section className="vinyl-table" aria-label="Selezione vinili">
        <HomeBackdropSheet />
        <img className="desk-background" src="/art/desk-photo.jpg" alt="" />
        <div className="vinyl-deck">
          {selectedIndex === null || selectedVinyl === null ? (
            <div className="vinyl-gallery" aria-label="Quattro vinili">
              {vinyls.map((vinyl, index) => (
                <button className="vinyl-card" type="button" key={vinyl.id} onClick={() => openVinyl(index)} aria-label={`Apri ${vinyl.title}`}>
                  <img src={vinyl.src} alt={vinyl.title} />
                </button>
              ))}
            </div>
          ) : (
            <div className="vinyl-detail" aria-label={`Dettaglio: ${selectedVinyl.title}`}>
              <Button className="vinyl-back-button" variant="outline" size="icon-lg" onClick={closeVinyl} aria-label="Torna ai quattro vinili">
                <X aria-hidden="true" />
              </Button>
              <Button className="vinyl-nav vinyl-nav-previous" variant="outline" size="icon-lg" onClick={() => moveVinyl(-1)} aria-label="Vinile precedente">
                <ArrowLeft aria-hidden="true" />
              </Button>
              <img key={`${selectedVinyl.id}-${direction}`} className={`vinyl-detail-cover vinyl-detail-${direction}`} src={selectedVinyl.src} alt={selectedVinyl.title} />
              <Button className="vinyl-nav vinyl-nav-next" variant="outline" size="icon-lg" onClick={() => moveVinyl(1)} aria-label="Vinile successivo">
                <ArrowRight aria-hidden="true" />
              </Button>
              <div className="vinyl-detail-meta">
                <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(vinyls.length).padStart(2, '0')}</span>
                <h1>{selectedVinyl.title}</h1>
                <button type="button" className="vinyl-return-link" onClick={closeVinyl}>Torna alla selezione</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
