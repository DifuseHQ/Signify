import { getIcon } from '@iconify/svelte';

export function generateSVG(
	iconName: string,
	size: string = '24px',
	color: string = 'currentColor'
): string {
	const iconData = getIcon(iconName);
	if (!iconData) {
		throw new Error(`Icon "${iconName}" not found.`);
	}

	const { body, width, height } = iconData;
	const parser = new DOMParser();
	const doc = parser.parseFromString(`<svg>${body}</svg>`, 'image/svg+xml');
	const elementsWithFill = doc.querySelectorAll('[fill]');

	elementsWithFill.forEach((el) => {
		if (el.getAttribute('fill') !== 'none') {
			el.removeAttribute('fill');
		}
	});

	const elementsWithStroke = doc.querySelectorAll('[stroke]');
	elementsWithStroke.forEach((el) => {
		el.setAttribute('stroke', color);
	});

	const updatedBody = new XMLSerializer().serializeToString(doc.documentElement);

	const svg = `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${size}" 
        height="${size}" 
        viewBox="0 0 ${width} ${height}" 
        fill="${color}">
        ${updatedBody}
      </svg>
    `;

	return svg;
}

// import { getIcon } from '@iconify/svelte';

// export function generateSVG(
// 	iconName: string,
// 	size: string = '24px',
// 	color: string = 'currentColor'
// ): string {
// 	const iconData = getIcon(iconName);
// 	if (!iconData) {
// 		throw new Error(`Icon "${iconName}" not found.`);
// 	}

// 	const { body, width, height } = iconData;
// 	const parser = new DOMParser();
// 	const doc = parser.parseFromString(`<svg>${body}</svg>`, 'image/svg+xml');
// 	const elementsWithFill = doc.querySelectorAll('[fill]');

// 	elementsWithFill.forEach((el) => {
// 		if (el.getAttribute('fill') !== 'none') {
// 			el.removeAttribute('fill');
// 		}
// 	});

// 	const elementsWithStroke = doc.querySelectorAll('[stroke]');
// 	elementsWithStroke.forEach((el) => {
// 		el.setAttribute('stroke', color);
// 	});

// 	const updatedBody = new XMLSerializer().serializeToString(doc.documentElement);

// 	const svg = `
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="${size}"
//         height="${size}"
//         viewBox="0 0 ${width} ${height}"
//         fill="${color}">
//         ${updatedBody}
//       </svg>
//     `;

// 	return svg;
// }
