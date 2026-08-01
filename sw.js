const CACHE = "xcde-guide-v4-20260801b";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./data/route-data.js", "./data/world-data.js", "./data/build-data.js", "./data/route-bindings-data.js",
  "./assets/xbcde-logo.png", "./assets/xenoblade-ether-backdrop.png"
];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => {
    const refresh = fetch(event.request).then(response => { if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone())); return response; });
    return cached || refresh.catch(() => caches.match("./index.html"));
  }));
});
