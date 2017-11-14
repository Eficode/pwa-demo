importScripts('workbox-sw.prod.v2.1.1.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([]);

self.addEventListener('push', (event) => {
  console.log(`[Service Worker] Push Received with data: "${event.data.text()}"`);

  const title = 'Eficode PWA Demo - Push notification';
  const options = {
    body: 'Hello, Efiworld!',
    icon: 'images/eficode.png',
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});


self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://www.eficode.com/')
  );
});

const cacheOneWeekStrategy = workboxSW.strategies.cacheFirst({
  cacheName: 'cdn-cache',
  cacheExpiration: {
    maxEntries: 20,
    maxAgeSeconds: 7 * 24 * 60 * 60, // one week
  },
  cacheableResponse: {
    statuses: [0, 200],
  },
});

workboxSW.router.registerRoute(
  'https://pixabay.com/get/(.*)',
  cacheOneWeekStrategy
);

workboxSW.router.registerRoute(
  'https://pixabay.com/api/*',
  cacheOneWeekStrategy
);

workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  cacheOneWeekStrategy
);

workboxSW.router.registerRoute(
  'https://fonts.gstatic.com/(.*)',
  cacheOneWeekStrategy
);

workboxSW.router.registerRoute(
  '/(.*)',
  workboxSW.strategies.networkFirst()
);
