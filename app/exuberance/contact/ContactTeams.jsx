'use client';

import { useMemo, useState } from 'react';
import styles from './Contact.module.css';

function imgSrcFromFile(fileName) {
  if (!fileName) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
  if (fileName.startsWith('/committee/')) {
    const base = fileName.slice('/committee/'.length);
    return `/committee/${encodeURIComponent(base)}`;
  }
  if (fileName.startsWith('/')) return fileName;
  return `/photos/photo_webp/Webp/${encodeURIComponent(fileName)}`;
}

const TECH_TEAM = [
  {
    id: 'tech-ayushman-das',
    name: 'Ayushman Das',
    imgFile: '/committee/Ayushman Das.jpeg',
    linkedin: 'https://www.linkedin.com/in/ayushman-das-ba6272320?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/_ayushman04._?igsh=MTBzY3QwenpoZ2hk',
  },
  {
    id: 'tech-debsmit-ghosh',
    name: 'Debsmit Ghosh',
    imgFile: '/committee/DEBSMIT GHOSH.jpeg',
    linkedin: 'https://www.linkedin.com/in/debsmit-ghosh-23267227b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/_.iam_debzz._?igsh=MWt3YjM5azVuamswZg==',
  },
];

const CORE_TEAM = [
  {
    id: 'core-karan-raj-singh',
    name: 'Karan Raj Singh',
    imgFile: '/committee/KARAN RAJ SINGH.jpeg',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    id: 'core-sobhon-roy',
    name: 'Sobhon Roy',
    imgFile: '/committee/SOBHAN ROY.png',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
];

const SPONSOR_TEAM = [
  {
    id: 'sponsor-somnath-mukherjee',
    name: 'Somnath Mukherjee',
    imgFile: '/committee/Somnath Mukherjee.jpeg',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    id: 'sponsor-santosh-kumar-singh',
    name: 'Santosh Kumar Singh',
    imgFile: '/committee/Santosh Kumar Singh.jpeg',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" fill="currentColor" />
      <path d="M6 10H2v12h4V10Z" fill="currentColor" />
      <path
        d="M22 22h-4v-6.2c0-1.7-.6-2.9-2.2-2.9-1.2 0-1.9.8-2.2 1.6-.1.3-.1.8-.1 1.2V22h-4s.1-10.6 0-12h4v1.7c.5-.8 1.4-2 3.6-2 2.6 0 4.5 1.7 4.5 5.4V22Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function ContactTeams() {
  const [selected, setSelected] = useState('core');

  const data = useMemo(() => {
    const core = [CORE_TEAM];

    const tech = TECH_TEAM.map((person) => [person]);
    const sponsor = SPONSOR_TEAM.map((person) => [person]);

    return {
      core: { label: 'Core Committee', rows: core },
      tech: { label: 'Tech Team', rows: tech },
      sponsor: { label: 'Sponsor Team', rows: sponsor },
    };
  }, []);

  const active = data[selected] || data.core;

  return (
    <div className={styles.content}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.btn} ${selected === 'core' ? styles.btnActive : ''}`}
          onClick={() => setSelected('core')}
        >
          Core Team
        </button>
        <button
          type="button"
          className={`${styles.btn} ${selected === 'tech' ? styles.btnActive : ''}`}
          onClick={() => setSelected('tech')}
        >
          Tech Team
        </button>
        <button
          type="button"
          className={`${styles.btn} ${selected === 'sponsor' ? styles.btnActive : ''}`}
          onClick={() => setSelected('sponsor')}
        >
          Sponsor Team
        </button>
      </div>

      <div className={`${styles.carousels} ${selected === 'core' ? styles.carouselsCore : ''}`}>
        {active.rows.map((row, rowIndex) => (
          <div key={`${selected}-row-${rowIndex}`} className={styles.carouselRow}>
            <div className={styles.track} role="group" aria-roledescription="carousel">
              {row.map((person) => (
                <article key={person.id} className={styles.card}>
                  <div className={styles.imgWrap} aria-hidden="true">
                    <img className={styles.img} src={imgSrcFromFile(person.imgFile)} alt="" loading="lazy" />
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.name}>{person.name}</div>
                    <div className={styles.role}>{active.label}</div>
                    <div className={styles.icons}>
                      <a className={styles.iconLink} href={person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <LinkedInIcon />
                      </a>
                      <a className={styles.iconLink} href={person.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                        <InstagramIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
