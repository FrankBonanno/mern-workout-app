import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4000,
        proxy: {
            '/api': 'https://workout-tracker-fb.onrender.com/',
        },
    },
    plugins: [react()],
    define: {},
});
