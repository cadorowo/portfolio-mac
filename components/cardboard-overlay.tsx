'use client';

export interface CardboardOverlayProps {
  title: string;
  year: string;
  context: string;
}

export function CardboardOverlay({ title, year, context }: CardboardOverlayProps) {
  return (
    <div className="cardboard-overlay" aria-hidden="true">
      <div className="cardboard-sheet">
        <div className="cardboard-tape" />
        <div className="cardboard-inner-frame">
          <div className="cardboard-header">
            <h3 className="cardboard-title">{title}</h3>
          </div>

          <div className="cardboard-divider" aria-hidden="true">
            <svg viewBox="0 0 100 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 3 Q 25 1, 50 3 T 98 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="cardboard-footer">
            <span className="cardboard-year">{year}</span>
            <span className="cardboard-context">{context}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
