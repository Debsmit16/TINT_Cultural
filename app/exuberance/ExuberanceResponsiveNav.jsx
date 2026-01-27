'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';

export default function ExuberanceResponsiveNav({ styles }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {/* Desktop nav (unchanged layout) */}
      <nav className={`${styles.nav} ${styles.navDesktopOnly}`} aria-label="Exuberance navigation">
        <Link href="/exuberance/schedule">Schedule</Link>
        <a href="#awaits">Activities</a>
        <Link href="/exuberance/sponsors">Sponsors</Link>
        <Link href="/exuberance/committee">Committee</Link>
        <Link href="/exuberance/gallery">Gallery</Link>
        <Link href="/exuberance/contact">Contact Us</Link>
        <a className={styles.cta} href="#register">
          Register
        </a>
      </nav>

      {/* Mobile/tablet nav (hamburger) */}
      <div className={styles.navMobileOnly}>
        <button
          type="button"
          className={styles.hamburgerBtn}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.hamburgerIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div id={menuId} className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
          <Link href="/exuberance/schedule" onClick={close}>
            Schedule
          </Link>
          <a href="#awaits" onClick={close}>
            Activities
          </a>
          <Link href="/exuberance/sponsors" onClick={close}>
            Sponsors
          </Link>
          <Link href="/exuberance/committee" onClick={close}>
            Committee
          </Link>
          <Link href="/exuberance/gallery" onClick={close}>
            Gallery
          </Link>
          <Link href="/exuberance/contact" onClick={close}>
            Contact Us
          </Link>
          <a className={styles.mobileCta} href="#register" onClick={close}>
            Register
          </a>
        </div>
      </div>
    </>
  );
}
