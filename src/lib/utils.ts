import { toPng } from 'html-to-image';

export async function downloadSignature(type = 'html') {
	let signatureContainer;
	if (type === 'html') {
		signatureContainer = document.getElementById('email-signature-container');
	} else if (type === 'png') {
		signatureContainer = document.getElementById('email-signature');
	}

	if (!signatureContainer) return;

	if (type === 'html') {
		const element = document.createElement('a');
		const file = new Blob([signatureContainer.innerHTML], { type: 'text/html' });
		element.href = URL.createObjectURL(file);
		element.download = 'business-card.html';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	} else if (type === 'png') {
		try {
			const dataUrl = await toPng(signatureContainer);
			const link = document.createElement('a');
			link.download = 'business-card.png';
			link.href = dataUrl;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Failed to generate PNG:', error);
		}
	} else {
		console.error('Invalid download type specified. Use "html" or "png".');
	}
}
