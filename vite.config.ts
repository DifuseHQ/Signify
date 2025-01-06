import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://portal.difuse.io',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/web/contact')
			}
		}
	}
});
