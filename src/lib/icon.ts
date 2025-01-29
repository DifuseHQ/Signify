import { getIcon } from '@iconify/svelte';
import { browser } from '$app/environment';

export async function generateSVG(
	iconName: string,
	size: string = '24px',
	color: string = 'currentColor'
): Promise<string> {
	const fetchIconData = async (): Promise<{ body: string; width: number; height: number }> => {
		let iconData = getIcon(iconName);
		let attempts = 0;
		const maxAttempts = 10;
		const delay = 1000;

		while (!iconData && attempts < maxAttempts) {
			console.warn(`Icon "${iconName}" not found. Attempt ${attempts + 1} of ${maxAttempts}.`);
			await new Promise((resolve) => setTimeout(resolve, delay));
			iconData = getIcon(iconName);
			attempts++;
		}

		if (!iconData) {
			throw new Error(`Icon "${iconName}" not found after ${maxAttempts} attempts.`);
		}

		return iconData;
	};

	const iconData = await fetchIconData();

	const { body, width, height } = iconData;

	const svgTemplate = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 ${width} ${height}"
        fill="${color}">
        ${body}
      </svg>
    `.trim();

	const parser = new DOMParser();
	const doc = parser.parseFromString(svgTemplate, 'image/svg+xml');
	const svgElement = doc.documentElement;

	if (svgElement.nodeName !== 'svg') {
		throw new Error('Invalid SVG data provided.');
	}

	const elementsWithFill = svgElement.querySelectorAll('[fill]');
	elementsWithFill.forEach((el) => {
		if (el.getAttribute('fill') !== 'none') {
			el.removeAttribute('fill');
		}
	});

	const elementsWithStroke = svgElement.querySelectorAll('[stroke]');
	elementsWithStroke.forEach((el) => {
		el.setAttribute('stroke', color);
	});

	const finalSvg = new XMLSerializer().serializeToString(svgElement);

	return finalSvg;
}

export async function svgToPng(svg: string): Promise<string> {
	if (typeof window === 'undefined' || !document || !browser) {
		throw new Error('This function can only run in a browser environment.');
	}

	const encodedSvg = encodeURIComponent(svg);
	const svgBase64 = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

	const img = new Image();
	img.src = svgBase64;

	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = () => reject(new Error('Failed to load SVG as an image.'));
	});

	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Could not get 2D context from canvas.');
	}

	ctx.drawImage(img, 0, 0);

	return canvas.toDataURL('image/png');
}

export async function getIcons(size: string, color: string): Promise<{ [key: string]: string }> {
	const icons = [
		'lucide:mail',
		'mdi:phone',
		'mdi:web',
		'mdi:linkedin',
		'mdi:twitter',
		'mdi:map-marker',
		'mdi:facebook',
		'mdi:instagram'
	];

	const iconData: { [key: string]: string } = {};

	for (const icon of icons) {
		iconData[icon] = await svgToPng(await generateSVG(icon, size, color));
	}

	return iconData;
}
