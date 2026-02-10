import Link from 'next/link';
import styles from '../Exuberance.module.css';
import localStyles from './Matches.module.css';
import MatchesClient from './MatchesClient.jsx';

export const metadata = {
  title: 'Fixtures & Match Finder | Exuberance | TINTWeb',
  description: 'Fixtures and match finder — Exuberance.',
};

export default function MatchesPage() {
  return (
    <div className={styles.wrap}>
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

        <Link className={styles.momentsCta} href="/exuberance" aria-label="Back to Exuberance">
          Back
          <span className={styles.momentsCtaIcon} aria-hidden="true">
            ←
          </span>
        </Link>
      </header>

      <main className={styles.main}>
        <section className={`section ${localStyles.pageHead}`} aria-label="Fixtures and Match Finder">
          <h1 className={localStyles.pageTitle}>Fixtures</h1>
        </section>

        <MatchesClient />
      </main>
    </div>
  );
}
