'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Briefcase,
  Sparkles,
  Palette,
  Layers,
  Heart,
  Music,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HomeBackdropSheet } from '@/components/home-backdrop-sheet';

export interface PaperSheet {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  src?: string;
  alt: string;
  note?: string;
}

export const paperSheets: PaperSheet[] = [
  {
    id: 'bio',
    title: 'About Me & Manifesto',
    category: 'Bio',
    subtitle: 'Marco Ballista · Graphic Designer',
    src: '/art/about/marco-portrait.png',
    alt: 'Portrait of Marco Ballista and personal bio',
    note: 'Creative vision, background, and personal passions',
  },
  {
    id: 'percorso',
    title: 'Journey & Experience',
    category: 'Timeline',
    subtitle: 'SCG Torino Calcio · Politecnico di Torino',
    alt: 'Career milestones, academic background, and languages',
    note: 'Field experience, design education, and languages',
  },
  {
    id: 'attrezzi',
    title: 'Tools & Skills',
    category: 'Toolbox',
    subtitle: 'Adobe Suite, Blender & Visual Skills',
    alt: 'Graphic design software and creative capabilities',
    note: 'Software tools, UX, and storytelling methodologies',
  },
  {
    id: 'contatti',
    title: 'Contact & Network',
    category: 'Contact',
    subtitle: 'Turin, Italy · Social, Email & CV PDF',
    alt: 'Direct contact info, social channels, and CV download',
    note: 'Get in touch, connect on social, or download CV',
  },
  {
    id: 'cv-grafico',
    title: 'Visual Resume 2026',
    category: 'CV 2026',
    subtitle: 'Official Visual Resume',
    src: '/art/about/cv-page-1.png',
    alt: 'Original 2026 Graphic Resume by Marco Ballista',
    note: 'Official visual resume board and downloadable PDF',
  },
];

const passions = [
  { name: 'Piano', note: 'Classical & contemporary piano studies', icon: '🎹' },
  { name: 'Wellness & Fitness', note: 'Physical wellness and endurance training', icon: '🏃' },
  { name: 'Reading', note: 'Graphic design monographs & fiction', icon: '📚' },
  { name: 'Movies & TV Series', note: 'Cinematography and visual storytelling', icon: '🎬' },
  { name: 'Travel', note: 'Architectural journeys and culture', icon: '✈️' },
  { name: 'Food Experiences', note: 'Artisanal culinary exploration', icon: '🍽️' },
];

const softwares = [
  {
    code: 'Ai',
    name: 'Adobe Illustrator',
    tag: 'Vector & Brand Identity',
    desc: 'Logotypes, iconography, design systems, and precision vector artwork.',
  },
  {
    code: 'Ps',
    name: 'Adobe Photoshop',
    tag: 'Photomontage & Retouching',
    desc: 'Advanced raster processing, composite imagery, texturing, and tactile finishes.',
  },
  {
    code: 'Id',
    name: 'Adobe InDesign',
    tag: 'Editorial Layout',
    desc: 'Catalogs, brochures, printed magazines (Tracce Magazine), books, and typographic systems.',
  },
  {
    code: 'Pr',
    name: 'Adobe Premiere Pro',
    tag: 'Video & Motion Design',
    desc: 'Video editing, audio synchronization, color grading, and social media formats.',
  },
  {
    code: '3D',
    name: 'Blender',
    tag: '3D Modeling',
    desc: 'Three-dimensional visualizations, product renderings, and immersive scene concepts.',
  },
  {
    code: 'Ui',
    name: 'Procreate & Figma',
    tag: 'Drawing & Interfaces',
    desc: 'Freehand digital illustration, wireframing, prototyping, and UI/UX design.',
  },
];

const skills = [
  { name: 'Creative Thinking', en: 'Conceptual ideation & creative direction', icon: Sparkles },
  { name: 'Illustration', en: 'Freehand digital drawing & vector graphics', icon: Palette },
  { name: 'Analytical Design', en: 'Design problem solving & systematic thinking', icon: Layers },
  { name: 'Teamwork', en: 'Cross-functional creative collaboration', icon: Heart },
  { name: 'Art Direction', en: 'Brand cohesion & aesthetic supervision', icon: Briefcase },
  { name: 'Narrative Design', en: 'Editorial pacing & visual storytelling', icon: Music },
];

function CopyableContact({
  label,
  value,
  href,
  displayValue,
}: {
  label: string;
  value: string;
  href?: string;
  displayValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="about-contact-box">
      <div className="about-contact-info">
        <span className="about-contact-label">{label}</span>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="about-contact-link"
          >
            {displayValue || value}
          </a>
        ) : (
          <span className="about-contact-value">{displayValue || value}</span>
        )}
      </div>
      <button
        type="button"
        className={`about-copy-btn ${copied ? 'about-copy-btn-copied' : ''}`}
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        title={`Copy ${label}`}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

export default function AboutMePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');

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

  const selectedPaper = selectedIndex === null ? null : paperSheets[selectedIndex];

  return (
    <main className="portfolio-stage vinyl-page-stage about-page-stage">
      <section className="vinyl-table about-table" aria-label="About Me selection">
        <img className="desk-background" src="/art/desk-photo.png" alt="" />

        <div className="stage-split-layout">
          <div className="stage-media-area">
            <HomeBackdropSheet />

            {selectedIndex === null || selectedPaper === null ? (
              <div className="paper-gallery" aria-label="Sheets of paper on desk">
                {paperSheets.map((sheet, index) => (
                  <button
                    className={`paper-card paper-card-${index + 1}`}
                    type="button"
                    key={sheet.id}
                    onClick={() => openPaper(index)}
                    aria-label={`Open ${sheet.title}`}
                  >
                    {sheet.id === 'bio' && (
                      <div className="paper-sheet-inner paper-sheet-photo">
                        <div className="paper-photo-mount">
                          <img
                            src="/art/about/marco-portrait.png"
                            alt="Marco Ballista"
                            className="paper-photo-thumb"
                          />
                        </div>
                        <div className="paper-photo-legend">
                          <span className="paper-card-main-title">Marco Ballista</span>
                          <span className="paper-card-subline">Graphic Designer · Turin</span>
                        </div>
                      </div>
                    )}

                    {sheet.id === 'percorso' && (
                      <div className="paper-sheet-inner paper-sheet-text">
                        <div className="paper-sheet-top">
                          <span className="paper-sheet-tag">TIMELINE</span>
                        </div>
                        <div className="paper-sheet-content">
                          <h3 className="paper-card-main-title">Journey</h3>
                          <div className="paper-sheet-preview-lines">
                            <div className="paper-preview-line">
                              <strong>SCG Torino Calcio</strong>
                              <span>Visual Rebrand</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>Politecnico di Torino</strong>
                              <span>Communication Design</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>Liceo Cattaneo</strong>
                              <span>Scientific Diploma</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {sheet.id === 'attrezzi' && (
                      <div className="paper-sheet-inner paper-sheet-text">
                        <div className="paper-sheet-top">
                          <span className="paper-sheet-tag">TOOLBOX</span>
                        </div>
                        <div className="paper-sheet-content">
                          <h3 className="paper-card-main-title">Capabilities</h3>
                          <div className="paper-sheet-preview-lines">
                            <div className="paper-preview-line">
                              <strong>Adobe Suite</strong>
                              <span>Ai · Ps · Id · Pr</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>3D &amp; Prototyping</strong>
                              <span>Blender · Figma</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>Design Disciplines</strong>
                              <span>Branding · Editorial · UX</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {sheet.id === 'contatti' && (
                      <div className="paper-sheet-inner paper-sheet-text">
                        <div className="paper-sheet-top">
                          <span className="paper-sheet-tag">CONTACT</span>
                        </div>
                        <div className="paper-sheet-content">
                          <h3 className="paper-card-main-title">Let&apos;s Connect</h3>
                          <div className="paper-sheet-preview-lines">
                            <div className="paper-preview-line">
                              <strong>Turin, Italy</strong>
                              <span>Location</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>Studio Email</strong>
                              <span>odcstudioodc@gmail.com</span>
                            </div>
                            <div className="paper-preview-line">
                              <strong>Instagram</strong>
                              <span>@fungo_ballista</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {sheet.id === 'cv-grafico' && (
                      <div className="paper-sheet-inner paper-sheet-cv">
                        <div className="paper-cv-thumb-wrap">
                          <img
                            src="/art/about/cv-page-1.png"
                            alt="Visual Resume 2026"
                            className="paper-cv-thumb"
                          />
                        </div>
                        <div className="paper-cv-legend">
                          <span className="paper-card-main-title">Visual Resume</span>
                          <span className="paper-card-subline">Official Graphic Resume</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="about-stage-detail" aria-label={`Detail: ${selectedPaper.title}`}>
                <Button
                  className="vinyl-back-button"
                  variant="outline"
                  size="icon-lg"
                  onClick={closePaper}
                  aria-label="Back to selection"
                >
                  <X aria-hidden="true" />
                </Button>

                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-prev"
                  onClick={() => movePaper(-1)}
                  aria-label="Previous sheet"
                >
                  <ArrowLeft size={22} />
                </button>

                <div
                  key={`${selectedPaper.id}-${direction}`}
                  className={`about-stage-display about-stage-display-${direction}`}
                >
                  {selectedPaper.id === 'bio' && (
                    <div className="about-stage-photo-plate">
                      <div className="about-portrait-frame">
                        <img
                          src="/art/about/marco-portrait.png"
                          alt="Marco Ballista"
                          className="about-portrait-img"
                        />
                      </div>
                      <div className="about-photo-caption">
                        <h2 className="about-photo-name">Marco Ballista</h2>
                        <span className="about-photo-sub">Graphic Designer · Turin, Italy</span>
                      </div>
                    </div>
                  )}

                  {selectedPaper.id === 'percorso' && (
                    <div className="about-detail-sheet">
                      <div className="about-detail-sheet-header">
                        <span className="about-detail-sheet-tag">TIMELINE &amp; EXPERIENCE</span>
                        <h2 className="about-detail-sheet-title">Design Journey &amp; Milestones</h2>
                        <p className="about-detail-sheet-sub">Politecnico di Torino · SCG Torino Calcio</p>
                      </div>
                      <div className="about-detail-sheet-divider" />
                      <div className="about-detail-milestones">
                        <div className="about-detail-milestone">
                          <span className="about-milestone-year">2024 — Present</span>
                          <strong>Visual Identity &amp; Club Rebrand Lead</strong>
                          <span>SCG Torino Calcio · Turin</span>
                        </div>
                        <div className="about-detail-milestone">
                          <span className="about-milestone-year">2023 — Present</span>
                          <strong>B.Sc. in Communication Design</strong>
                          <span>Politecnico di Torino</span>
                        </div>
                        <div className="about-detail-milestone">
                          <span className="about-milestone-year">2018 — 2023</span>
                          <strong>Scientific High School Diploma</strong>
                          <span>Liceo Scientifico C. Cattaneo</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaper.id === 'attrezzi' && (
                    <div className="about-detail-sheet">
                      <div className="about-detail-sheet-header">
                        <span className="about-detail-sheet-tag">CREATIVE STACK</span>
                        <h2 className="about-detail-sheet-title">Tools &amp; Capabilities</h2>
                        <p className="about-detail-sheet-sub">Software Stack, Prototyping &amp; Art Direction</p>
                      </div>
                      <div className="about-detail-sheet-divider" />
                      <div className="about-detail-tools-grid">
                        {softwares.map((sw) => (
                          <div key={sw.code} className="about-detail-tool-item">
                            <span className="about-detail-tool-code">{sw.code}</span>
                            <div className="about-detail-tool-info">
                              <strong>{sw.name}</strong>
                              <span>{sw.tag}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPaper.id === 'contatti' && (
                    <div className="about-detail-sheet">
                      <div className="about-detail-sheet-header">
                        <span className="about-detail-sheet-tag">STUDIO DIRECTORY</span>
                        <h2 className="about-detail-sheet-title">Get in Touch</h2>
                        <p className="about-detail-sheet-sub">Turin, Italy · Open for Freelance &amp; Collaborations</p>
                      </div>
                      <div className="about-detail-sheet-divider" />
                      <div className="about-detail-contact-rows">
                        <div className="about-detail-contact-row">
                          <span className="about-contact-type">Studio Email</span>
                          <strong>odcstudioodc@gmail.com</strong>
                        </div>
                        <div className="about-detail-contact-row">
                          <span className="about-contact-type">Personal Email</span>
                          <strong>ballistamarco@gmail.com</strong>
                        </div>
                        <div className="about-detail-contact-row">
                          <span className="about-contact-type">Phone &amp; WhatsApp</span>
                          <strong>+39 327 225 4371</strong>
                        </div>
                        <div className="about-detail-contact-row">
                          <span className="about-contact-type">Instagram</span>
                          <strong>@fungo_ballista · @odc_studio_</strong>
                        </div>
                        <div className="about-detail-contact-row">
                          <span className="about-contact-type">LinkedIn</span>
                          <strong>linkedin.com/in/marco-ballista</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaper.id === 'cv-grafico' && (
                    <div className="about-stage-cv-plate">
                      <img
                        className="about-stage-cv-image"
                        src={selectedPaper.src}
                        alt={selectedPaper.alt}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="stage-nav-btn stage-nav-btn-next"
                  onClick={() => movePaper(1)}
                  aria-label="Next sheet"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>

          <aside className="stage-info-sidebar" aria-label="About Me details and overview">
            {selectedPaper && selectedIndex !== null ? (
              <>
                <div className="sidebar-content-top">
                  {selectedPaper.id === 'bio' && (
                    <>
                      <div>
                        <h1 className="sidebar-title">Marco Ballista</h1>
                        <p className="sidebar-subtitle">Graphic Designer • Born Nov 19, 2004</p>
                      </div>
                      <div className="sidebar-divider" />
                      <div className="sidebar-description-box">
                        <span className="sidebar-description-heading">Background &amp; Philosophy</span>
                        <p className="sidebar-description-text">
                          My design path began in 2023 with undergraduate studies in Communication Design at Politecnico di Torino.
                          I specialize in brand identity, typography, editorial systems, and creative visual communication.
                        </p>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">My Manifesto</span>
                        <blockquote className="sidebar-quote-box">
                          &ldquo;My goal is to create immersive realities that can accompany the client throughout his whole experience.&rdquo;
                        </blockquote>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Passions &amp; Interests</span>
                        <div className="sidebar-passions-list">
                          {passions.map((p) => (
                            <div key={p.name} className="sidebar-passion-item">
                              <span className="sidebar-passion-icon">{p.icon}</span>
                              <div className="sidebar-passion-texts">
                                <strong>{p.name}</strong>
                                <small>{p.note}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedPaper.id === 'percorso' && (
                    <>
                      <div>
                        <h1 className="sidebar-title">Journey &amp; Education</h1>
                        <p className="sidebar-subtitle">Professional experience &amp; academic background</p>
                      </div>
                      <div className="sidebar-divider" />
                      <div className="sidebar-description-box">
                        <span className="sidebar-description-heading">Work Experience</span>
                        <div className="sidebar-timeline-block">
                          <div className="sidebar-timeline-entry">
                            <div className="sidebar-entry-head">
                              <strong>SCG Torino Calcio</strong>
                              <span className="sidebar-entry-period">2024 — Present</span>
                            </div>
                            <span className="sidebar-entry-role">Graphic Designer &amp; Brand Lead</span>
                            <p className="sidebar-entry-desc">
                              Directing visual communication and social media strategy, culminating in a complete club brand identity redesign.
                            </p>
                          </div>
                          <div className="sidebar-timeline-entry">
                            <div className="sidebar-entry-head">
                              <strong>Community Youth Leadership</strong>
                              <span className="sidebar-entry-period">2020 — 2023</span>
                            </div>
                            <span className="sidebar-entry-role">Activity Coordinator &amp; Youth Leader</span>
                            <p className="sidebar-entry-desc">
                              Educational leadership, program coordination, and directing seasonal residential camps for children and teens.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Academic Path</span>
                        <div className="sidebar-timeline-block">
                          <div className="sidebar-timeline-entry">
                            <div className="sidebar-entry-head">
                              <strong>Politecnico di Torino</strong>
                              <span className="sidebar-entry-period">2023 — Present</span>
                            </div>
                            <span className="sidebar-entry-role">B.Sc. in Communication Design</span>
                            <p className="sidebar-entry-desc">
                              Focused on typography, visual identity systems, editorial design, UX/UI, and interactive narratives.
                            </p>
                          </div>
                          <div className="sidebar-timeline-entry">
                            <div className="sidebar-entry-head">
                              <strong>Liceo Scientifico C. Cattaneo</strong>
                              <span className="sidebar-entry-period">2018 — 2023</span>
                            </div>
                            <span className="sidebar-entry-role">Scientific High School Diploma</span>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Languages</span>
                        <div className="sidebar-languages-row">
                          <div className="sidebar-lang-pill">
                            <strong>Italian</strong>
                            <span>Native speaker</span>
                          </div>
                          <div className="sidebar-lang-pill">
                            <strong>English</strong>
                            <span>Professional working</span>
                          </div>
                          <div className="sidebar-lang-pill">
                            <strong>Spanish</strong>
                            <span>B2 Certified</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedPaper.id === 'attrezzi' && (
                    <>
                      <div>
                        <h1 className="sidebar-title">Tools &amp; Capabilities</h1>
                        <p className="sidebar-subtitle">Adobe Suite, Blender, Prototyping &amp; Art Direction</p>
                      </div>
                      <div className="sidebar-divider" />
                      <div className="sidebar-description-box">
                        <span className="sidebar-description-heading">Software Workflow</span>
                        <div className="sidebar-sw-list">
                          {softwares.map((sw) => (
                            <div key={sw.code} className="sidebar-sw-item">
                              <div className="sidebar-sw-head">
                                <span className="sidebar-sw-badge">{sw.code}</span>
                                <div>
                                  <strong>{sw.name}</strong>
                                  <small>{sw.tag}</small>
                                </div>
                              </div>
                              <p className="sidebar-sw-desc">{sw.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Core Competencies</span>
                        <div className="sidebar-skills-cloud">
                          {skills.map((sk) => (
                            <div key={sk.name} className="sidebar-skill-badge">
                              <strong>{sk.name}</strong>
                              <small>{sk.en}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedPaper.id === 'contatti' && (
                    <>
                      <div>
                        <h1 className="sidebar-title">Let&apos;s Connect</h1>
                        <p className="sidebar-subtitle">Open for freelance projects &amp; creative collaborations</p>
                      </div>
                      <div className="sidebar-divider" />
                      <div className="sidebar-description-box">
                        <span className="sidebar-description-heading">Direct Channels</span>
                        <div className="sidebar-contacts-list">
                          <CopyableContact
                            label="Studio Email"
                            value="odcstudioodc@gmail.com"
                            href="mailto:odcstudioodc@gmail.com"
                          />
                          <CopyableContact
                            label="Personal Email"
                            value="ballistamarco@gmail.com"
                            href="mailto:ballistamarco@gmail.com"
                          />
                          <CopyableContact
                            label="Phone & WhatsApp"
                            value="+39 3272254371"
                            displayValue="+39 327 225 4371"
                            href="tel:+393272254371"
                          />
                          <CopyableContact
                            label="LinkedIn"
                            value="https://www.linkedin.com/in/marco-ballista"
                            displayValue="linkedin.com/in/marco-ballista"
                            href="https://www.linkedin.com/in/marco-ballista"
                          />
                          <CopyableContact
                            label="Personal Instagram"
                            value="fungo_ballista"
                            displayValue="@fungo_ballista"
                            href="https://instagram.com/fungo_ballista"
                          />
                          <CopyableContact
                            label="Studio Instagram"
                            value="odc_studio_"
                            displayValue="@odc_studio_"
                            href="https://instagram.com/odc_studio_"
                          />
                        </div>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Curriculum Vitae</span>
                        <div className="sidebar-cv-actions">
                          <a
                            href="/art/about/cv-2026.pdf"
                            download="CV-Marco-Ballista-2026.pdf"
                            className="sidebar-action-btn"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Official CV (PDF)
                          </a>
                        </div>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Mobile Companion</span>
                        <div className="sidebar-qr-card">
                          <img
                            src="/art/about/qr-code.png"
                            alt="QR Code"
                            className="sidebar-qr-image"
                          />
                          <div className="sidebar-qr-text">
                            <strong>Scan with phone</strong>
                            <span>Instant access to works &amp; contacts</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedPaper.id === 'cv-grafico' && (
                    <>
                      <div>
                        <h1 className="sidebar-title">Visual Resume</h1>
                        <p className="sidebar-subtitle">Graphic board &amp; high-definition printable PDF</p>
                      </div>
                      <div className="sidebar-divider" />
                      <div className="sidebar-description-box">
                        <span className="sidebar-description-heading">Document Summary</span>
                        <p className="sidebar-description-text">
                          Official visual resume by Marco Ballista detailing educational background at Politecnico di Torino,
                          field design experience with SCG Torino Calcio, complete software stack, and verified language proficiencies.
                        </p>
                      </div>
                      <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                        <span className="sidebar-description-heading">Downloads &amp; Links</span>
                        <div className="sidebar-cv-actions">
                          <a
                            href="/art/about/cv-2026.pdf"
                            download="CV-Marco-Ballista-2026.pdf"
                            className="sidebar-action-btn"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF (1.3 MB)
                          </a>
                          <a
                            href="/art/about/cv-2026.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sidebar-action-btn sidebar-action-btn-secondary"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Fullscreen in Tab
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="sidebar-footer-controls">
                  <button type="button" className="sidebar-return-btn" onClick={closePaper}>
                    Back to selection
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-content-top">
                  <div>
                    <h1 className="sidebar-title">About Marco Ballista</h1>
                    <p className="sidebar-subtitle">Graphic Designer • Communication &amp; Visual Identity</p>
                  </div>
                  <div className="sidebar-divider" />
                  <div className="sidebar-description-box">
                    <span className="sidebar-description-heading">Vision &amp; Manifesto</span>
                    <p className="sidebar-description-text">
                      &ldquo;My goal is to create immersive realities that can accompany the client throughout his whole experience.&rdquo;
                    </p>
                  </div>
                  <div className="sidebar-description-box" style={{ marginTop: '0.4rem' }}>
                    <span className="sidebar-description-heading">Background</span>
                    <p className="sidebar-description-text">
                      Based in Turin, Italy. Studying Communication Design at Politecnico di Torino since 2023.
                      Focused on brand identity, typography, editorial systems, and creative visual storytelling.
                    </p>
                  </div>
                </div>

                <div className="sidebar-footer-controls">
                  <p className="sidebar-hint">Click any sheet on the desk to inspect</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
