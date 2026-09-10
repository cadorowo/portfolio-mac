'use client';

import { useEffect, useState } from 'react';
import { SiteLoader } from '@/components/site-loader';

const projects = [
  { name: 'Tracce Magazine', slug: 'tracce-magazine', className: 'character-cat', normal: '/art/buttons/cat-normal.png', hover: '/art/buttons/cat-hover.png', speech: 'Tracce Magazine' },
  { name: 'About Me', slug: 'about-me', className: 'character-mushroom', normal: '/art/buttons/mushroom-normal.png', hover: '/art/buttons/mushroom-hover.png', speech: 'About Me' },
  { name: 'Vinyls', slug: 'vinili', className: 'character-toucan', normal: '/art/buttons/toucan-normal.png', hover: '/art/buttons/toucan-hover.png', speech: 'Vinyls' },
  { name: 'Posters', slug: 'poster', className: 'character-blue-man', normal: '/art/buttons/blue-man-normal.png', hover: '/art/buttons/blue-man-hover.png', speech: 'Posters' },
];

function HoverCursor() {
  const [cursor, setCursor] = useState<{ x: number; y: number; label: string } | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor-label]');
      setCursor(target ? { x: event.clientX, y: event.clientY, label: target.dataset.cursorLabel ?? '' } : null);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return cursor ? <span className="hover-cursor-label" style={{ left: cursor.x, top: cursor.y }}>{cursor.label}</span> : null;
}

export default function Home() {
  return (
    <main className="portfolio-stage">
      <SiteLoader />
      <HoverCursor />
      <section className="artboard" aria-label="Illustrated Portfolio">
        <img className="backdrop" src="/art/fondale.png" alt="Illustration of a cave opening onto an open valley" />
        {projects.map((project) => (
          <a className={`character ${project.className}`} href={`/${project.slug}`} key={project.slug} aria-label={`Open project: ${project.name}`} data-cursor-label={project.speech}>
            <img className="character-normal" src={project.normal} alt="" />
            <img className="character-hover" src={project.hover} alt="" />
            <span className="speech-bubble" aria-hidden="true">{project.speech}</span>
          </a>
        ))}
        <img className="stalactite" src="/art/buttons/stalattite.png" alt="" aria-hidden="true" />
        <img className="stalactite stalactite-two" src="/art/buttons/stalattite2.png" alt="" aria-hidden="true" />
      </section>
    </main>
  );
}
