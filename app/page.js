import FestCards from './components/FestCards.jsx';

export default function Page() {
  return (
    <div className="homeLight">
      {/* Background (static only) */}
      <div className="bg bg--landing" aria-hidden="true">
        <div className="bg__vignette"></div>
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="TINT Home">
          <span
            className="brand__mark"
            aria-hidden="true"
            style={{ width: 'clamp(38px, 4.3vw, 58px)', height: 'clamp(38px, 4.3vw, 58px)' }}
          >
            <img
              src="/logos/tint_logo.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="brand__text" style={{ fontFamily: 'Mokoto, "Space Grotesk", system-ui, sans-serif' }}>
            TINT
          </span>
        </a>

        <div className="year" aria-label="Year" style={{ fontFamily: 'Blanka, Cinzel, serif' }}>
          2026
        </div>
      </header>

      <main id="top" className="page">
        <section className="hero">
          <div className="hero__inner reveal">
            <img
              className="hero__logo"
              src="/logos/tint_logo.png"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            <h1 className="title">
              <span
                className="title__tint title__tint--typewriter"
                data-text="TECHNO INTERNATIONAL NEW TOWN"
              >
                TECHNO INTERNATIONAL NEW TOWN
              </span>
              <span className="title__rest">has it all!!</span>
            </h1>
            <p className="subtitle">A refined celebration of energy, innovation, and culture.</p>
          </div>
        </section>

        <section id="fests" className="section">
          <div className="section__head reveal">
            <h2 className="h2">Let&apos;s Celebrate!</h2>
            <p className="muted">Three signature experiences — each with its own rhythm.</p>
          </div>

          {/* Replaces the previous 3 carousels with overlapped cards */}
          <div className="reveal">
            <FestCards />
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="section__head reveal">
            <h2 className="h2">Gallery</h2>
            <p className="muted">An endless stream of moments — softly in motion.</p>
          </div>

          <div className="marquee reveal" aria-label="Scrolling photo gallery">
            <div className="marquee__row marquee__row--a" data-marquee>
              <div className="marquee__group">
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1520975693411-4a41c3fba63c?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1520975958225-7d11299b6a23?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className="marquee__group" aria-hidden="true">
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1520975693411-4a41c3fba63c?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1520975958225-7d11299b6a23?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>

            <div className="marquee__row marquee__row--b" data-marquee>
              <div className="marquee__group">
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt="Gallery photo"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className="marquee__group" aria-hidden="true">
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                />
                <img
                  alt=""
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__title">TINT</div>
            <div className="footer__text">Sports • Tech • Culture — all in one place.</div>
          </div>

          <nav className="footer__links" aria-label="Footer">
            <a href="#top">Home</a>
            <a href="#fests">Festivals</a>
            <a href="#gallery">Gallery</a>
          </nav>

          <div className="footer__social" aria-label="Social links">
            <a className="soc" href="#" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.7" />
                <path d="M17.5 6.6h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </a>
            <a className="soc" href="#" aria-label="YouTube" title="YouTube">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5 8.2c.3 1.2.3 3.8.3 3.8s0 2.6-.3 3.8c-.2 1-1 1.8-2 2-1.2.3-7.5.3-7.5.3s-6.3 0-7.5-.3c-1-.2-1.8-1-2-2C2 14.6 2 12 2 12s0-2.6.3-3.8c.2-1 1-1.8 2-2C5.5 5.9 12 5.9 12 5.9s6.3 0 7.5.3c1 .2 1.8 1 2 2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path d="M10.2 15.2V8.8l5.6 3.2-5.6 3.2Z" fill="currentColor" />
              </svg>
            </a>
            <a className="soc" href="#" aria-label="X" title="X">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h5l11 16h-5L4 4Z" stroke="currentColor" strokeWidth="1.7" />
                <path d="M20 4 13.5 11" stroke="currentColor" strokeWidth="1.7" />
                <path d="M10.5 13 4 20" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© {new Date().getFullYear()} TINT. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
