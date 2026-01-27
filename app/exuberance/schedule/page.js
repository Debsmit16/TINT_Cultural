import Link from 'next/link';
import ClientEffects from '../../components/ClientEffects.jsx';
import styles from '../Exuberance.module.css';
import SportBg from '../SportBg.jsx';
import localStyles from './Schedule.module.css';
import ScheduleTabs from './ScheduleTabs.jsx';

export const metadata = {
  title: 'Schedule | Exuberance | TINTWeb',
  description: 'Schedule — Exuberance.',
};

export default function SchedulePage() {
  return (
    <div className={styles.wrap}>
      <ClientEffects />

      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring"></div>
        <div className="cursor__dot"></div>
      </div>

      <div
        className="bg"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,.28), rgba(0,0,0,.28)), url("/background/schedule_bg.avif")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      >
        <SportBg className={styles.sport} />
        <div className="bg__vignette"></div>
      </div>

      <div className={styles.fx} aria-hidden="true" />

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
          <Link className={styles.navActive} href="/exuberance/schedule" aria-current="page">
            Schedule
          </Link>
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance/sponsors">Sponsors</Link>
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
        <section className={`section ${localStyles.section}`} aria-label="Schedule">
          <div className={localStyles.head}>
            <h1 className={localStyles.title}>
              <span className={localStyles.titleGlow}>SCHEDULE</span>
            </h1>
            <ScheduleTabs />
          </div>
        </section>
      </main>
    </div>
  );
}
