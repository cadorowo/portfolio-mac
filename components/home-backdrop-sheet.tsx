'use client';

export function HomeBackdropSheet() {
  return (
    <a
      href="/"
      className="home-backdrop-sheet"
      aria-label="Return to illustrated Home"
      title="Back to Home"
    >
      <div className="home-sheet-frame">
        <img
          src="/art/fondale.png"
          alt="Preview of the illustrated Home scenery"
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
