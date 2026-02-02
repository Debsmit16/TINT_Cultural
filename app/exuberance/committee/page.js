import Link from 'next/link';
import styles from '../Exuberance.module.css';
import localStyles from './Committee.module.css';
import { CORE_COMMITTEE, FACULTY } from './committeeData.js';

export const metadata = {
  title: 'Exuberance Committee | TINTWeb',
  description: 'Committee — Exuberance.',
};

function imgSrcFromFile(fileName) {
  if (!fileName) return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80';
  return `/photos/photo_webp/Webp/${encodeURIComponent(fileName)}`;
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        fill="currentColor"
      />
      <path d="M6 10H2v12h4V10Z" fill="currentColor" />
      <path
        d="M22 22h-4v-6.2c0-1.7-.6-2.9-2.2-2.9-1.2 0-1.9.8-2.2 1.6-.1.3-.1.8-.1 1.2V22h-4s.1-10.6 0-12h4v1.7c.5-.8 1.4-2 3.6-2 2.6 0 4.5 1.7 4.5 5.4V22Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function CommitteePage() {
  return (
    <div className={localStyles.wrap}>
      {/* Lightweight static background */}
      <div className={styles.staticBg} aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/" aria-label="TINT Home">
          <span className="brand__mark" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 6C20.4 6 11 15.4 11 27c0 9.2 5.9 17 14.2 19.9L32 58l6.8-11.1C47.1 44 53 36.2 53 27 53 15.4 43.6 6 32 6Z"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="2.6"
              />
              <path d="M22 28.5c6.5-9.2 17.6-13 28-10.4" stroke="#f8d24a" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M20 34c9.3 4.5 19.7 4.6 30 0" stroke="rgba(151,203,255,0.85)" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="32" cy="26" r="3.2" fill="#f8d24a" />
            </svg>
          </span>
          <span className="brand__text">TINT</span>
        </Link>

        <nav className={styles.nav} aria-label="Exuberance navigation">
          <Link href="/exuberance/schedule">Schedule</Link>
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance/sponsors">Sponsors</Link>
          <Link className={styles.navActive} href="/exuberance/committee" aria-current="page">
            Committee
          </Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link href="/exuberance/contact">Contact Us</Link>
          <Link className={styles.cta} href="/exuberance#register">
            Register
          </Link>
        </nav>

        <Link className={styles.momentsCta} href="/exuberance" aria-label="Back to Exuberance">
          Back
          <span className={styles.momentsCtaIcon} aria-hidden="true">
            ←
          </span>
        </Link>
      </header>

      <main className={localStyles.main}>
        <section className={localStyles.section}>
          <h1 className={localStyles.heading}>Meet Our Organisers</h1>

          <h2 className={localStyles.subHeading}>Faculty</h2>
          <div className={localStyles.track} aria-label="Faculty carousel">
            {FACULTY.map((m) => (
              <article key={m.id} className={localStyles.card} aria-label={m.name}>
                <div className={localStyles.media}>
                  <img className={localStyles.img} src={imgSrcFromFile(m.imgFile)} alt={m.name} loading="lazy" />
                </div>
                <div className={localStyles.meta}>
                  <div className={localStyles.name}>{m.name}</div>
                  <div className={localStyles.role}>{m.designation}</div>
                </div>
              </article>
            ))}
          </div>

          <h2 className={localStyles.subHeading}>Core Committee</h2>
          <div className={localStyles.track} aria-label="Core committee carousel">
            {CORE_COMMITTEE.map((m) => (
              <article key={m.id} className={localStyles.card} aria-label={m.name}>
                <div className={localStyles.media}>
                  <img className={localStyles.img} src={imgSrcFromFile(m.imgFile)} alt={m.name} loading="lazy" />
                </div>
                <div className={localStyles.meta}>
                  <div className={localStyles.name}>{m.name}</div>
                  <div className={localStyles.role}>Core Committee</div>
                  <div className={localStyles.social} aria-label="Social links">
                    <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <LinkedInIcon />
                    </a>
                    <a href={m.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
