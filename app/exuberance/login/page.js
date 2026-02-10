import Link from 'next/link';
import styles from '../Exuberance.module.css';
import RegisterForm from '../RegisterForm.jsx';

export const metadata = {
  title: 'Login | Exuberance | TINTWeb',
  description: 'Login or Register for Exuberance 2026 — Annual Sports Fest.',
};

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      {/* Lightweight static background */}
      <div className={styles.staticBg} aria-hidden="true" />

      {/* Navigation panel with logo on the left */}
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

        <nav className={`${styles.nav} ${styles.subpageNav}`} aria-label="Exuberance navigation">
          <Link href="/exuberance">Home</Link>
          <Link href="/exuberance#schedule">Schedule</Link>
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance/committee">Committee</Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link href="/exuberance/contact">Contact Us</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className={styles.loginHead}>
            <h1 className={styles.loginTitle}>EXUBERANCE 2026</h1>
            <p className={styles.loginSub}>Login or Register to participate</p>
          </div>

          <div className={styles.registerFormWrap}>
            <RegisterForm />
          </div>

          <div className={styles.loginBack}>
            <Link href="/exuberance" className={styles.backLink}>
              ← Back to Exuberance
            </Link>
          </div>
        </section>

        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__title">TINT</div>
              <div className="footer__text">Exuberance — Sports • Spirit • Speed.</div>
            </div>

            <nav className="footer__links" aria-label="Footer">
              <Link href="/exuberance">Exuberance</Link>
              <Link href="/">Home</Link>
            </nav>
          </div>

          <div className="footer__bottom">
            <div>© {new Date().getFullYear()} TINT</div>
            <div className="footer__fine">Built for the night.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
