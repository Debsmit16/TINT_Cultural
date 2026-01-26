'use client';

import Link from 'next/link';
import styles from './FestCards.module.css';

const FESTS = [
  {
    title: 'Exuberance',
    subtitle: 'Annual Sports Fest',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    desc: 'Sprint, roar, and repeat — where every second feels electric and every team becomes a story.',
  },
  {
    title: 'Prabuddha',
    subtitle: 'Annual Tech Fest',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hackathons, prototypes, and late-night breakthroughs — creativity engineered into reality.',
  },
  {
    title: 'Yagvik',
    subtitle: 'Annual Cultural Fest',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    desc: 'Music, lights, and timeless performances — curated chaos that feels elegant.',
  },
];

export default function FestCards() {
  return (
    <div className={styles.wrap} aria-label="Festival cards carousel">
      <div className={styles.container}>
        {FESTS.map((fest) => (
          <article key={fest.title} className={styles.card}>
            <div className={styles.head}>
              <h3 className={styles.title}>{fest.title}</h3>
              <div className={styles.sub}>{fest.subtitle}</div>
            </div>

            <div className={styles.media}>
              <img className={styles.img} src={fest.image} alt={fest.title} loading="lazy" />
            </div>

            <p className={styles.desc}>{fest.desc}</p>

            <div className={styles.actions}>
              {fest.title === 'Exuberance' ? (
                <Link className={styles.btn} href="/exuberance" aria-label="Explore Exuberance">
                  Explore
                </Link>
              ) : (
                <Link className={styles.btn} href={`/${fest.title.toLowerCase()}`} aria-label={`Explore ${fest.title}`}>
                  Coming Soon
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
