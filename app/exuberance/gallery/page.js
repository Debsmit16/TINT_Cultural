import Link from 'next/link';
import ClientEffects from '../../components/ClientEffects.jsx';
import styles from '../Exuberance.module.css';
import SportBg from '../SportBg.jsx';
import FullGallery from './FullGallery.jsx';
import fullStyles from './FullGallery.module.css';
import { EXUBERANCE_GALLERY_FILES, EXUBERANCE_GALLERY_INITIAL_COUNT } from '../galleryFiles.js';

export const metadata = {
  title: 'Exuberance Gallery | TINTWeb',
  description: 'Full gallery — Exuberance.',
};

export default function ExuberanceGalleryPage() {
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
          <Link href="/exuberance#schedule">Schedule</Link>
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance#sponsors">Sponsors</Link>
          <Link href="/exuberance#committee">Committee</Link>
          <Link className={styles.navActive} href="/exuberance/gallery" aria-current="page">
            Gallery
          </Link>
          <Link href="/exuberance#contact">Contact Us</Link>
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
        <section id="gallery" className={`section ${styles.moments} ${fullStyles.pageSection}`}>
          <div className={`${styles.momentsHead} ${fullStyles.pageHead}`}>
            <h1 className={`${styles.momentsTitle} ${fullStyles.pageTitle}`}>
              <span className={fullStyles.pageTitleGlow}>Gallery</span>
            </h1>
          </div>

          <FullGallery files={EXUBERANCE_GALLERY_FILES} initialCount={EXUBERANCE_GALLERY_INITIAL_COUNT} />
        </section>
      </main>
    </div>
  );
}
