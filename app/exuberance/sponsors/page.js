import Link from 'next/link';
import styles from '../Exuberance.module.css';
import localStyles from './Sponsors.module.css';

export const metadata = {
  title: 'Sponsors | Exuberance | TINTWeb',
  description: 'Sponsors — Exuberance.',
};

const FOOD_SPONSORS = [
  {
    src: '/logos/sponsors/Food express plaza_ Food sponcer.jpg',
    alt: 'Food Express Plaza',
  },
  {
    src: '/logos/sponsors/Royal Biriyani_Food Sponcer.jpg',
    alt: 'Royal Biriyani',
  },
];

const MEDICAL_PARTNERS = [
  {
    src: '/logos/sponsors/Universal Educare_ Medical Partner.jpg',
    alt: 'Universal Educare',
  },
];

export default function SponsorsPage() {
  return (
    <div className={styles.wrap}>
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
            <img
              src="/logos/exuberance_logo.webp"
              alt=""
              width="46"
              height="46"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </span>
          <span className="brand__text" style={{ color: 'cyan' }}>
            EXUBERANCE
          </span>
        </Link>

        <nav className={`${styles.nav} ${styles.subpageNav}`} aria-label="Exuberance navigation">
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
          <div className={localStyles.logoWrap} aria-label="Sponsors logos">
            <div className={localStyles.logoGroup} aria-label="Food Sponsor">
              <h2 className={localStyles.logoHeading}>Food Sponsor</h2>
              <div className={localStyles.logoGrid} aria-label="Food Sponsor logos">
                {FOOD_SPONSORS.map((logo) => (
                  <div key={logo.src} className={localStyles.logoCard}>
                    <img className={localStyles.logoImg} src={logo.src} alt={logo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className={localStyles.logoGroup} aria-label="Medical Partner">
              <h2 className={localStyles.logoHeading}>Medical Partner</h2>
              <div className={localStyles.logoGrid} aria-label="Medical Partner logos">
                {MEDICAL_PARTNERS.map((logo) => (
                  <div key={logo.src} className={localStyles.logoCard}>
                    <img className={localStyles.logoImg} src={logo.src} alt={logo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                <div className={styles.joinValue}>12, 13 Feb 2026</div>
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
