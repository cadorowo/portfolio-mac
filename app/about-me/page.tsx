'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface PaperSheet {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  note?: string;
}

export const paperSheets: PaperSheet[] = [
  {
    id: 'bio',
    title: 'Chi Sono & Manifesto',
    category: 'Bio',
    src: '/art/about/foglio-1.png',
    alt: 'Foglio di presentazione personale e bio',
    note: 'Presentazione e visione creativa',
  },
  {
    id: 'percorso',
    title: 'Percorso & Esperienze',
    category: 'Timeline',
    src: '/art/about/foglio-2.png',
    alt: 'Foglio con percorso ed esperienze formative e professionali',
    note: 'Tappe ed esperienze',
  },
  {
    id: 'attrezzi',
    title: 'Strumenti & Competenze',
    category: 'Toolbox',
    src: '/art/about/foglio-3.png',
    alt: 'Appunti con competenze tecniche, design e software',
    note: 'Software, design e codice',
  },
  {
    id: 'contatti',
    title: 'Contatti & Connessioni',
    category: 'Contatti',
    src: '/art/about/foglio-4.png',
    alt: 'Biglietto con riferimenti di contatto e social',
    note: 'Scrivimi o seguimi',
  },
];

export default function AboutMePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const openPaper = (index: number) => {
    setDirection('next');
    setSelectedIndex(index);
  };

  const closePaper = () => setSelectedIndex(null);

  const movePaper = (step: 1 | -1) => {
    if (selectedIndex === null) return;
    setDirection(step === 1 ? 'next' : 'previous');
    setSelectedIndex((selectedIndex + step + paperSheets.length) % paperSheets.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === 'Escape') closePaper();
      if (event.key === 'ArrowRight') movePaper(1);
      if (event.key === 'ArrowLeft') movePaper(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const selectedPaper = selectedIndex === null ? null : paperSheets[selectedIndex];

  return (
    <main className="portfolio-stage vinyl-page-stage about-page-stage">
      <section className="vinyl-table about-table" aria-label="Scrivania About Me">
        <HomeBackdropSheet />
        <img className="desk-background" src="/art/desk-photo.jpg" alt="" />

        <div className="vinyl-deck about-deck">
          {selectedIndex === null || selectedPaper === null ? (
            <div className="paper-gallery" aria-label="Fogli di carta sul tavolo">
              {paperSheets.map((sheet, index) => {
                const hasError = imageErrors[sheet.id];
                return (
                  <button
                    className={`paper-card paper-card-${index + 1}`}
                    type="button"
                    key={sheet.id}
                    onClick={() => openPaper(index)}
                    aria-label={`Apri ${sheet.title}`}
                  >
                    <div className="paper-tape" aria-hidden="true" />
                    {hasError ? (
                      <div className="paper-card-fallback">
                        <span className="paper-stamp">{sheet.category}</span>
                        <h3 className="paper-fallback-title">{sheet.title}</h3>
                        {sheet.note && <p className="paper-fallback-note">{sheet.note}</p>}
                        <span className="paper-cta">Clicca per leggere</span>
                      </div>
                    ) : (
                      <img
                        src={sheet.src}
                        alt={sheet.alt}
                        onError={() => handleImageError(sheet.id)}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="paper-detail" aria-label={`Dettaglio: ${selectedPaper.title}`}>
              <Button
                className="paper-back-button"
                variant="outline"
                size="icon-lg"
                onClick={closePaper}
                aria-label="Torna alla scrivania"
              >
                <X aria-hidden="true" />
              </Button>

              <Button
                className="paper-nav paper-nav-previous"
                variant="outline"
                size="icon-lg"
                onClick={() => movePaper(-1)}
                aria-label="Foglio precedente"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>

              <div
                key={`${selectedPaper.id}-${direction}`}
                className={`paper-detail-view paper-detail-${direction}`}
              >
                <div className="paper-tape paper-tape-detail" aria-hidden="true" />
                {imageErrors[selectedPaper.id] ? (
                  <div className="paper-detail-fallback">
                    <span className="paper-detail-stamp">{selectedPaper.category}</span>
                    <h2>{selectedPaper.title}</h2>
                    {selectedPaper.note && (
                      <p className="paper-detail-note">{selectedPaper.note}</p>
                    )}
                    <div className="paper-detail-placeholder-box">
                      <p>In attesa della foto / scansione del foglio.</p>
                      <code>{selectedPaper.src}</code>
                    </div>
                  </div>
                ) : (
                  <img
                    className="paper-detail-image"
                    src={selectedPaper.src}
                    alt={selectedPaper.alt}
                    onError={() => handleImageError(selectedPaper.id)}
                  />
                )}
              </div>

              <Button
                className="paper-nav paper-nav-next"
                variant="outline"
                size="icon-lg"
                onClick={() => movePaper(1)}
                aria-label="Foglio successivo"
              >
                <ArrowRight aria-hidden="true" />
              </Button>

              <div className="paper-detail-meta">
                <span>
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(paperSheets.length).padStart(2, '0')}
                </span>
                <h1>{selectedPaper.title}</h1>
                <button type="button" className="paper-return-link" onClick={closePaper}>
                  Torna alla scrivania
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
