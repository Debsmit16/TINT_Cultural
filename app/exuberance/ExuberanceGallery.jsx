'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Exuberance.module.css';

function fileNameToAlt(fileName) {
  const base = fileName.replace(/\.[^/.]+$/, '');
  return base
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function ExuberanceGallery({ files, initialCount = 6 }) {
  const images = useMemo(() => {
    return (files ?? []).map((fileName) => {
      const encoded = encodeURIComponent(fileName);
      return {
        src: `/photos/photo_webp/Webp/${encoded}`,
        alt: fileNameToAlt(fileName) || 'Exuberance moment',
      };
    });
  }, [files]);

  const visible = images.slice(0, initialCount);
  const hasMore = images.length > initialCount;

  return (
    <>
      <div className={styles.momentsGrid} aria-label="Exuberance gallery">
        {visible.map((img) => (
          <figure key={img.src} className={styles.momentsItem}>
            <img className={styles.momentsImg} src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      {hasMore ? (
        <div className={styles.momentsFoot}>
          <Link className={styles.momentsCta} href="/exuberance/gallery" aria-label="View full gallery">
            View full gallery
            <span className={styles.momentsCtaIcon} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      ) : null}
    </>
  );
}
