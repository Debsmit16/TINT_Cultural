'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import exuStyles from '../Exuberance.module.css';

const EVENT_CARDS = [
  {
    id: 'outdoor',
    title: 'Outdoor Events',
    subtitle: 'Cricket & Football',
    description: 'Team sports at NKDA Ground. Cricket (Boys/Girls) and Football (Boys).',
    date: '6th & 7th Feb 2026',
    venue: 'NKDA Ground, Newtown',
    limit: 'Max 1 outdoor game per athlete',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V16h2.87c-.87.48-1.84.8-2.87.93zM18.24 15H13v-1h6.74c-.08.34-.15.67-.26 1zm.68-3H13v-1h6.93c-.04.34-.11.67-.19 1h.18z" fill="currentColor"/>
      </svg>
    ),
    color: '#22c55e',
    href: '/exuberance/dashboard/outdoor',
    category: 'OUTDOOR',
  },
  {
    id: 'athletics',
    title: 'Athletics Events',
    subtitle: 'Track & Field',
    description: '100m, 400m, Shot put, Relay, Hit the Wicket.',
    date: '5th Feb 2026',
    venue: 'NKDA Ground, Newtown',
    limit: 'Max 2 events per athlete',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.5 14.5l1-4.5 2 2v6h2v-7.5l-2-2 .5-2.5c1.1 1.3 2.8 2.2 4.5 2.5v-2c-1.3-.3-2.5-1.1-3.2-2.2l-1-1.6c-.4-.6-1-1-1.8-1-.3 0-.5.1-.8.1l-5.2 2.2v4.5h2v-3.4l1.8-.7-1.6 8.1-4.2-1-.4 2 6.4 1.5z" fill="currentColor"/>
      </svg>
    ),
    color: '#f59e0b',
    href: '/exuberance/dashboard/athletics',
    category: 'ATHLETICS',
  },
  {
    id: 'indoor',
    title: 'Indoor Events',
    subtitle: 'Mind & Precision Sports',
    description: 'Chess, Carrom, Table Tennis, Badminton (Girls only).',
    date: '5th & 6th Feb 2026',
    venue: 'College Premises',
    limit: 'Max 2 indoor games per athlete',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z" fill="currentColor"/>
        <rect x="9" y="6" width="2" height="2" fill="currentColor"/>
        <rect x="13" y="6" width="2" height="2" fill="currentColor"/>
        <rect x="9" y="10" width="2" height="2" fill="currentColor"/>
        <rect x="13" y="10" width="2" height="2" fill="currentColor"/>
        <rect x="9" y="14" width="2" height="2" fill="currentColor"/>
        <rect x="13" y="14" width="2" height="2" fill="currentColor"/>
      </svg>
    ),
    color: '#8b5cf6',
    href: '/exuberance/dashboard/indoor',
    category: 'INDOOR',
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIdCard, setShowIdCard] = useState(false);
  const idCardRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/exuberance/login');
    }
  }, [status, router]);

  // Fetch user's registrations from API
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch('/api/registrations');
        if (res.ok) {
          const data = await res.json();
          setRegistrations(data.registrations || []);
        }
      } catch (err) {
        console.error('Failed to fetch registrations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchRegistrations();
    }
  }, [session]);

  const getRegistrationCountByCategory = (category) => {
    return registrations.filter(r => r.sport?.category === category).length;
  };

  const getUserTasoId = () => {
    if (registrations.length > 0 && registrations[0].tasoId) {
      return registrations[0].tasoId;
    }
    return null;
  };

  const exportIdCard = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Dynamically import jsPDF and html2canvas
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      
      if (!idCardRef.current) return;
      
      const canvas = await html2canvas(idCardRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0f',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85.6, 140], // ID card size
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 140);
      pdf.save(`TASO_ID_${getUserTasoId() || 'card'}.pdf`);
    } catch (err) {
      console.error('Failed to export ID card:', err);
      alert('Failed to export ID card. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tasoId = getUserTasoId();

  return (
    <div className={styles.wrap}>
      {/* Lightweight static background */}
      <div className={exuStyles.staticBg} aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/" aria-label="TINT Home">
          <span className="brand__mark" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 6C20.4 6 11 15.4 11 27c0 9.2 5.9 17 14.2 19.9L32 58l6.8-11.1C47.1 44 53 36.2 53 27 53 15.4 43.6 6 32 6Z" stroke="rgba(255,255,255,0.75)" strokeWidth="2.6"/>
              <path d="M22 28.5c6.5-9.2 17.6-13 28-10.4" stroke="#f8d24a" strokeWidth="2.6" strokeLinecap="round"/>
              <path d="M20 34c9.3 4.5 19.7 4.6 30 0" stroke="rgba(151,203,255,0.85)" strokeWidth="2.6" strokeLinecap="round"/>
              <circle cx="32" cy="26" r="3.2" fill="#f8d24a"/>
            </svg>
          </span>
          <span className="brand__text">TINT</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/exuberance">Exuberance</Link>
          <Link href="/exuberance/dashboard" className={styles.navActive}>Dashboard</Link>
          {session?.user?.role === 'ADMIN' && (
            <Link href="/admin" style={{ color: '#22c55e' }}>Admin Panel</Link>
          )}
          <Link href="/exuberance/login">Account</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.welcomeBox}>
            <h1 className={styles.welcomeTitle}>
              Welcome, <span className={styles.userName}>{session.user?.name || 'Athlete'}</span>!
            </h1>
            <p className={styles.welcomeSub}>
              {registrations.length > 0 
                ? `You have registered for ${registrations.length} event(s). View your ID card below!`
                : 'Register for Exuberance 2026 events below. Choose your sports wisely!'}
            </p>
            {tasoId && (
              <div className={styles.tasoIdDisplay}>
                <span className={styles.tasoIdLabel}>Your TASO ID:</span>
                <code className={styles.tasoIdCode}>{tasoId}</code>
              </div>
            )}
          </div>
        </section>

        {/* My Registrations Section */}
        {registrations.length > 0 && (
          <section className={styles.registrationsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Registrations</h2>
              <button 
                className={styles.idCardBtn}
                onClick={() => setShowIdCard(!showIdCard)}
              >
                {showIdCard ? '✕ Hide ID Card' : '🪪 View ID Card'}
              </button>
            </div>

            <div className={styles.registrationsGrid}>
              {registrations.map((reg) => (
                <div key={reg.id} className={styles.regCard}>
                  <div className={styles.regHeader}>
                    <span className={styles.regCategory}>{reg.sport?.category}</span>
                    <span className={`${styles.regStatus} ${styles[`status${reg.status}`]}`}>
                      {reg.status}
                    </span>
                  </div>
                  <h4 className={styles.regSport}>{reg.sport?.name}</h4>
                  <div className={styles.regDetails}>
                    {reg.participantName && <p>Name: {reg.participantName}</p>}
                    {reg.teamName && <p>Team: {reg.teamName}</p>}
                    {reg.participantDept && <p>Dept: {reg.participantDept}</p>}
                    <p className={styles.regDate}>
                      Registered: {new Date(reg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ID Card Modal */}
            {showIdCard && (
              <div className={styles.idCardModal}>
                <div className={styles.idCardWrapper}>
                  <div ref={idCardRef} className={styles.idCard}>
                    <div className={styles.idCardHeader}>
                      <div className={styles.idCardLogo}>🏆</div>
                      <div>
                        <h3 className={styles.idCardTitle}>EXUBERANCE 2026</h3>
                        <p className={styles.idCardSubtitle}>TINT Annual Sports Fest</p>
                      </div>
                    </div>
                    
                    <div className={styles.idCardPhoto}>
                      <div className={styles.idCardAvatar}>
                        {session.user?.name?.charAt(0) || 'A'}
                      </div>
                    </div>

                    <div className={styles.idCardInfo}>
                      <div className={styles.idCardField}>
                        <span className={styles.idCardLabel}>Name</span>
                        <span className={styles.idCardValue}>{session.user?.name || 'N/A'}</span>
                      </div>
                      <div className={styles.idCardField}>
                        <span className={styles.idCardLabel}>Email</span>
                        <span className={styles.idCardValue} style={{ fontSize: '0.7rem' }}>{session.user?.email || 'N/A'}</span>
                      </div>
                      <div className={styles.idCardField}>
                        <span className={styles.idCardLabel}>TASO ID</span>
                        <span className={styles.idCardValue} style={{ color: '#22c55e', fontWeight: 700 }}>
                          {tasoId || 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className={styles.idCardEvents}>
                      <span className={styles.idCardLabel}>Registered Events ({registrations.length})</span>
                      <div className={styles.idCardEventList}>
                        {registrations.slice(0, 5).map(reg => (
                          <span key={reg.id} className={styles.idCardEventTag}>
                            {reg.sport?.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.idCardFooter}>
                      <p>Techno India, Salt Lake</p>
                      <p>5-7 Feb 2026</p>
                    </div>
                  </div>

                  <button className={styles.exportBtn} onClick={exportIdCard}>
                    📥 Export as PDF
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        <section className={styles.cardsSection}>
          <h2 className={styles.sectionTitle}>Event Registration</h2>
          <p className={styles.sectionSub}>Select an event category to register</p>

          <div className={styles.cardsGrid}>
            {EVENT_CARDS.map((card) => {
              const regCount = getRegistrationCountByCategory(card.category);
              const maxLimit = card.category === 'OUTDOOR' ? 1 : 2;
              const isMaxed = regCount >= maxLimit;

              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className={`${styles.eventCard} ${isMaxed ? styles.eventCardDisabled : ''}`}
                  style={{ '--card-color': card.color }}
                >
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardSubtitle}>{card.subtitle}</p>
                    <p className={styles.cardDesc}>{card.description}</p>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>📅 {card.date}</span>
                      <span className={styles.cardVenue}>📍 {card.venue}</span>
                    </div>
                    <div className={styles.cardLimit}>
                      {isMaxed ? (
                        <span style={{ color: '#ef4444' }}>✓ Limit reached ({regCount}/{maxLimit})</span>
                      ) : (
                        <span>⚠️ {card.limit} ({regCount}/{maxLimit} used)</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.cardArrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.rulesSection}>
          <h2 className={styles.sectionTitle}>General Rules</h2>
          <div className={styles.rulesList}>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>📌</span>
              <p>Only currently enrolled college students are eligible to participate.</p>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>📌</span>
              <p>ID proof (Student ID/Library Card/Money Receipt) is mandatory for all events.</p>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>📌</span>
              <p>Unsportsmanlike behavior will result in immediate disqualification.</p>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>📌</span>
              <p>Contact your departmental sports committee for any queries.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__title">TINT</div>
              <div className="footer__text">Exuberance 2026 — Sports • Spirit • Speed.</div>
            </div>
          </div>
          <div className="footer__bottom">
            <div>© {new Date().getFullYear()} TINT</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
