'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './FullGallery.module.css';
import exuStyles from '../Exuberance.module.css';

function fileNameToAlt(fileName) {
  const base = fileName.replace(/\.[^/.]+$/, '');
  return base
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toImage(fileName) {
  const encoded = encodeURIComponent(fileName);
  return {
    fileName,
    src: `/photos/photo_webp/Webp/${encoded}`,
    alt: fileNameToAlt(fileName) || 'Exuberance moment',
  };
}

export default function FullGallery({ files, initialCount = 6 }) {
  const [active, setActive] = useState(null);

  const rest = useMemo(() => {
    return (files ?? []).slice(initialCount).map(toImage);
  }, [files, initialCount]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} aria-label="Exuberance full gallery">
        {rest.map((img) => (
          <figure key={img.src} className={`${exuStyles.momentsItem} ${styles.item}`}>
            <img className={exuStyles.momentsImg} src={img.src} alt={img.alt} loading="lazy" />
            <button
              type="button"
              className={styles.zoomButton}
              aria-label={`Zoom ${img.alt}`}
              onClick={() => setActive(img)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 8v6M8 11h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </figure>
        ))}
      </div>

      {active ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setActive(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBar}>
              <p className={styles.modalTitle}>{active.alt}</p>
              <button type="button" className={styles.close} onClick={() => setActive(null)}>
                Close
              </button>
            </div>
            <img className={styles.modalImg} src={active.src} alt={active.alt} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
