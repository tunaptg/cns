const CACHE_NAME = 'can-nong-san-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Cài đặt Service Worker và Lưu cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('PWA: Đang lưu cache các tệp cốt lõi...');
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Kích hoạt Service Worker và dọn dẹp Cache cũ
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('PWA: Xóa cache cũ:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Chiến lược phản hồi: Cache First, Network Fallback
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            return cachedResponse || fetch(e.request).catch(() => {
                // Hỗ trợ offline khi không có mạng và không có cache
                if (e.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
