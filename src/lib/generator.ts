import { generateSVG } from './icon';

export type Template =
	| 'modern-stack'
	| 'corporate-clean'
	| 'elegant-minimal'
	| 'modern-compact'
	| 'professional-grid';

export interface Card {
	template: Template;
	name: string;
	title: string;
	company: string;
	email: string;
	phone: string;
	website: string;
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
}

export function generateCard(card: Card): string {
	let tailwindHTML = '';
	if (card.template === 'modern-stack') {
		tailwindHTML += `
		<style>
			#email-signature {
				line-height: 1.5;
				-webkit-text-size-adjust: 100%;
				-moz-tab-size: 4;
				tab-size: 4;
				font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
				font-feature-settings: normal;
				font-variation-settings: normal;
				width: 530px;
			}
		</style>
        <div id="email-signature" style="background-color: ${card.colours.background}; padding: 24px; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; align-items: center; gap: 16px;">
                ${
									card.photos.profile
										? `<img src="${card.photos.profile}" alt="${card.name}" style="width: 82px; height: 82px; border-radius: 50%; object-fit: cover;" />`
										: ''
								}
				<div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 1.25rem; line-height: 1.25rem; font-weight: 700; color:${card.colours.primary}">${card.name}</span>
			        <span style="font-size: 0.875rem; line-height: 1.25rem; color:${card.colours.text}">${card.title}</span>
			        <span style="font-size: 0.875rem; line-height: 1.25rem; color:${card.colours.text}">${card.company}</span>
                </div>
            </div>
			<hr style="border: 1px solid #E5E7EB; margin: 12px 0px; width: 65%;"/>
            <div style="display: flex; align-items: center; gap: 16px;">
			${
				card.photos.company
					? `<img src="${card.photos.company}" alt="${card.company}" style="width: 56px; height: 56px; border-radius: 8px; object-fit: cover; border: 2px solid #E5E7EB;" />`
					: ''
			}
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${generateSVG('lucide:mail', '16px', card.colours.primary)}
                        <p style="font-size: 0.875rem; line-height: 1.25rem; color:${card.colours.text}; margin: 0;">${card.email}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${generateSVG('mdi:phone', '16px', card.colours.primary)}
                        <p style="font-size: 0.875rem; line-height: 1.25rem; color:${card.colours.text}; margin: 0;">${card.phone}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${generateSVG('mdi:web', '16px', card.colours.primary)}
                        <p style="font-size: 0.875rem; line-height: 1.25rem; color:${card.colours.text}; margin: 0;">${card.website}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
	}

	return tailwindHTML;
}
