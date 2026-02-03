'use client';

import { useMemo } from 'react';

export default function PastYearsCarousels({ className }) {
  const COMING_SOON_IMG = '/activities/coming%20soon.jpg';

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
            img: COMING_SOON_IMG,
          },
          {
            title: 'Track & Field',
            caption: 'Sprint lines. Finish-line roar.',
            img: COMING_SOON_IMG,
          },
          {
            title: 'Team Battles',
            caption: 'One squad. One goal.',
            img: COMING_SOON_IMG,
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
            img: COMING_SOON_IMG,
          },
          {
            title: 'Basketball',
            caption: 'Quick hands. Quick hearts.',
            img: COMING_SOON_IMG,
          },
          {
            title: 'Victory Moments',
            caption: 'Win with grace. Lose with pride.',
            img: COMING_SOON_IMG,
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
            img: COMING_SOON_IMG,
          },
          {
            title: 'Relay Spirit',
            caption: 'Trust is the fastest lane.',
            img: COMING_SOON_IMG,
          },
          {
            title: 'Finals Night',
            caption: 'The last whistle. The loudest cheer.',
            img: COMING_SOON_IMG,
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
