import Link from 'next/link';
import styles from '../../Exuberance.module.css';
import localStyles from './Event.module.css';
import { EVENT_DETAILS } from '../eventDetails';

const titleFromSlug = (slug) => {
  const raw = String(slug ?? '').replace(/-/g, ' ');
  return raw.replace(/\b\w/g, (m) => m.toUpperCase());
};

export default function ActivityDetailsPage({ params }) {
  const slug = params?.slug;
  const details = EVENT_DETAILS[slug] || {
    title: titleFromSlug(slug),
    rules: [],
    eventHeads: [],
  };

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

        <nav className={styles.nav} aria-label="Exuberance navigation">
          <Link href="/exuberance/schedule">Schedule</Link>
          <Link className={styles.navActive} href="/exuberance#awaits" aria-current="page">
            Activities
          </Link>
          <Link href="/exuberance/sponsors">Sponsors</Link>
          <Link href="/exuberance/committee">Committee</Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link href="/exuberance/contact">Contact Us</Link>
          <Link className={styles.cta} href="/exuberance#register">
            Register
          </Link>
        </nav>

        <Link className={styles.momentsCta} href="/exuberance#awaits" aria-label="Back">
          <span className={styles.momentsCtaIcon} aria-hidden="true">
            ←
          </span>
        </Link>
      </header>

      <main className={styles.main}>
        <section className={`section ${localStyles.pageSection}`}>
          <div className={localStyles.container}>
            <h1 className={localStyles.heading}>KNOW MORE ABOUT {details.title}</h1>

            <h2 className={localStyles.subHeading}>Rules and Regulations</h2>
            <section className={localStyles.rules}>
              {details.rules?.length ? (
                <ol>
                  {details.rules.map((rule, idx) => (
                    <li key={`${slug}-rule-${idx}`}>{rule}</li>
                  ))}
                </ol>
              ) : (
                <div className={localStyles.emptySpace} />
              )}
            </section>

            <h2 className={localStyles.subHeading}>Event Heads</h2>
            <section className={localStyles.heads}>
              {details.eventHeads?.length ? (
                details.eventHeads.map((head, idx) => (
                  <div key={`${slug}-head-${idx}`} className={localStyles.headCard}>
                    <p className={localStyles.headName}>{head.name}</p>
                    <p className={localStyles.headExtra}>{head.extra}</p>
                  </div>
                ))
              ) : (
                <div className={localStyles.emptySpace} />
              )}
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
