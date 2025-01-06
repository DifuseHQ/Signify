import { type Card, type SelectedColors } from './types';

export function getDefaultCard(selectedColors: SelectedColors): Card {
	const hostname = window.location.hostname;
	const card: Card = {
		template: 'professional-grid',
		name: 'Hayzam Sherif',
		title: 'VP - Development',
		company: 'Iridia Solutions Private Limited',
		email: 'hayzam@difuse.io',
		phone: '+91-4973540633',
		website: 'difuse.io',
		websiteLink: 'https://difuse.io',
		location: 'Chennai, India',
		linkedIn: 'https://www.linkedin.com/company/iridiasolutions/',
		twitter: 'https://twitter.com/DifuseHQ',
		colours: selectedColors,
		photos: {
			profile:
				'https://avatars.githubusercontent.com/u/3922884?s=400&u=441b2ae32a36f919fa3dc4bea6ce478f0f42e1fc&v=4',
			company: 'https://downloads-bucket.difuse.io/98e83c79_logo-only.png'
		}
	};

	if (hostname === 'signify.iptechnics.com') {
		card.template = 'professional-grid';
		card.title = 'Open Source Evangelist';
		card.company = 'IP Technics L.L.C';
		card.email = 'hayzam@iptechnics.com';
		card.phone = '+971-4-2142025';
		card.website = 'iptechnics.com';
		card.websiteLink = 'https://iptechnics.com';
		card.location = 'Dubai, UAE';
		card.linkedIn = 'https://www.linkedin.com/company/ip-technics';
		card.twitter = '';
		card.photos.company = 'https://downloads-bucket.difuse.io/9e3293c2_iptechnics-logo.png';
	}

	return card;
}
