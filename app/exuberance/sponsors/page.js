import Link from 'next/link';
import ClientEffects from '../../components/ClientEffects.jsx';
import styles from '../Exuberance.module.css';
import localStyles from './Sponsors.module.css';

export const metadata = {
  title: 'Sponsors | Exuberance | TINTWeb',
  description: 'Sponsors — Exuberance.',
};

export default function SponsorsPage() {
  return (
    <div className={styles.wrap}>
      <ClientEffects />

      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring"></div>
        <div className="cursor__dot"></div>
      </div>

      <div
        className="bg"
        style={{ background: 'url("/background/sponsors_bg.avif") center/cover no-repeat' }}
        aria-hidden="true"
      >
        <div className="bg__vignette"></div>
      </div>

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
          <Link className={styles.navActive} href="/exuberance/sponsors" aria-current="page">
            Sponsors
          </Link>
          <Link href="/exuberance/committee">Committee</Link>
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

      <main className={styles.main}>
        <section className={`section ${styles.join} ${localStyles.section}`} aria-label="Sponsors">
          <div className={localStyles.head}>
            <h1 className={localStyles.title}>
              <span className={localStyles.titleGlow}>Join Us on Our Journey</span>
            </h1>
            <p className={localStyles.copy}>
              Be part of the energy that powers Exuberance. Your support helps us create bigger arenas, better experiences,
              and unforgettable moments — while putting your brand in front of a vibrant, campus-wide crowd.
            </p>
          </div>

          <div className={styles.joinGrid} aria-label="Event details">
            <div className={styles.joinCard} aria-label="Dates">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 2v3M17 2v3M3.5 9h17M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 13.2h3M7.5 16.6h6.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>Date</div>
                <div className={styles.joinValue}>5, 6, 7 Feb 2026</div>
              </div>
            </div>

            <div className={styles.joinCard} aria-label="Venue">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>Venue</div>
                <div className={styles.joinValue}>TINT</div>
              </div>
            </div>

            <div className={styles.joinCard} aria-label="Participants">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 11a4 4 0 1 0-8 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 21a8 8 0 0 1 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 4a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>Sponsors</div>
                <div className={styles.joinValue}>15+ sponsors</div>
              </div>
            </div>
          </div>

          <div className={localStyles.ctaRow}>
            <a
              className={styles.joinCta}
              href="https://drive.google.com/file/d/1bnxJuXrkn_iHdrJKxAEEfjYbDvsk3ETm/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              aria-label="Become a Sponsor"
            >
              Become a Sponsor
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
