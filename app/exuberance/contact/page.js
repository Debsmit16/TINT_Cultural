import Link from 'next/link';
import styles from '../Exuberance.module.css';
import localStyles from './Contact.module.css';
import ContactTeams from './ContactTeams.jsx';

export const metadata = {
  title: 'Contact Us | Exuberance | TINTWeb',
  description: 'Contact teams — Exuberance.',
};

export default function ContactUsPage() {
  return (
    <div className={localStyles.wrap}>
      <div className={localStyles.bg} aria-hidden="true" />
      {/* Lightweight static background */}
      <div className={styles.staticBg} aria-hidden="true" />

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
          <Link href="/exuberance/sponsors">Sponsors</Link>
          <Link href="/exuberance/committee">Committee</Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link className={styles.navActive} href="/exuberance/contact" aria-current="page">
            Contact Us
          </Link>
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
        <div className={localStyles.container}>
          <ContactTeams />
        </div>
      </main>
    </div>
  );
}
