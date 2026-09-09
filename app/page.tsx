'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const vinyls = [
  { id: 'casbah', title: 'Casbah', src: '/art/vinili/casbah.png' },
  { id: 'soi', title: 'Situazioni Organiche Indipendenti', src: '/art/vinili/soi.png' },
  { id: 'stampede', title: 'Stampede', src: '/art/vinili/stampede-grey.png' },
  { id: 'back', title: 'Vinyl back', src: '/art/vinili/vinyl-back.png' },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const showNextVinyl = () => {
    if (isAnimating) return;

    setLeavingIndex(activeIndex);
    setActiveIndex((index) => (index + 1) % vinyls.length);
    setIsAnimating(true);
    window.setTimeout(() => {
      setLeavingIndex(null);
      setIsAnimating(false);
    }, 520);
  };

  const activeVinyl = vinyls[activeIndex];

  return (
    <main className="portfolio-stage">
      <section className="vinyl-table" aria-label="Selezione vinili">
        <img className="desk-background" src="/art/desk-photo.jpg" alt="" />
        <div className="vinyl-deck">
          <p className="vinyl-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(vinyls.length).padStart(2, '0')}
          </p>
          <div className="cover-stack" aria-label={`Vinile: ${activeVinyl.title}`}>
            {leavingIndex !== null && (
              <img
                className="vinyl-cover vinyl-cover-leaving"
                src={vinyls[leavingIndex].src}
                alt=""
                aria-hidden="true"
              />
            )}
            <img key={activeVinyl.id} className="vinyl-cover vinyl-cover-entering" src={activeVinyl.src} alt={activeVinyl.title} />
          </div>
          <Button className="next-vinyl" variant="outline" size="icon-lg" onClick={showNextVinyl} disabled={isAnimating} aria-label="Mostra il vinile successivo">
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
