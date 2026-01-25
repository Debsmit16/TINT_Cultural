'use client';

import { useEffect, useRef } from 'react';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function SportBg({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (prefersReduced) return;
    }

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Adjustable speed multiplier (1 = default). Keeping as a local constant avoids changing any other code.
    const SPEED = 1;

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0;
    let height = 0;
    let raf = 0;

    let spacing = 80; // world units between grid lines
    let xLines = 30;
    let zLines = 34;

    const state = {
      lastTime: performance.now(),
      zOff: 0,
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildGrid();
    }

    function rebuildGrid() {
      // Bigger boxes + fewer lines for a prominent, lightweight single sheet.
      spacing = clamp(Math.min(width, height) * 0.14, 56, 120);
      xLines = clamp(Math.floor(width / spacing) + 8, 16, 34);
      zLines = clamp(Math.floor(height / spacing) + 10, 18, 40);
    }

    function project(x, z, vanX, vanY, yBottom) {
      // Simple first-person perspective on a flat plane.
      // z > 0 is forward; nearer lines (smaller z) appear lower and wider.
      const k = 520; // perspective strength
      const f = k / (z + k);
      // Far (f→0) -> horizon; Near (f→1) -> bottom.
      const y = lerp(vanY, yBottom, f);
      const xProj = lerp(vanX, x, f);
      return { x: xProj, y, f };
    }

    function draw() {
      const now = performance.now();
      const dt = clamp((now - state.lastTime) / 1000, 0.001, 0.05);
      state.lastTime = now;

      // Infinite scroll toward viewer.
      const worldSpeed = 220 * SPEED;
      state.zOff = (state.zOff + worldSpeed * dt) % spacing;

      // Black background.
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, width, height);

      // Cyan grid.
      const cx = width * 0.5;
      const vanY = height * 0.42;
      const yBottom = height + 2;
      const vanX = cx;

      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'rgba(0,220,255,0.44)';
      ctx.shadowColor = 'rgba(0,220,255,0.70)';
      ctx.shadowBlur = 14;

      const xPad = width * 0.08;
      const xMin = -xPad;
      const xMax = width + xPad;

      // Horizontal lines.
      for (let i = 0; i < zLines; i++) {
        const z = (i + 1) * spacing - state.zOff; // decreases -> moves toward viewer
        const zz = z <= 1 ? 1 : z;
        const left = project(xMin, zz, vanX, vanY, yBottom);
        const right = project(xMax, zz, vanX, vanY, yBottom);

        const near = left.f;
        ctx.globalAlpha = 0.18 + near * 0.62;
        ctx.lineWidth = 1.2 + near * 2.6;
        ctx.beginPath();
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
      }

      // Vertical lines.
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 1.2;
      for (let j = 0; j < xLines; j++) {
        const u = xLines <= 1 ? 0.5 : j / (xLines - 1);
        const xb = lerp(xMin, xMax, u);
        ctx.beginPath();
        ctx.moveTo(xb, yBottom);
        ctx.lineTo(vanX, vanY);
        ctx.stroke();
      }

      raf = window.requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const onResize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      resize();
    };

    window.addEventListener('resize', onResize, { passive: true });

    resize();
    raf = window.requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
      } else {
        raf = window.requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', onVis);

    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}
