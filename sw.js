/* ADS Activitate zilnica - service worker pentru notificari */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "ADS Activitate", {
    body: d.body || "", tag: d.tag || undefined, renotify: !!d.tag,
    icon: "icon-192.png", badge: "icon-192.png", data: { url: "./" }
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => {
    for (const w of ws) { if ("focus" in w) return w.focus(); }
    return self.clients.openWindow("./");
  }));
});
