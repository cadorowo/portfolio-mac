# 🎨 Marco Ballista — Graphic Design Portfolio

An interactive, tactile web portfolio crafted with Next.js, React, and Tailwind CSS. Built around an analog cardboard desk aesthetic, it showcases editorial, print, poster, and vinyl design works with custom interactive sheets, sound effects, and stage navigation.

---

## ✨ Features

- **Tactile Cardboard Desk Aesthetic**: Warm paper texture, analog layout styling, and tactile micro-interactions mimicking physical paperboards and stationery.
- **Project Collections**:
  - **Posters**: High-resolution print works (*Nurse Issues*, *Crosswords*, *Chats with the Devil*, *Dejan Stankovic*) with custom aspect ratios, directional navigation, and project context.
  - **Vinyl Records**: Album packaging, spine typography, and sleeve artwork (*State of Insanity*, *Stampede*).
  - **Tracce Magazine**: Editorial layout spreads, magazine cover designs, and typographic grids.
  - **About Me / Visual Resume**: Detailed background, creative manifesto, tool proficiencies, education history, and direct studio contacts.
- **Stage & Sheet Navigation**: Interactive keyboard navigation (`Left`, `Right`, `Escape`), touch-friendly sheet sliders, and smooth transitions.
- **Responsive Design**: Fluidly adapts between widescreen desktop desk view and mobile companion layout.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS, PostCSS, Custom CSS Keyframe Animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/cadorowo/portfolio-mac.git
cd portfolio-mac
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
├── app/
│   ├── about-me/          # Visual resume, bio, skills, and studio contacts
│   ├── poster/            # Poster collection gallery and detail view
│   ├── tracce/            # Editorial magazine layout presentation
│   ├── vinili/            # Vinyl album covers and packaging showcase
│   ├── layout.tsx         # Root layout with tactile textures
│   └── page.tsx           # Home interactive workspace desk
├── components/            # Shared UI components and tactile controls
├── public/
│   ├── art/               # Web-optimized assets (posters, vinyls, editorial)
│   └── patterns/          # Seamless generative background patterns
└── scripts/               # Optional pattern variation generation utilities
```

---

## 📄 License

MIT © [Marco Ballista](https://github.com/cadorowo)
