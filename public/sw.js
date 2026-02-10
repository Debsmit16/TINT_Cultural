/* Minimal service worker for offline support */

const CACHE = 'tintweb-v5';
// Important: do NOT precache '/' (HTML) to avoid getting stuck on stale UI after updates.
const CORE = ['/offline.html', '/manifest.webmanifest', '/logos/tint_logo.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE);
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))));
      await self.clients.claim();
    })()
  );
});

function isNavigation(request) {
  return request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first for Next static assets and public assets
  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/logos/');

  if (isStatic) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const res = await fetch(request);
        if (res && res.ok) cache.put(request, res.clone());
        return res;
      })()
    );
    return;
  }

  // Network-only (with offline fallback) for navigations: avoids stale cached HTML.
  if (isNavigation(request)) {
    event.respondWith(
      (async () => {
        try {
          // Bypass the HTTP cache as well.
          return await fetch(request, { cache: 'no-store' });
        } catch {
          const cache = await caches.open(CACHE);
          return (await cache.match('/offline.html'));
        }
      })()
    );
  }
});
