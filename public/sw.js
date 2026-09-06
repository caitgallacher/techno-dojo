// Minimal service worker foundation. Offline caching of practice audio and
// onboarding assets gets added once those features exist — this just
// registers the app as an installable PWA for now.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
