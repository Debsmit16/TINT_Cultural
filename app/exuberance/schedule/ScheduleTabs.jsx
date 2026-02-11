'use client';

import { useMemo, useState } from 'react';
import styles from './Schedule.module.css';

const DAY_KEYS = ['5', '6'];

export default function ScheduleTabs() {
  const schedule = useMemo(
    () => ({
      '5': {
        label: '12 Feb',
        title: 'Day 1 • 12 Feb 2026',
        items: [
          { time: '07:30–08:30 AM', event: 'Athletics Registration' },
          { time: '07:30 AM', event: 'Cricket Registration' },
          { time: '08:00 AM', event: 'Athletics (100m, 400m, Relay)' },
          { time: '08:00 AM', event: 'Cricket Matches' },
          { time: '08:30–09:30 AM', event: 'Badminton Registration' },
          { time: '08:30 AM', event: 'Indoor Games Reporting' },
          { time: '09:00 AM', event: 'Indoor Games' },
          { time: '09:30 AM', event: 'Football Reporting' },
          { time: '10:00 AM', event: 'Badminton Matches' },
          { time: '10:00 AM', event: 'Football Matches' },
          { time: '12:00 Noon', event: 'Inauguration Ceremony' },
        ],
      },
      '6': {
        label: '13 Feb',
        title: 'Day 2 • 13 Feb 2026',
        items: [
          { time: '', event: 'Cricket Semi-Finals' },
          { time: '', event: 'Football Semi-Finals' },
          { time: '', event: 'Cricket Finals' },
          { time: '', event: 'Football Finals' },
          { time: '', event: 'Cricket (Girls)' },
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
                {it.time ? <div className={styles.time}>{it.time}</div> : null}
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
