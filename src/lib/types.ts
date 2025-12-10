export interface SelectedColors {
	primary: string;
	text: string;
	background: string;
}

export type Template =
	| 'modern-stack'
	| 'corporate-clean'
	| 'elegant-minimal'
	| 'modern-compact'
	| 'professional-grid'
	| 'corporate-highlight';

export interface Card {
	template: Template;
	name: string;
	title: string;
	company: string;
	email: string;
	phone: string;
	website: string;
	websiteLink: string;
	location: string;
	linkedIn: string;
	twitter: string;
	colours: {
		primary: string;
		text: string;
		background: string;
	};
	photos: {
		profile: string | null;
		company: string | null;
	};
	custom?: {
		corporateHighlight?: {
			photos: {
				company: string | null;
			};
			mobile?: string;
			tollFree: string;
		};
	};
}
