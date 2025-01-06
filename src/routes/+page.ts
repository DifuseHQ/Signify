import { icons } from '$lib/icon';
import { loadIcons } from '@iconify/svelte';

export function load() {
	loadIcons(icons, function () {
		console.log('Icons loaded');
	});
}
