import { generateSVG, svgToPng } from './icon';

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

export async function generateCard(card: Card): Promise<string> {
	let tailwindHTML = '';

	const icons = {
		mail: await svgToPng(generateSVG('lucide:mail', '16px', card.colours.primary)),
		phone: await svgToPng(generateSVG('mdi:phone', '16px', card.colours.primary)),
		web: await svgToPng(generateSVG('mdi:web', '16px', card.colours.primary)),
		linkedin: await svgToPng(generateSVG('mdi:linkedin', '16px', card.colours.primary)),
		twitter: await svgToPng(generateSVG('mdi:twitter', '16px', card.colours.primary)),
		location: await svgToPng(generateSVG('mdi:map-marker', '16px', card.colours.primary))
	};

	if (card.template === 'modern-stack') {
		tailwindHTML += `
			<table id="email-signature" style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 530px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0;">
				<tr>
					<td style="padding: 16px;">
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td style="vertical-align: middle; padding: 0; width: 70px;">
									${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />`
				: ''
			}
								</td>
								<td style="padding-left: 12px; padding-bottom: 5px;">
									<span style="font-size: 1.25rem; font-weight: 700; color:${card.colours.primary};white-space: nowrap;">${card.name}</span><br />
									<span style="font-size: 0.875rem; color:${card.colours.text};white-space: nowrap;">${card.title}</span><br />
									<span style="font-size: 0.875rem; color:${card.colours.text};white-space: nowrap;">${card.company}</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="border-top: 1px solid ${card.colours.primary}; padding: 16px 16px 0;">
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td style="vertical-align: middle; padding: 0; width: 70px;">
									${card.photos.company
				? `<img src="${card.photos.company}" alt="Company Logo" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />`
				: ''
			}
								</td>
								<td style="padding-left: 12px; padding-bottom: 5px;">
									<table style="width: 100%; font-size: 0.875rem; color:${card.colours.text};">
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;white-space: nowrap;">
												<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 2px;" />
												<a href="mailto:${card.email}" style="color: ${card.colours.text}; text-decoration: none; margin-left: 8px;">${card.email}</a>
											</td>
										</tr>
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;white-space: nowrap;">
												<img src="${icons.phone}" alt="Email" style="width: 16px; height: 16px; margin-right: 2px;" />
												<a href="tel:${card.phone}" style="color: ${card.colours.text}; text-decoration: none; margin-left: 8px;">${card.phone}</a>
											</td>
										</tr>
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;white-space: nowrap;">
												<img src="${icons.web}" alt="Email" style="width: 16px; height: 16px; margin-right: 2px;" />
												<a href="${card.website}" style="color: ${card.colours.text}; text-decoration: none; margin-left: 8px;">${card.website}</a>
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
	} else if (card.template === 'corporate-clean') {
		tailwindHTML += `
				<table  id="email-signature" cellspacing="0" cellpadding="0" style="background-color: ${card.colours.background}; border-radius: 8px; width: 100%; max-width: 600px;font-family: Arial, sans-serif; line-height: 1.5; margin: 0;">
				<tr>
					  <td style="width: 96px; padding: 16px; vertical-align: middle;">
						${card.photos.company ? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 96px; height: 96px; object-fit: cover; border-radius: 8px;" />` : ''}
					</td>
					<td style="padding: 0px;">
						<table cellspacing="0" cellpadding="0" style="width: 100%;">
							<tr>
								<td>
									 <table cellspacing="0" cellpadding="0">
							<tr>
								<td style="width: 64px; padding-right: 12px;">
								${card.photos.profile ? `<img src="${card.photos.profile}" alt="${card.name}" style="width: 64px; height: 64px; border-radius: 50%; " />` : ''}
								</td>
								<td style="vertical-align: middle;">
									<p style="margin: 0; white-space: nowrap; color: ${card.colours.primary}; font-size: 12px; font-weight: bold;">${card.name}</p>
									<p style="margin: 4px 0 0; color: ${card.colours.text}; white-space: nowrap;font-size: 14px;">${card.title}</p>
								</td>
						</table>
								</td>
								<td style="text-align: right; padding: 10px;">
									<table style="width: 100%; border-spacing: 0;">
										<tr>
											<td style="text-align: right;">
												<a target="_blank" href="mailto:${card.email}" 
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: flex-end; align-items: center;">
														<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;margin-bottom:5px;" />
														${card.email}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td style="text-align: right;">
												<a href="tel:${card.phone}" 
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: flex-end; align-items: center;">
														<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;margin-bottom:5px;" />
														${card.phone}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td style="text-align: right;">
												<a target="_blank" href="${card.website}" 
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: flex-end; align-items: center;">
														<img src="${icons.web}" alt="Website" style="width: 16px; height: 16px; margin-right: 4px;margin-bottom:5px;" />
														${card.website}
													</span>
												</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td style="font-size: 14px; color: ${card.colours.text}; vertical-align: middle; padding: 10px; border-top: 1px solid ${card.colours.primary}; white-space: nowrap;">
									${card.company}
								</td>
								<td style="text-align: right; border-top: 1px solid ${card.colours.primary}; padding-top: 10px; padding-right: 10px;">
								<table cellspacing="0" cellpadding="0" style="display: inline-block;">
									<tr>
										${card.linkedIn ? `<td style="padding-right: 8px;"><a href="${card.linkedIn}" target="_blank"
											style="text-decoration: none; color: ${card.colours.primary};">
											<img src="${icons.linkedin}" alt="LinkedIn" style="width: 16px; height: 16px;" /></a></td>` : ''}
										${card.twitter ? `<td><a href="${card.twitter}" target="_blank"
											style="text-decoration: none; color: ${card.colours.primary}; font-size: 14px;">
											<img src="${icons.twitter}" alt="Twitter" style="width: 16px; height: 16px;" /></a></td>` : ''}
									</tr>
								</table>
							</td>


							</tr>
						</table>
					</td>
				</tr>
			</table>

		`;
	} else if (card.template === 'elegant-minimal') {
		tailwindHTML += `
		<table id="email-signature" width="100%" cellspacing="" cellpadding="0" border="0" 
			style="background-color: ${card.colours.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; border-radius: 8px;">
			<tr>
				<!-- Profile Image -->
				<td width="120"  style="padding: 5px;">
					${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}"
							style="width: 97px; height: 80px;  border-radius: 50% / 40%; display: block;" />`
				: ''
			}
				</td>

				<td colspan="3">
					<table width="100%" cellspacing="0" cellpadding="0" border="0"  style="margin-top: 25px;">
						<tr>
							<td style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};">
								${card.name}
							</td>
						</tr>
						<tr>
							<td style="font-size: 14px; color: ${card.colours.text};">
								${card.title} - ${card.company}
							</td>
						</tr>
					</table>
				</td>
			</tr>

			<tr>
				<!-- Company Logo -->
				<td width="96" style="padding: 5px;">
					${card.photos.company
				? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 97px; height: 80px; border-radius: 8px; display: block;" />`
				: ''
			}
				</td>

				<td colspan="3">
					<table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 40px;">
						<tr>
							<td style="">
							<a target=" _blank" href="mailto:${card.email}"
									style="color: ${card.colours.text}; text-decoration: none;display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.email}
									</span>
								</a>
							</td>
							<td style="">
							<a href="tel:${card.phone}"
									style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.phone}
									</span>
								</a>
							</td>
							<td style="">
								<a target="_blank" href="${card.website}"
									style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.web}" alt="Website" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.website}
									</span>
								</a>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="">
								<a href="${card.location}" target="_blank" style="color: ${card.colours.text}; text-decoration: none;display:flex;">
									<span style="display: flex; justify-content: flex-start; align-items: center;white-space: nowrap;">
										<img src="${icons.location}" alt="Location" width="16" height="16" style="vertical-align: middle;margin-right: 4px;"/> 
											<span>${card.location}</span>
									</span>
								</a>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		`;
	} else if (card.template === 'modern-compact') {
		tailwindHTML += `
			<table id="email-signature" width="100%" cellspacing="0" cellpadding="0" border="0"
				style="background-color: ${card.colours.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 5px;  border-radius: 8px;">
				<tr>
					<td rowspan="2" width="96" style="vertical-align: middle; padding: 5px; padding-right: 15px;">
						${card.photos.company
				? `<img src="${card.photos.company}" alt="Company Logo"
								style="width: 97px; height: 80px; border-radius: 8px; display: block;" />`
				: ''
			}
					</td>

					<td width="1" style="border-left: 1px solid ${card.colours.primary}; padding: 2px;"></td>

					<td colspan="3">
						<table width="100%">
							<tr>
								<td width="96" style="vertical-align: middle; padding: 5px;">
									${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}"
											style="width: 97px; height: 80px; border-radius: 50%; display: block;" />`
				: ''
			}
								</td>

								<td colspan="2">
									<table width="100%">
										<tr>
											<td colspan="2"
												style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};white-space: nowrap;">
												${card.name}
											</td>
										</tr>
										<tr>
											<td style="font-size: 14px; color: ${card.colours.text};white-space: nowrap;">
												${card.title} - ${card.company}
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr>
					<td width="1" style="border-left: 1px solid ${card.colours.primary}; padding: 5px;"></td>

					<td style="padding: 5px;">
						<table cellspacing="0" cellpadding="0" border="0">
							<tr>
								<td style="padding-left:3px">
									<a target=" _blank" href="mailto:${card.email}"
									style="color: ${card.colours.text}; text-decoration: none;display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.email}
									</span>
									</a>
								</td>
								<td >
								<a href="tel:${card.phone}"
										style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
										<span style="display: flex; justify-content: flex-start; align-items: center;">
											<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
											${card.phone}
										</span>
									</a>
								</td>
								<td>
								<a target="_blank" href="${card.website}"
										style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;">
										<span style="display: flex; justify-content: flex-start; align-items: center;">
											<img src="${icons.web}" alt="Website" style="width: 16px; height: 16px; margin-right: 4px;" />
											${card.website}
										</span>
									</a>
								</td>

							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;
	} else if (card.template === 'professional-grid') {
		tailwindHTML += `
				<table id="email-signature" width="100%" cellspacing="5" cellpadding="0" border="0" 
					style="background-color: ${card.colours.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 5px;  border-radius: 8px;">
					<tr>
						<td  width="80" style="vertical-align: middle; padding: 5px;">
							<!-- Profile Image -->
							${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}"
									style="width: 80px; height: 80px; display: block;border-radius:8px" />`
				: ''
			}
						</td>
						<td colspan="2" style="padding-left: 10px;">
							<strong style="font-size: 16px; color: ${card.colours.primary};white-space: nowrap;">${card.name}</strong><br>
							<span style="font-size: 14px; color: ${card.colours.text};white-space: nowrap;">${card.title}</span><br>
							<span style="font-size: 14px; color: ${card.colours.text};white-space: nowrap;">${card.company}</span>
						</td>
					</tr>
					<tr>
					<td rowspan="2" width="80" style="vertical-align: middle; padding: 5px;">
							<!-- Profile Image -->
							${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}"
									style="width: 80px; height: 80px; display: block;border-radius:8px" />`
				: ''
			}
						</td>
						<td colspan="2" style="padding-top: 10px; border-top: 1px solid ${card.colours.primary};">
							<table cellspacing="0" cellpadding="0" border="0" width="100%">
								<tr>
									<td style="padding-bottom: 5px;padding-left:10px">
										<a target=" _blank" href="mailto:${card.email}"
										style="color: ${card.colours.text}; text-decoration: none;display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
										<span style="display: flex; justify-content: flex-start; align-items: center;">
											<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
											${card.email}
										</span>
										</a>
									</td>
									<td style="padding-bottom: 5px;padding-left:10px">
									<a href="tel:${card.phone}"
											style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
											<span style="display: flex; justify-content: flex-start; align-items: center;">
												<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
												${card.phone}
											</span>
										</a>
									</td>
								</tr>
								<tr>
									<td style="padding-bottom: 5px;padding-left:10px">
									<a target="_blank" href="${card.website}"
											style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;">
											<span style="display: flex; justify-content: flex-start; align-items: center;">
												<img src="${icons.web}" alt="Website" style="width: 16px; height: 16px; margin-right: 4px;" />
												${card.website}
											</span>
										</a>
									</td>
									<td style="padding-bottom: 5px;padding-left:10px">
										<a href="${card.location}" target="_blank" style="color: ${card.colours.text}; text-decoration: none;display:flex;">
											<span style="display: flex; justify-content: flex-start; align-items: center;white-space: nowrap;">
												<img src="${icons.location}" alt="Location" width="16" height="16" style="vertical-align: middle;margin-right: 4px;"/> 
												<span>${card.location}</span>
											</span>
										</a>
									</td>
								</tr>
								<tr>
									<td colspan="2" style="padding-bottom:5px;padding-left: 10px;display:flex;">
										${card.linkedIn
				? `<a href="${card.linkedIn}" target="_blank" style="text-decoration: none; margin-right: 10px;">
													<img src="${icons.linkedin}" alt="LinkedIn" width="16" height="16" style="vertical-align: middle;"/>
												</a>`
				: ''
			}
										${card.twitter
				? `<a href="${card.twitter}" target="_blank" style="text-decoration: none;">
													<img src="${icons.twitter}" alt="Twitter" width="16" height="16" style="vertical-align: middle;"/>
												</a>`
				: ''
			}
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
