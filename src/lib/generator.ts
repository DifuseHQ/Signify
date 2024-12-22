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
			<table id="email-signature" style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 530px; font-family: Arial, sans-serif; line-height: 1.5;">
				<tr>
					<td style="padding: 24px">
						<table style="width: 100%; border-collapse: collapse">
							<tr>
								<td style="padding-bottom: 16px; display: flex; align-items: center; gap: 16px;">
									${
										card.photos.profile
											? `<img src="${card.photos.profile}" alt="${card.name}" style="width: 82px;height: 82px;border-radius: 50%;object-fit: cover; " />`
											: ''
									}
									<div>
										<span
											style="font-size: 1.25rem; font-weight: 700; color:${card.colours.primary};">${card.name}</span><br />
										<span style="font-size: 0.875rem; color:${card.colours.text};">${card.title}</span><br />
										<span style="font-size: 0.875rem; color:${card.colours.text};">${card.company}</span>
									</div>
								</td>
							</tr>

							<tr>
								<td style="border-top: 1px solid #e5e7eb; padding-top: 16px">
									<table style="width: 100%; font-size: 0.875rem; color:${card.colours.text};">
										<tr>
											<td style="padding: 4px 0;display: flex;align-items: center; gap: 8px; ">
												${generateSVG('lucide:mail', '16px', card.colours.primary)}
												<a href="mailto:${card.email}"
													style="color: ${card.colours.text}; text-decoration: none;">${card.email}</a>
											</td>
										</tr>
										<tr>
											<td style=" padding: 4px 0; display: flex; align-items: center; gap: 8px;">
												${generateSVG('mdi:phone', '16px', card.colours.primary)}
												<a href="tel:${card.phone}"
													style="color: ${card.colours.text}; text-decoration: none;">${card.phone}</a>
											</td>
										</tr>
										<tr>
											<td style=" padding: 4px 0; display: flex; align-items: center; gap: 8px; ">
												${generateSVG('mdi:phone', '16px', card.colours.primary)}
												<a href="${card.website}"
													style="color: ${card.colours.text}; text-decoration: none;">${card.website}</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;
	}

	return tailwindHTML;
}
