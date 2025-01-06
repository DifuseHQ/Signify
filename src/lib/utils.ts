import { toPng } from 'html-to-image';
import type { Card } from './types';
import QRCode from 'qrcode';

export async function telemetry(card: Card) {
	try {
		let message = '';
		message += `Company: ${card.company || 'Unknown'} \n`;
		message += `Position: ${card.title || 'Unknown'} \n`;
		message += `Location: ${card.location || 'Unknown'} \n`;
		message += `Website: ${card.website || 'Unknown'} \n`;
		message += `LinkedIn: ${card.linkedIn || 'Unknown'} \n`;
		message += `Twitter: ${card.twitter || 'Unknown'} \n`;

		const data = {
			fname: (card.name.includes(' ') ? card.name.split(' ')[0] : card.name) || card.name,
			lname: card.name.includes(' ') ? card.name.split(' ')[1] : '',
			email: card.email || '',
			phone: card.phone || '',
			reason: 'signify',
			message
		};

		const url =
			window.location.hostname === 'localhost' ? '/api' : 'https://portal.difuse.io/web/contact';

		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	} catch (error) {
		console.error('Failed to send telemetry:', error);
	}
}

export async function downloadSignature(card: Card, type = 'html') {
	telemetry(card);

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

export function generateVCard(card: Card): string {
	function formatName(name: string): string {
		if (name.includes(' ')) {
			const [firstName, ...rest] = name.split(' ');
			const lastName = rest.join(' ');
			return `${lastName};${firstName};;;`;
		}

		return `;${name};;;`;
	}

	return `
  BEGIN:VCARD
  VERSION:4.0
  FN:${card.name}
  N:${formatName(card.name)}
  ORG:${card.company}
  TITLE:${card.title}
  EMAIL:${card.email}
  TEL;TYPE=work,voice:${card.phone}
  URL:${card.websiteLink}
  ADR:${card.location}
  URL;TYPE=LinkedIn:${card.linkedIn}
  URL;TYPE=Twitter:${card.twitter}
  END:VCARD
  `.trim();
}

export async function generateQR(data: string, size: number): Promise<string> {
	const qrCodeOptions = {
		width: size,
		errorCorrectionLevel: 'L',
		type: 'image/png',
		margin: 0
	};

	try {
		const qrCodeDataUri = await QRCode.toDataURL(data, qrCodeOptions);
		return qrCodeDataUri;
	} catch (error) {
		console.error('Failed to generate QR code:', error);
		return '';
	}
}
