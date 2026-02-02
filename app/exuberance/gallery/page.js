import Link from 'next/link';
import styles from '../Exuberance.module.css';
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
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance/sponsors">Sponsors</Link>
          <Link href="/exuberance/committee">Committee</Link>
          <Link className={styles.navActive} href="/exuberance/gallery" aria-current="page">
            Gallery
          </Link>
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
