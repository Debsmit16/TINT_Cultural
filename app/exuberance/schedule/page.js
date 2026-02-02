import Link from 'next/link';
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
