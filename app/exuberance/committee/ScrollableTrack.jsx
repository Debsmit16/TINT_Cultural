'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function ScrollableTrack({
  ariaLabel,
  className,
  scrollerClassName,
  children,
  step = 320,
}) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;

    // small tolerance for subpixel/layout rounding
    setCanLeft(left > 2);
    setCanRight(left < maxScrollLeft - 2);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });

    // Keep arrows accurate on resize/content load
    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByDir = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const computedClassName = useMemo(() => {
    return className ? className : '';
  }, [className]);

  return (
    <div className={computedClassName} aria-label={ariaLabel}>
      {canLeft ? (
        <button type="button" aria-label="Scroll left" onClick={() => scrollByDir(-1)} data-track-arrow="left">
          ←
        </button>
      ) : null}

      <div ref={scrollerRef} className={scrollerClassName} aria-label={ariaLabel}>
        {children}
      </div>

      {canRight ? (
        <button type="button" aria-label="Scroll right" onClick={() => scrollByDir(1)} data-track-arrow="right">
          →
        </button>
      ) : null}
    </div>
  );
}
