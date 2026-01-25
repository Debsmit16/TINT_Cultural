'use client';

import { useEffect } from 'react';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function ClientEffects() {
  useEffect(() => {
    // Enable JS-only behaviors (and JS-gated reveal animation)
    document.documentElement.classList.add('js');

    // PWA: register service worker only for real production hosts.
    // On localhost (even if NODE_ENV=production) we force-disable SW + caches to prevent stale visuals.
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const isProd = process.env.NODE_ENV === 'production';
      const host = window.location.hostname;
      const isLocalHost = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';

      const disableSW = () => {
        navigator.serviceWorker
          .getRegistrations()
          .then((regs) => Promise.all(regs.map((r) => r.unregister())))
          .catch(() => {});

        if ('caches' in window) {
          window.caches
            .keys()
            .then((keys) => Promise.all(keys.map((k) => window.caches.delete(k))))
            .catch(() => {});
        }
      };

      if (isProd && !isLocalHost) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => reg.update())
          .catch(() => {});
      } else {
        disableSW();
      }
    }

    // Cleanup aggregator (important in React dev/Strict Mode)
    const cleanups = [];

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Hero typewriter
    const typeEl = document.querySelector('.title__tint--typewriter');
    if (typeEl) {
      const full = (typeEl.getAttribute('data-text') || typeEl.textContent || '').trim();
      if (full) {
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
          typeEl.textContent = full;
          typeEl.classList.remove('is-typing');
        } else {
          // React dev/Strict Mode can run effects twice; track timers so we don't type twice.
          const timers = new Set();
          let cancelled = false;

          typeEl.textContent = '';
          typeEl.classList.add('is-typing');

          let i = 0;
          const baseDelay = 88;
          const spaceDelay = 34;
          const punctDelay = 190;

          const schedule = (fn, ms) => {
            const id = window.setTimeout(() => {
              timers.delete(id);
              fn();
            }, ms);
            timers.add(id);
          };

          const tick = () => {
            if (cancelled) return;
            const ch = full[i];
            if (ch == null) {
              typeEl.classList.remove('is-typing');
              return;
            }
            typeEl.textContent += ch;
            i++;

            let delay = baseDelay;
            if (ch === ' ') delay += spaceDelay;
            if (ch === '.' || ch === ',' || ch === '!' || ch === '?') delay += punctDelay;
            delay += (Math.random() - 0.5) * 22;

            schedule(tick, Math.max(18, delay));
          };

          schedule(tick, 200);

          cleanups.push(() => {
            cancelled = true;
            timers.forEach((id) => window.clearTimeout(id));
            timers.clear();
          });
        }
      }
    }

    // Reveal-on-scroll
    const revealItems = Array.from(document.querySelectorAll('.reveal'));
    let revealIO;
    if (revealItems.length) {
      if (!('IntersectionObserver' in window)) {
        revealItems.forEach((el) => el.classList.add('is-visible'));
      } else {
        revealIO = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                revealIO.unobserve(e.target);
              }
            }
          },
          { root: null, threshold: 0.12, rootMargin: '60px 0px -10px 0px' }
        );
        revealItems.forEach((el) => revealIO.observe(el));

        requestAnimationFrame(() => {
          for (const el of revealItems) {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.9) el.classList.add('is-visible');
          }
        });
      }
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor__ring');
    const dot = document.querySelector('.cursor__dot');

    let rafCursor = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let dotX = targetX;
    let dotY = targetY;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseOver = (e) => {
      const t = e.target;
      const hoverSel = 'a, button, [role="button"]';
      if (t && t.closest && t.closest(hoverSel)) cursor?.classList.add('is-hover');
    };

    const onMouseOut = (e) => {
      const t = e.target;
      const hoverSel = 'a, button, [role="button"]';
      if (t && t.closest && t.closest(hoverSel)) cursor?.classList.remove('is-hover');
    };

    const onDown = () => cursor?.classList.add('is-down');
    const onUp = () => cursor?.classList.remove('is-down');

    const footer = document.querySelector('.footer');
    const onFooterEnter = () => cursor?.classList.add('is-footer');
    const onFooterLeave = () => cursor?.classList.remove('is-footer');

    if (cursor && ring && dot && !prefersReduced) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('mouseover', onMouseOver, { passive: true });
      window.addEventListener('mouseout', onMouseOut, { passive: true });
      window.addEventListener('mousedown', onDown, { passive: true });
      window.addEventListener('mouseup', onUp, { passive: true });

      if (footer) {
        footer.addEventListener('pointerenter', onFooterEnter, { passive: true });
        footer.addEventListener('pointerleave', onFooterLeave, { passive: true });
        footer.addEventListener('mouseenter', onFooterEnter, { passive: true });
        footer.addEventListener('mouseleave', onFooterLeave, { passive: true });
      }

      const frame = () => {
        ringX = lerp(ringX, targetX, 0.18);
        ringY = lerp(ringY, targetY, 0.18);
        dotX = lerp(dotX, targetX, 0.35);
        dotY = lerp(dotY, targetY, 0.35);

        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        rafCursor = window.requestAnimationFrame(frame);
      };
      rafCursor = window.requestAnimationFrame(frame);
    } else if (cursor && prefersReduced) {
      cursor.style.display = 'none';
      document.body.style.cursor = 'auto';
    }

    // Liquid background
    const canvas = document.getElementById('sky');
    const ctx = canvas?.getContext('2d', { alpha: true });

    let rafLiquid = 0;
    let liquidCleanup;
    if (canvas && ctx) {
      let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      let W = 0;
      let H = 0;
      let gridW = 0;
      let gridH = 0;

      let u, v, u0, v0, d, d0, p, div;

      function alloc() {
        gridW = Math.max(140, Math.floor(W / 9));
        gridH = Math.max(90, Math.floor(H / 9));
        const n = gridW * gridH;
        u = new Float32Array(n);
        v = new Float32Array(n);
        u0 = new Float32Array(n);
        v0 = new Float32Array(n);
        d = new Float32Array(n);
        d0 = new Float32Array(n);
        p = new Float32Array(n);
        div = new Float32Array(n);
      }

      function resize() {
        dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        W = Math.max(1, Math.floor(window.innerWidth * dpr));
        H = Math.max(1, Math.floor(window.innerHeight * dpr));
        canvas.width = W;
        canvas.height = H;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        alloc();
      }

      resize();
      const onLiquidResize = () => resize();
      window.addEventListener('resize', onLiquidResize, { passive: true });

      function idx(x, y) {
        return x + y * gridW;
      }

      function advect(dst, src, uF, vF, dt, dissipation) {
        const w = gridW;
        const h = gridH;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = x + y * w;
            const X = x - dt * uF[i];
            const Y = y - dt * vF[i];

            const x0 = clamp(Math.floor(X), 0, w - 1);
            const y0 = clamp(Math.floor(Y), 0, h - 1);
            const x1 = clamp(x0 + 1, 0, w - 1);
            const y1 = clamp(y0 + 1, 0, h - 1);
            const sx = clamp(X - x0, 0, 1);
            const sy = clamp(Y - y0, 0, 1);

            const i00 = x0 + y0 * w;
            const i10 = x1 + y0 * w;
            const i01 = x0 + y1 * w;
            const i11 = x1 + y1 * w;

            const a = lerp(src[i00], src[i10], sx);
            const b = lerp(src[i01], src[i11], sx);
            dst[i] = lerp(a, b, sy) * dissipation;
          }
        }
      }

      function diffuse(x, x0, diff, iter) {
        const w = gridW;
        const h = gridH;
        const a = diff;
        for (let k = 0; k < iter; k++) {
          for (let y = 1; y < h - 1; y++) {
            for (let x1 = 1; x1 < w - 1; x1++) {
              const i = x1 + y * w;
              x[i] = (x0[i] + a * (x[i - 1] + x[i + 1] + x[i - w] + x[i + w])) / (1 + 4 * a);
            }
          }
        }
      }

      function project(uF, vF, pF, divF, iter) {
        const w = gridW;
        const h = gridH;
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const i = x + y * w;
            divF[i] = -0.5 * (uF[i + 1] - uF[i - 1] + vF[i + w] - vF[i - w]);
            pF[i] = 0;
          }
        }

        for (let k = 0; k < iter; k++) {
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const i = x + y * w;
              pF[i] = (divF[i] + pF[i - 1] + pF[i + 1] + pF[i - w] + pF[i + w]) / 4;
            }
          }
        }

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const i = x + y * w;
            uF[i] -= 0.5 * (pF[i + 1] - pF[i - 1]);
            vF[i] -= 0.5 * (pF[i + w] - pF[i - w]);
          }
        }
      }

      function splat(nx, ny, dx, dy, strength) {
        const x = Math.floor(nx * (gridW - 1));
        const y = Math.floor(ny * (gridH - 1));
        const rad = Math.floor(Math.max(6, Math.min(18, Math.sqrt(dx * dx + dy * dy) * 0.6)));
        const s = strength;

        for (let yy = -rad; yy <= rad; yy++) {
          const yyPos = y + yy;
          if (yyPos < 1 || yyPos >= gridH - 1) continue;
          for (let xx = -rad; xx <= rad; xx++) {
            const xxPos = x + xx;
            if (xxPos < 1 || xxPos >= gridW - 1) continue;
            const r2 = xx * xx + yy * yy;
            const fall = Math.exp(-r2 / (rad * rad));
            const i = idx(xxPos, yyPos);
            u[i] += dx * fall * s;
            v[i] += dy * fall * s;
            d[i] += fall * (0.9 + 0.6 * s);
          }
        }
      }

      const ink = {
        r: 0.03,
        g: 0.06,
        b: 0.16,
        glowR: 0.18,
        glowG: 0.78,
        glowB: 1.0,
      };

      let lastPX = null;
      let lastPY = null;
      let lastMoveT = 0;

      const onPointerMove = (e) => {
        const nx = e.clientX / Math.max(1, window.innerWidth);
        const ny = e.clientY / Math.max(1, window.innerHeight);

        const now = performance.now();
        if (lastPX == null) {
          lastPX = nx;
          lastPY = ny;
          lastMoveT = now;
          return;
        }
        const dx = (nx - lastPX) * 120;
        const dy = (ny - lastPY) * 120;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const s = clamp(speed / 10, 0.1, 1.25);

        splat(nx, ny, dx, dy, s);
        lastPX = nx;
        lastPY = ny;
        lastMoveT = now;
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mousemove', onPointerMove, { passive: true });

      function draw() {
        const img = ctx.createImageData(gridW, gridH);
        const data = img.data;
        for (let i = 0; i < d.length; i++) {
          const dd = clamp(d[i], 0, 1.6);
          const t = clamp((dd - 0.35) / 1.1, 0, 1);
          const r = (ink.r * (1 - t) + ink.glowR * t) * (0.45 + dd * 0.42);
          const g = (ink.g * (1 - t) + ink.glowG * t) * (0.45 + dd * 0.42);
          const b = (ink.b * (1 - t) + ink.glowB * t) * (0.48 + dd * 0.46);

          const o = i * 4;
          data[o + 0] = Math.floor(clamp(r, 0, 1) * 255);
          data[o + 1] = Math.floor(clamp(g, 0, 1) * 255);
          data[o + 2] = Math.floor(clamp(b, 0, 1) * 255);
          data[o + 3] = Math.floor(clamp(0.80 * dd, 0, 0.88) * 255);
        }

        const off = document.createElement('canvas');
        off.width = gridW;
        off.height = gridH;
        const octx = off.getContext('2d');
        octx.putImageData(img, 0, 0);

        ctx.clearRect(0, 0, W, H);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(off, 0, 0, W, H);

        const g1 = ctx.createRadialGradient(W * 0.5, H * 0.25, 0, W * 0.5, H * 0.45, Math.max(W, H) * 0.75);
        g1.addColorStop(0, 'rgba(0,0,0,0)');
        g1.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);
      }

      let lastT = performance.now();
      const step = (t) => {
        const dt = clamp((t - lastT) / 1000, 0.008, 0.022);
        lastT = t;

        const idle = t - lastMoveT > 110;

        u0.set(u);
        v0.set(v);
        d0.set(d);

        diffuse(u, u0, idle ? 0.16 : 0.08, idle ? 12 : 8);
        diffuse(v, v0, idle ? 0.16 : 0.08, idle ? 12 : 8);
        project(u, v, p, div, idle ? 14 : 10);

        u0.set(u);
        v0.set(v);
        advect(u, u0, u0, v0, dt * 38, idle ? 0.985 : 0.992);
        advect(v, v0, u0, v0, dt * 38, idle ? 0.985 : 0.992);
        project(u, v, p, div, idle ? 14 : 10);

        d0.set(d);
        advect(d, d0, u, v, dt * 34, idle ? 0.986 : 0.994);

        const decay = idle ? 0.992 : 0.997;
        for (let i = 0; i < d.length; i++) d[i] *= decay;
        for (let i = 0; i < u.length; i++) {
          u[i] *= idle ? 0.985 : 0.993;
          v[i] *= idle ? 0.985 : 0.993;
        }

        draw();
        rafLiquid = window.requestAnimationFrame(step);
      };

      rafLiquid = window.requestAnimationFrame(step);

      liquidCleanup = () => {
        window.cancelAnimationFrame(rafLiquid);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('resize', onLiquidResize);
      };
    }

    return () => {
      if (revealIO) revealIO.disconnect();

      if (rafCursor) window.cancelAnimationFrame(rafCursor);

      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);

      if (footer) {
        footer.removeEventListener('pointerenter', onFooterEnter);
        footer.removeEventListener('pointerleave', onFooterLeave);
        footer.removeEventListener('mouseenter', onFooterEnter);
        footer.removeEventListener('mouseleave', onFooterLeave);
      }

      if (liquidCleanup) liquidCleanup();

      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
