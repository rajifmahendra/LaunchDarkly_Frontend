import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Izinkan akses dari jaringan lain
        port: 5173, // Pastikan ini sesuai dengan yang digunakan
        strictPort: true,
        hmr: {
            clientPort: 443, // Untuk ngrok agar bisa bekerja di HTTPS
        },
        allowedHosts: [
            '.ngrok.io',  // Jika menggunakan subdomain ngrok lama
            '.ngrok-free.app'  // Jika menggunakan domain ngrok baru
        ],
    },
});
