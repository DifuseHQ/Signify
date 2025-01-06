import { icons } from '$lib/icon';
import { loadIcons } from '@iconify/svelte';

export const load: unknown = () => {
	loadIcons(icons, function () {
		return {
			icons: 'loaded'
		};
	});
};
