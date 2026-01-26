import Link from 'next/link';
import styles from './ComingSoon.module.css';

export const metadata = {
  title: 'Prabuddha | Coming Soon | TINTWeb',
  description: 'Prabuddha — Annual Tech Fest. Coming Soon.',
};

export default function PrabuddhaPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.bg} aria-hidden="true" />
      
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
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.icon}>🚀</div>
          <h1 className={styles.title}>Prabuddha</h1>
          <p className={styles.subtitle}>Annual Tech Fest</p>
          <div className={styles.badge}>Coming Soon</div>
          <p className={styles.desc}>
            Hackathons, prototypes, and late-night breakthroughs — creativity engineered into reality.
          </p>
          <Link href="/" className={styles.backBtn}>
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
