import Link from 'next/link';
import ClientEffects from '../components/ClientEffects.jsx';
import styles from './Exuberance.module.css';
import SportBg from './SportBg.jsx';
import PastYearsCarousels from './PastYearsCarousels.jsx';
import ExuberanceGallery from './ExuberanceGallery.jsx';
import RegisterForm from './RegisterForm.jsx';
import { EXUBERANCE_GALLERY_FILES, EXUBERANCE_GALLERY_INITIAL_COUNT } from './galleryFiles.js';
import { slugFromEventTitle } from './activities/eventDetails.js';

export const metadata = {
  title: 'Exuberance | TINTWeb',
  description: 'Exuberance — Annual Sports Fest.',
};

export default function ExuberancePage() {
  const awaits = {
    athletics: [
      {
        title: '100 metres',
        img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: '400 metres',
        img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Shotput',
        img: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Relay Race',
        img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Hit the Wicket',
        img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Tug of war',
        img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    outdoor: [
      {
        title: 'Cricket',
        img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Football',
        img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Badminton',
        img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    indoor: [
      {
        title: 'Chess',
        img: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Carrom',
        img: 'https://images.unsplash.com/photo-1611947330066-1b975a4b7f74?auto=format&fit=crop&w=1600&q=80',
      },
      {
        title: 'Table Tennis',
        img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1600&q=80',
      },
    ],
  };


  return (
    <div className={styles.wrap}>
      {/* Keep the same premium client-side background dynamics */}
      <ClientEffects />

      {/* Custom cursor (same as home) */}
      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring"></div>
        <div className="cursor__dot"></div>
      </div>

      {/* Background (liquid sky canvas) */}
      <div className="bg" aria-hidden="true">
        <SportBg className={styles.sport} />
        <div className="bg__vignette"></div>
      </div>

      {/* Page-specific extra ambient motion */}
      <div className={styles.fx} aria-hidden="true" />

      {/* Navigation panel with logo on the left */}
      <header className="topbar">
        <Link className="brand" href="/" aria-label="TINT Home">
          <span className="brand__mark" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 6C20.4 6 11 15.4 11 27c0 9.2 5.9 17 14.2 19.9L32 58l6.8-11.1C47.1 44 53 36.2 53 27 53 15.4 43.6 6 32 6Z"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="2.6"
              />
              <path
                d="M22 28.5c6.5-9.2 17.6-13 28-10.4"
                stroke="#f8d24a"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M20 34c9.3 4.5 19.7 4.6 30 0"
                stroke="rgba(151,203,255,0.85)"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="32" cy="26" r="3.2" fill="#f8d24a" />
            </svg>
          </span>
          <span className="brand__text">TINT</span>
        </Link>

        <nav className={styles.nav} aria-label="Exuberance navigation">
          <a href="#schedule">Schedule</a>
          <a href="#awaits">Activities</a>
          <a href="#sponsors">Sponsors</a>
          <Link href="/exuberance/committee">Committee</Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link href="/exuberance/contact">Contact Us</Link>
          <a className={styles.cta} href="#register">
            Register
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.panel}>
            <div className={styles.heroStack}>
              <div className={styles.heroTitle}>EXUBERANCE</div>
              <div className={styles.heroYear}>2026</div>
              <div className={styles.heroTag}>ANNUAL SPORTS FEST</div>
              <div className={styles.heroCollege}>TECHNO INTERNATIONAL NEW TOWN</div>
            </div>
          </div>
        </section>

        <section id="sportsmanship" className={`section ${styles.sportsmanship}`}>
          <div className={styles.sportsmanshipHead}>
            <h2 className={styles.sportsmanshipTitle}>Encouraging sportsmanship</h2>
            <p className={styles.sportsmanshipSub}>
              Compete hard, respect harder. Exuberance is where discipline meets celebration—every match a lesson,
              every win a handshake, every loss a step forward.
            </p>
          </div>

          <div className={styles.yearsWrap}>
            <PastYearsCarousels className={styles.yearsGrid} />
          </div>
        </section>

        <section id="awaits" className={`section ${styles.awaits}`}>
          <div className={styles.awaitsHead}>
            <h2 className={styles.awaitsTitle}>What Awaits You</h2>
            <p className={styles.awaitsSub}>Two days of non-stop sports, adrenaline, and entertainment</p>
          </div>

          <div className={styles.awaitsBlocks}>
            <div className={styles.awaitBlock} aria-label="Athletics">
              <h3 className={styles.awaitBlockTitle}>Athletics</h3>
              <div className={styles.awaitTrack} role="group" aria-roledescription="carousel" aria-label="Athletics events">
                {awaits.athletics.map((item) => (
                  <article key={item.title} className={styles.awaitCard} aria-label={item.title}>
                    <div className={styles.awaitMedia}>
                      <img className={styles.awaitImg} src={item.img} alt={item.title} loading="lazy" />
                      <div className={styles.awaitOverlay} aria-hidden="true" />
                    </div>
                    <div className={styles.awaitCardFooter}>
                      <div className={styles.awaitCardTitle}>{item.title}</div>
                      <Link
                        className={styles.awaitExplore}
                        href={`/exuberance/activities/${slugFromEventTitle(item.title)}`}
                        aria-label={`Explore more about ${item.title}`}
                      >
                        Explore More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.awaitBlock} aria-label="Outdoor Sports">
              <h3 className={styles.awaitBlockTitle}>Outdoor Sports</h3>
              <div
                className={`${styles.awaitTrack} ${styles.awaitTrackCenter}`}
                role="group"
                aria-roledescription="carousel"
                aria-label="Outdoor sports events"
              >
                {awaits.outdoor.map((item) => (
                  <article key={item.title} className={styles.awaitCard} aria-label={item.title}>
                    <div className={styles.awaitMedia}>
                      <img className={styles.awaitImg} src={item.img} alt={item.title} loading="lazy" />
                      <div className={styles.awaitOverlay} aria-hidden="true" />
                    </div>
                    <div className={styles.awaitCardFooter}>
                      <div className={styles.awaitCardTitle}>{item.title}</div>
                      <Link
                        className={styles.awaitExplore}
                        href={`/exuberance/activities/${slugFromEventTitle(item.title)}`}
                        aria-label={`Explore more about ${item.title}`}
                      >
                        Explore More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.awaitBlock} aria-label="Indoor Sports">
              <h3 className={styles.awaitBlockTitle}>Indoor Sports</h3>
              <div
                className={`${styles.awaitTrack} ${styles.awaitTrackCenter}`}
                role="group"
                aria-roledescription="carousel"
                aria-label="Indoor sports events"
              >
                {awaits.indoor.map((item) => (
                  <article key={item.title} className={styles.awaitCard} aria-label={item.title}>
                    <div className={styles.awaitMedia}>
                      <img className={styles.awaitImg} src={item.img} alt={item.title} loading="lazy" />
                      <div className={styles.awaitOverlay} aria-hidden="true" />
                    </div>
                    <div className={styles.awaitCardFooter}>
                      <div className={styles.awaitCardTitle}>{item.title}</div>
                      <Link
                        className={styles.awaitExplore}
                        href={`/exuberance/activities/${slugFromEventTitle(item.title)}`}
                        aria-label={`Explore more about ${item.title}`}
                      >
                        Explore More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className={`section ${styles.moments}`}>
          <div className={styles.momentsHead}>
            <h2 className={styles.momentsTitle}>
              Moments from <span className={styles.momentsExu}>EXUBERANCE</span>
            </h2>
          </div>

          <ExuberanceGallery files={EXUBERANCE_GALLERY_FILES} initialCount={EXUBERANCE_GALLERY_INITIAL_COUNT} />
        </section>

        <section id="register" className={`section ${styles.join}`}>
          <div className={styles.joinHead}>
            <h2 className={styles.joinTitle}>
              Join <span className={styles.joinCount}>600+</span> Students
            </h2>
            <p className={styles.joinSub}>Be a part of Exuberance</p>
          </div>

          <div className={styles.registerFormWrap}>
            <RegisterForm />
          </div>

          <div className={styles.joinGrid} aria-label="Event details">
            <div className={styles.joinCard} aria-label="Dates">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 2v3M17 2v3M3.5 9h17M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 13.2h3M7.5 16.6h6.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>Date</div>
                <div className={styles.joinValue}>5, 6, 7 Feb 2026</div>
              </div>
            </div>

            <div className={styles.joinCard} aria-label="Venue">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>Venue</div>
                <div className={styles.joinValue}>TINT</div>
              </div>
            </div>

            <div className={styles.joinCard} aria-label="Participants">
              <div className={styles.joinIcon} aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 11a4 4 0 1 0-8 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 21a8 8 0 0 1 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 4a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.joinMeta}>
                <div className={styles.joinLabel}>People</div>
                <div className={styles.joinValue}>600+ students</div>
              </div>
            </div>
          </div>

          <div className={styles.joinFoot}>
            <a className={styles.joinCta} href="#register" aria-label="Register now">
              Register Now
            </a>

            <a
              className={styles.joinBrochure}
              href="https://drive.google.com/file/d/1Ngm8P3nsiJDw_3iuB5nx81Jb_g-drtZL/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              aria-label="Download brochure"
            >
              Download Brochure
            </a>
          </div>
        </section>

        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__title">TINT</div>
              <div className="footer__text">Exuberance — Sports • Spirit • Speed.</div>
            </div>

            <nav className="footer__links" aria-label="Footer">
              <a href="#highlights">Highlights</a>
              <Link href="/">Home</Link>
            </nav>

            <div className="footer__social" aria-label="Social">
              <button className="soc" type="button" aria-label="Social link">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 12.3l2.7 2.7L16.8 8.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="footer__bottom">
            <div>© {new Date().getFullYear()} TINT</div>
            <div className="footer__fine">Built for the night.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
