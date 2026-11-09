// Clean unregistration for any legacy or rogue service worker on this host/port
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      for (const client of clients) {
        client.postMessage({ type: 'SW_UNREGISTERED' });
      }
    })
  );
});

// Pass through all network requests without caching or intercepting RSC streams
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

