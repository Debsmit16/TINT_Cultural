'use client';

import { useEffect, useMemo, useState } from 'react';

function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false;

  // iOS Safari (non-standard)
  if (typeof window.navigator !== 'undefined' && 'standalone' in window.navigator) {
    // @ts-ignore
    if (window.navigator.standalone) return true;
  }

  return window.matchMedia?.('(display-mode: standalone)')?.matches ?? false;
}

export default function PwaInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandaloneDisplayMode());

    const handleBeforeInstallPrompt = (e) => {
      // Allow triggering the prompt from a user gesture later.
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const canInstall = useMemo(() => Boolean(deferredPrompt) && !installed, [deferredPrompt, installed]);

  if (installed) return null;

  const onInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } finally {
      // The prompt can only be used once.
      setDeferredPrompt(null);
    }
  };

  return (
    <section id="install" className="section" aria-label="Install the app">
      <div className="section__head reveal">
        <h2 className="h2">Install the App</h2>
        <p className="muted">Add TINTWeb to your home screen for faster access.</p>
      </div>

      <div className="hero__meta reveal">
        <button type="button" className="btn" onClick={onInstallClick} disabled={!canInstall} aria-disabled={!canInstall}>
          Install
        </button>
      </div>
    </section>
  );
}
