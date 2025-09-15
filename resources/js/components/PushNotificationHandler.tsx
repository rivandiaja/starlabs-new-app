import { useEffect } from 'react';

// Ambil VAPID key dari file .env
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Fungsi helper untuk mengubah base64 string ke array buffer
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Fungsi untuk mengambil token CSRF dari meta tag
const getCsrfToken = () => {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
}

export default function PushNotificationHandler() {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window && VAPID_PUBLIC_KEY) {
            navigator.serviceWorker.register('/sw.js').then(swReg => {
                subscribeUser(swReg);
            }).catch(error => {
                console.error('Pendaftaran Service Worker gagal:', error);
            });
        }
    }, []);

    const subscribeUser = (swReg: ServiceWorkerRegistration) => {
        swReg.pushManager.getSubscription().then(subscription => {
            if (subscription === null) {
                // Pengguna belum subscribe, minta izin
                swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                }).then(newSubscription => {
                    sendSubscriptionToBackend(newSubscription);
                });
            } else {
                // Pengguna sudah subscribe, kirim lagi untuk sinkronisasi
                sendSubscriptionToBackend(subscription);
            }
        });
    };

    const sendSubscriptionToBackend = (subscription: PushSubscription) => {
        // Pastikan X-CSRF-TOKEN dikirim dengan benar untuk mengatasi error 419
        return fetch(route('push.store'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify(subscription)
        });
    };

    return null; // Komponen ini tidak menampilkan UI
}