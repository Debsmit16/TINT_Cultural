'use client';

import { useMemo } from 'react';

export default function PastYearsCarousels({ className }) {
  const years = useMemo(
    () => [
      {
        year: '2023',
        tagline: 'The year the spirit ignited.',
        blurb: 'Breakthrough performances, first-time winners, and a campus that learned to cheer together.',
        slides: [
          {
            title: 'Opening Ceremony',
            caption: 'Flags up. Heartbeat louder.',
            img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Track & Field',
            caption: 'Sprint lines. Finish-line roar.',
            img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Team Battles',
            caption: 'One squad. One goal.',
            img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
      {
        year: '2024',
        tagline: 'Sharper, faster, louder.',
        blurb: 'Cleaner plays, deeper rivalries, and unforgettable comebacks—earned with respect on every point.',
        slides: [
          {
            title: 'Arena Nights',
            caption: 'Lights, chants, momentum.',
            img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Basketball',
            caption: 'Quick hands. Quick hearts.',
            img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Victory Moments',
            caption: 'Win with grace. Lose with pride.',
            img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
      {
        year: '2025',
        tagline: 'Peak energy. Pure sportsmanship.',
        blurb: 'A festival built on discipline and respect—where competition raised everyone’s level.',
        slides: [
          {
            title: 'Football Clash',
            caption: 'Pressure, passes, precision.',
            img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Relay Spirit',
            caption: 'Trust is the fastest lane.',
            img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: 'Finals Night',
            caption: 'The last whistle. The loudest cheer.',
            img: 'https://images.unsplash.com/photo-1526676033148-46f5f6f7b24a?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className={className}>
      {years.map((y) => (
        <article key={y.year} className="exuYear" aria-label={`Exuberance ${y.year} highlights`}>
          <header className="exuYear__top">
            <div className="exuYear__meta">
              <div className="exuYear__year">{y.year}</div>
              <div className="exuYear__tag">{y.tagline}</div>
              <div className="exuYear__blurb">{y.blurb}</div>
            </div>
          </header>

          <div
            className="exuYear__track"
            role="group"
            aria-roledescription="carousel"
            aria-label={`${y.year} images`}
          >
            {(() => {
              const s = y.slides[0];
              return (
                <div key={s.title} className="exuYear__slide" data-slide>
                  <div className="exuYear__media">
                    <img className="exuYear__img" src={s.img} alt={`${y.year} — ${s.title}`} loading="lazy" />
                  </div>
                  <div className="exuYear__caption">
                    <div className="exuYear__title">{s.title}</div>
                    <div className="exuYear__desc">{s.caption}</div>

                    <a className="exuYear__seeMore" href="#register" aria-label={`See more about ${y.year}`}>
                      See More
                      <span className="exuYear__seeMoreIcon" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </article>
      ))}
    </div>
  );
}
