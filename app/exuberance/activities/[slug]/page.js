import Link from 'next/link';
import ClientEffects from '../../../components/ClientEffects.jsx';
import styles from '../../Exuberance.module.css';
import SportBg from '../../SportBg.jsx';
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
      <ClientEffects />

      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring"></div>
        <div className="cursor__dot"></div>
      </div>

      <div className="bg" aria-hidden="true">
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
              <path
                d="M22 28.5c6.5-9.2 17.6-13 28-10.4"
                stroke="#f8d24a"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M20 34c9.3 4.5 19.7 4.6 30 0"
                stroke="rgba(151,203,255,0.85)"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="32" cy="26" r="3.2" fill="#f8d24a" />
            </svg>
          </span>
          <span className="brand__text">TINT</span>
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
