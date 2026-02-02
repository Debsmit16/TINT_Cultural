'use client';

import { useMemo, useState } from 'react';
import styles from './Schedule.module.css';

const DAY_KEYS = ['5', '6', '7'];

export default function ScheduleTabs() {
  const schedule = useMemo(
    () => ({
      '5': {
        label: '5 Feb',
        title: 'Day 1 • 5 Feb 2026',
        items: [
          { time: '09:00 AM', event: 'Opening Ceremony', note: 'Kick-off, march past, and welcome address.' },
          { time: '10:30 AM', event: 'Athletics Heats', note: '100m / 400m trials and qualifiers.' },
          { time: '01:30 PM', event: 'Indoor Arena', note: 'Chess, Carrom, Table Tennis — early rounds.' },
          { time: '04:00 PM', event: 'Outdoor Matches', note: 'Football & Cricket fixtures begin.' },
        ],
      },
      '6': {
        label: '6 Feb',
        title: 'Day 2 • 6 Feb 2026',
        items: [
          { time: '09:30 AM', event: 'Relay Trials', note: 'Team registrations & heats.' },
          { time: '11:00 AM', event: 'Field Events', note: 'Shotput and fun athletics.' },
          { time: '02:00 PM', event: 'Indoor Semi-Finals', note: 'Fast-paced eliminations across indoor games.' },
          { time: '04:30 PM', event: 'Outdoor Knockouts', note: 'Quarter/Semi rounds for major sports.' },
        ],
      },
      '7': {
        label: '7 Feb',
        title: 'Day 3 • 7 Feb 2026',
        items: [
          { time: '09:30 AM', event: 'Finals (Track)', note: '100m / 400m / Relay finals.' },
          { time: '12:30 PM', event: 'Finals (Indoor)', note: 'Championship rounds for indoor events.' },
          { time: '03:30 PM', event: 'Grand Finals (Outdoor)', note: 'Final matches and closing fixtures.' },
          { time: '05:30 PM', event: 'Prize Distribution & Closing', note: 'Awards, felicitation, and closing ceremony.' },
        ],
      },
    }),
    []
  );

  const [activeDay, setActiveDay] = useState('5');
  const active = schedule[activeDay];

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Schedule days">
        {DAY_KEYS.map((k) => {
          const day = schedule[k];
          const isActive = k === activeDay;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => setActiveDay(k)}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      <div className={styles.dayWrap}>
        <div className={styles.dayCard} role="tabpanel" aria-label={active.title}>
          <h2 className={styles.dayTitle}>{active.title}</h2>
          <ul className={styles.list}>
            {active.items.map((it) => (
              <li key={`${activeDay}-${it.time}-${it.event}`} className={styles.item}>
                <div className={styles.time}>{it.time}</div>
                <div className={styles.event}>
                  {it.event}
                  {it.note ? <div className={styles.note}>{it.note}</div> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
