'use client';

export function HomeBackdropSheet() {
  return (
    <a
      href="/"
      className="home-backdrop-sheet"
      aria-label="Torna alla Home illustrata"
      title="Torna alla Home"
    >
      <div className="home-sheet-frame">
        <img
          src="/art/fondale.png"
          alt="Anteprima del fondale illustrato della Home"
          className="home-sheet-image"
        />
        <div className="home-sheet-overlay" aria-hidden="true" />
      </div>
      <span className="home-sheet-tab" aria-hidden="true">
        <span className="home-sheet-tab-arrow">↑</span> Home
      </span>
    </a>
  );
}
