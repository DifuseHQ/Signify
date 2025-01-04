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
			<table id="email-signature" width="100%" cellspacing="0" cellpadding="0" border="0" 
					style="background-color: ${card.colours.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; border-radius: 8px;">
				<tr>
					<td style="padding: 16px;">
						<table cellspacing="0" cellpadding="0" width="100%">
							<tr>
								<td width="70" style="vertical-align: middle; padding: 0;">
									${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}" 
											style="width: 70px; height: 70px; border-radius: 50%; display: block;" />`
				: ''
			}
								</td>
								<td style="padding-left: 12px;">
									<p style="margin: 0; font-size: 16px; font-weight: bold; color: ${card.colours.primary};white-space: nowrap;">
										${card.name}
									</p>
									<p style="margin: 4px 0 0; font-size: 14px; color: ${card.colours.text};white-space: nowrap;">
										${card.title}
									</p>
									<p style="margin: 0; font-size: 14px; color: ${card.colours.text};white-space: nowrap;">
										${card.company}
									</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="border-top: 1px solid ${card.colours.primary}; padding: 16px;">
						<table cellspacing="0" cellpadding="0" width="100%">
							<tr>
								<!-- Company Logo -->
								<td width="70" style="vertical-align: middle; padding: 0;">
									${card.photos.company
				? `<img src="${card.photos.company}" alt="Company Logo" 
											style="width: 70px; height: 70px; border-radius: 50%; display: block;" />`
				: ''
			}
								</td>
								<td style="padding-left: 12px;">
									<table cellspacing="0" cellpadding="0" width="100%" style="font-size: 14px; color: ${card.colours.text};">
										<tr>
											<td style="padding-bottom: 6px;">
												<a target=" _blank" href="mailto:${card.email}"
												style="color: ${card.colours.text}; text-decoration: none;display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;">
												<span style="display: flex; justify-content: flex-start; align-items: center;">
													<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
													${card.email}
												</span>
											</a>
											</td>
										</tr>
										<tr>
											<td style="padding-bottom: 6px;">
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
				<table id="email-signature" cellspacing="10" cellpadding="0" width="100%" 
			style="background-color: ${card.colours.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; border-radius: 8px;">
    <tr>
        <!-- Company Logo -->
        <td width="96" style="padding: 10px; vertical-align: middle;">
            ${card.photos.company
				? `<img src="${card.photos.company}" alt="Company Logo"
                    style="width: 96px; height: 96px; border-radius: 8px; display: block;" />`
				: ''
			}
        </td>

        <td style="padding: 0;">
            <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                    <td>
                        <table cellspacing="0" cellpadding="0">
                            <tr>
                               <td width="89" style="vertical-align: middle; padding: 5px;">
									${card.photos.profile
				? `<img src="${card.photos.profile}" alt="${card.name}"
											style="width: 86px; height: 80px; border-radius: 50%; display: block;" />`
				: ''
			}
								</td>
                                <td style="vertical-align: middle;">
                                    <p style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};margin:0px;white-space: nowrap;">
                                        ${card.name}
                                    </p>
                                    <p style="font-size: 14px; color: ${card.colours.text};margin:0px;white-space: nowrap;">
                                        ${card.title}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>

                    <td style="text-align: right; padding: 10px;">
                        <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
							 <td style="text-align: right; padding-bottom: 4px;">
                                <a target=" _blank" href="mailto:${card.email}"
									style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.email}
									</span>
								</a>
								</td>
                            </tr>
                            <tr>
                                <td style="text-align: right; padding-bottom: 4px;">
                                    <a href="tel:${card.phone}"
									style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;">
									<span style="display: flex; justify-content: flex-start; align-items: center;">
										<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
										${card.phone}
									</span>
								</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">
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

                <tr>
                    <td style="font-size: 12px; color: ${card.colours.text}; vertical-align: middle; padding: 10px; 
                               border-top: 1px solid ${card.colours.primary};white-space: nowrap;">
                        ${card.company}
                    </td>
                    <td style="text-align: right; border-top: 1px solid ${card.colours.primary}; padding-top: 10px; padding-right: 10px;white-space: nowrap;">
                        <table cellspacing="0" cellpadding="0" style="display: inline-block;">
                            <tr>
                                ${card.linkedIn
				? `<td style="padding-right: 8px;">
                                            <a href="${card.linkedIn}" target="_blank" 
                                                style="text-decoration: none; color: ${card.colours.primary};">
                                                <img src="${icons.linkedin}" alt="LinkedIn" width="16" height="16" />
                                            </a>
                                        </td>`
				: ''
			}
                                ${card.twitter
				? `<td>
                                            <a href="${card.twitter}" target="_blank" 
                                                style="text-decoration: none; color: ${card.colours.primary};">
                                                <img src="${icons.twitter}" alt="Twitter" width="16" height="16" />
                                            </a>
                                        </td>`
				: ''
			}
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
