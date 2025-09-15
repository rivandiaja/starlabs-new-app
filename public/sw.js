// public/sw.js
self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // Aksi saat notifikasi di-klik (misal: buka website)
    event.waitUntil(clients.openWindow('/'));
});