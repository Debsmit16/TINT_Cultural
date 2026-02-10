import Link from 'next/link';
import styles from '../Exuberance.module.css';
import localStyles from './Committee.module.css';
import ScrollableTrack from './ScrollableTrack.jsx';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Exuberance Committee | TINTWeb',
  description: 'Committee — Exuberance.',
};

function facultyImgSrcFromFile(fileName) {
  if (!fileName) return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80';
  return `/faculty/${encodeURIComponent(fileName)}`;
}

function committeeImgSrcFromFile(fileName) {
  if (!fileName) return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80';
  return `/committee/${encodeURIComponent(fileName)}`;
}

function displayNameFromFileName(fileName) {
  const base = path.basename(fileName, path.extname(fileName));
  return base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getFacultyFromPublicDir() {
  const dir = path.join(process.cwd(), 'public', 'faculty');
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.heic']);
  const items = files
    .filter((f) => allowed.has(path.extname(f).toLowerCase()))
    .map((fileName) => ({
      fileName,
      name: displayNameFromFileName(fileName),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const normalize = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const featuredNames = ['dr ayan', 'dr soma chatterjee ghosh', 'dr swagata'].map(normalize);
  const priorityRest = ['amlendu', 'taposi', 'rajkumar', 'joy chattaraj', 'srijan dutta', 'saubhik', 'pradipt', 'rajat'].map(
    normalize
  );

  const featured = [];
  const unfeatured = [];
  for (const it of items) {
    const n = normalize(it.name);
    if (featuredNames.some((p) => n.includes(p))) featured.push(it);
    else unfeatured.push(it);
  }

  // Keep featured in the exact requested order
  featured.sort((a, b) => {
    const aIdx = featuredNames.findIndex((p) => normalize(a.name).includes(p));
    const bIdx = featuredNames.findIndex((p) => normalize(b.name).includes(p));
    return aIdx - bIdx;
  });

  const rest = unfeatured
    .slice()
    .sort((a, b) => {
      const an = normalize(a.name);
      const bn = normalize(b.name);
      const aP = priorityRest.findIndex((p) => an.includes(p));
      const bP = priorityRest.findIndex((p) => bn.includes(p));

      const aRank = aP === -1 ? Number.POSITIVE_INFINITY : aP;
      const bRank = bP === -1 ? Number.POSITIVE_INFINITY : bP;
      if (aRank !== bRank) return aRank - bRank;
      return a.name.localeCompare(b.name);
    });

  return { featured, rest };
}

function getCommitteeFromPublicDir() {
  const dir = path.join(process.cwd(), 'public', 'committee');
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.heic']);
  return files
    .filter((f) => allowed.has(path.extname(f).toLowerCase()))
    .map((fileName) => ({
      fileName,
      name: displayNameFromFileName(fileName),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        fill="currentColor"
      />
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
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function CommitteePage() {
  const { featured: facultyFeatured, rest: facultyRest } = getFacultyFromPublicDir();
  const committee = getCommitteeFromPublicDir();
  const splitAt = Math.ceil(facultyRest.length / 2);
  const facultyRestA = facultyRest.slice(0, splitAt);
  const facultyRestB = facultyRest.slice(splitAt);

  return (
    <div className={localStyles.wrap}>
      <div className={localStyles.bgSpecial} aria-hidden="true" />
      {/* Lightweight static background */}
      <div className={styles.staticBg} aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/" aria-label="TINT Home">
          <span className="brand__mark" aria-hidden="true">
            <img
              src="/logos/exuberance_logo.webp"
              alt=""
              width="46"
              height="46"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </span>
          <span className="brand__text" style={{ color: 'cyan' }}>
            EXUBERANCE
          </span>
        </Link>

        <nav className={`${styles.nav} ${styles.subpageNav}`} aria-label="Exuberance navigation">
          <Link href="/exuberance/schedule">Schedule</Link>
          <Link href="/exuberance#awaits">Activities</Link>
          <Link href="/exuberance/sponsors">Sponsors</Link>
          <Link className={styles.navActive} href="/exuberance/committee" aria-current="page">
            Committee
          </Link>
          <Link href="/exuberance/gallery">Gallery</Link>
          <Link href="/exuberance/contact">Contact Us</Link>
          <Link className={styles.cta} href="/exuberance#register">
            Register
          </Link>
        </nav>

        <Link className={styles.momentsCta} href="/exuberance" aria-label="Back to Exuberance">
          Back
          <span className={styles.momentsCtaIcon} aria-hidden="true">
            ←
          </span>
        </Link>
      </header>

      <main className={localStyles.main}>
        <section className={localStyles.section}>
          <h1 className={localStyles.heading}>Meet Our Organisers</h1>

          <h2 className={localStyles.subHeading}>Faculty</h2>
          <ScrollableTrack
            ariaLabel="Faculty carousel"
            className={localStyles.trackWrap}
            scrollerClassName={`${localStyles.track} ${localStyles.facultyTrack}`}
          >
            {facultyFeatured.map((m) => (
              <article key={m.fileName} className={localStyles.card} aria-label={m.name}>
                <div className={localStyles.media}>
                  <img className={localStyles.img} src={facultyImgSrcFromFile(m.fileName)} alt={m.name} loading="lazy" />
                </div>
                <div className={localStyles.meta}>
                  <div className={`${localStyles.name} ${localStyles.facultyName}`}>{m.name}</div>
                </div>
              </article>
            ))}
          </ScrollableTrack>

          <ScrollableTrack
            ariaLabel="Faculty carousel (more faculty 1)"
            className={localStyles.trackWrap}
            scrollerClassName={`${localStyles.track} ${localStyles.facultyTrack}`}
          >
            {facultyRestA.map((m) => (
              <article key={m.fileName} className={localStyles.card} aria-label={m.name}>
                <div className={localStyles.media}>
                  <img className={localStyles.img} src={facultyImgSrcFromFile(m.fileName)} alt={m.name} loading="lazy" />
                </div>
                <div className={localStyles.meta}>
                  <div className={`${localStyles.name} ${localStyles.facultyName}`}>{m.name}</div>
                </div>
              </article>
            ))}
          </ScrollableTrack>

          {facultyRestB.length > 0 ? (
            <ScrollableTrack
              ariaLabel="Faculty carousel (more faculty 2)"
              className={localStyles.trackWrap}
              scrollerClassName={`${localStyles.track} ${localStyles.facultyTrack}`}
            >
              {facultyRestB.map((m) => (
                <article key={m.fileName} className={localStyles.card} aria-label={m.name}>
                  <div className={localStyles.media}>
                    <img className={localStyles.img} src={facultyImgSrcFromFile(m.fileName)} alt={m.name} loading="lazy" />
                  </div>
                  <div className={localStyles.meta}>
                    <div className={`${localStyles.name} ${localStyles.facultyName}`}>{m.name}</div>
                  </div>
                </article>
              ))}
            </ScrollableTrack>
          ) : null}

          <h2 className={localStyles.subHeading}>Student Committee</h2>
          <ScrollableTrack
            ariaLabel="Core committee carousel"
            className={localStyles.trackWrap}
            scrollerClassName={localStyles.track}
          >
            {committee.map((m) => (
              <article key={m.fileName} className={localStyles.card} aria-label={m.name}>
                <div className={localStyles.media}>
                  <img className={localStyles.img} src={committeeImgSrcFromFile(m.fileName)} alt={m.name} loading="lazy" />
                </div>
                <div className={localStyles.meta}>
                  <div className={localStyles.name}>{m.name}</div>
                  <div className={localStyles.role}>Student Committee</div>
                  <div className={localStyles.social} aria-label="Social links">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <LinkedInIcon />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </ScrollableTrack>
        </section>
      </main>
    </div>
  );
}
