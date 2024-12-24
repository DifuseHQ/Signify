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
									${
										card.photos.profile
											? `<img src="${card.photos.profile}" alt="${card.name}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />`
											: ''
									}
								</td>
								<td style="vertical-align: middle; padding: 0; padding-left: 8px;">
									<span style="font-size: 1.25rem; font-weight: 700; color:${card.colours.primary};">${card.name}</span><br />
									<span style="font-size: 0.875rem; color:${card.colours.text};">${card.title}</span><br />
									<span style="font-size: 0.875rem; color:${card.colours.text};">${card.company}</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="border-top: 1px solid ${card.colours.primary}; padding: 16px 16px 0;">
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td style="vertical-align: middle; width: 48px;">
									${
										card.photos.company
											? `<img src="${card.photos.company}" alt="Company Logo" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" />`
											: ''
									}
								</td>
								<td style="padding-left: 12px; padding-bottom: 5px;">
									<table style="width: 100%; font-size: 0.875rem; color:${card.colours.text};">
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;">
												<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 2px;" />
												<a href="mailto:${card.email}" style="color: ${card.colours.text}; text-decoration: none; margin-left: 8px;">${card.email}</a>
											</td>
										</tr>
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;">
												<img src="${icons.phone}" alt="Email" style="width: 16px; height: 16px; margin-right: 2px;" />
												<a href="tel:${card.phone}" style="color: ${card.colours.text}; text-decoration: none; margin-left: 8px;">${card.phone}</a>
											</td>
										</tr>
										<tr>
											<td style="padding: 4px 0; display: flex; align-items: center;">
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
			<table id="email-signature"
				style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 550px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0;">
				<tr>
					<td rowspan="2" style="vertical-align: middle; width: 96px;height:96px; padding:10px;">
						${
							card.photos.company
								? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 96px; height: 96px; object-fit: cover" />`
								: ''
						}
					</td>

					<td style=" padding:0px;">
						<table>
							<tr>
								<td>
									<table>
										<tr>
											<td style="vertical-align: middle; width: 64px;height:64px; padding:10px;">
												${
													card.photos.profile
														? `<img src="${card.photos.profile}" alt="${card.name}"
													style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover" />`
														: ''
												}</td>
											<td style="">
												<table>
													<tr>
														<td colspan="2"
															style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};">
															${card.name}</td>
													</tr>
													<tr>
														<td style="font-size: 14px; color: ${card.colours.text}">${card.title}</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>

								<td style="text-align: right; padding: 10px;">
								<table style="width: 100%; border-spacing: 0;">
									<tr>
									<td style="text-align: right;">
										<a target="_blank" href="mailto:${card.email}" 
										style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
										<span style="display: flex; justify-content: flex-end; align-items: center;">
											<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
											${card.email}
										</span>
										</a>
									</td>
									</tr>
									<tr>
									<td style="text-align: right;">
										<a href="tel:${card.phone}" 
										style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
										<span style="display: flex; justify-content: flex-end; align-items: center;">
											<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
											${card.phone}
										</span>
										</a>
									</td>
									</tr>
									<tr>
									<td style="text-align: right;">
										<a target="_blank" href="${card.website}" 
										style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
										<span style="display: flex; justify-content: flex-end; align-items: center;">
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
					<td
						style="font-size: 14px; color: ${card.colours.text}; vertical-align: middle; padding:10px;border-top: 1px solid ${card.colours.primary};">
						${card.company}</td>
					<td style="text-align: right; vertical-align: middle; padding:10px;border-top: 1px solid #e5e7eb"> ${
						card.linkedIn
							? `<a href="${card.linkedIn}"
							style="text-decoration: none; color: ${card.colours.primary}; font-size: 14px;">in</a>`
							: ''
					} ${
						card.twitter
							? `<a href="${card.twitter}"
							style="text-decoration: none; color: ${card.colours.primary}; font-size: 14px; margin-left: 12px;">𝕏</a>`
							: ''
					}</td>
				</tr>
			</table>
			</td>

			</tr>
			</table>
		`;
	} else if (card.template === 'elegant-minimal') {
		tailwindHTML += `
			<table id="email-signature"
				style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 650px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0;">
				<tr>
					<td style="vertical-align: middle; width: 64px;height:64px;">
						${
							card.photos.profile
								? `<img src="${card.photos.profile}" alt="${card.name}"
							style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover;margin-left:20px;margin-top:20px;" />`
								: ''
						}
					</td>
					<td colspan="3">
						<table width="100%">
							<tr>
								<td colspan="2">
									<table width="100%" style="margin-top:30px;">
										<tr>
											<td colspan="2"
												style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};">
												${card.name}</td>
										</tr>
										<tr>
											<td style="font-size: 14px; color: ${card.colours.text}">${card.title} - ${card.company}
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td rowspan="1" style="width: 96px;height:96px; padding:5px;padding-right:8px;">
						${
							card.photos.company
								? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 97px; height: 80px; object-fit: cover; border-radius: 8px;" />`
								: ''
						}
					</td>
					<td colspan="3">
						<table width="100%">
							<tr>
								<td colspan="2">
									<table width="100%" style="margin-bottom:30px;">
										<tr>
											<!-- First cell: left-aligned -->
											<td style="padding: 5px; text-align: left;">
												<a target="_blank" href="mailto:${card.email}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; align-items: center;">
														<img src="${icons.mail}" alt="Email"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.email}
													</span>
												</a>
											</td>
											<td style="padding: 5px; text-align: center;">
												<a href="tel:${card.phone}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: center; align-items: center;">
														<img src="${icons.phone}" alt="Phone"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.phone}
													</span>
												</a>
											</td>
											<td style="padding: 5px; text-align: right;">
												<a target="_blank" href="${card.website}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: flex-end; align-items: center;">
														<img src="${icons.web}" alt="Website"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.website}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td colspan="3"><a target="_blank" href="${card.location}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
													<span style="display: flex; justify-content: flex-start; align-items: center;">
														<img src="${icons.location}" alt="Website"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.location}
													</span>
												</a></td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;
	} else if (card.template === 'modern-compact') {
		tailwindHTML += `

			<table id="email-signature" style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 650px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0;padding: 20px;">

				<tr>
					<td rowspan="2" style="vertical-align: middle; width: 96px;height:96px; padding:5px;padding-right:8px;">
						${
							card.photos.company
								? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 97px; height: 80px; object-fit: cover; border-radius: 8px;" />`
								: ''
						}
					</td>

					<td style="border-left: 1px solid #ddd;padding:2px"></td>


					<td colspan="3">
						<table  width="100%">
							<tr>
								<td style="vertical-align: middle; width: 64px;height:64px; padding:5px;">
									${
										card.photos.profile
											? `<img src="${card.photos.profile}" alt="${card.name}"
										style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover;" />`
											: ''
									}
								</td>
								<td colspan="2">
									<table width="100%">
										<tr>
											<td colspan="2"
												style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};">
												${card.name}</td>
										</tr>
										<tr>
											<td style="font-size: 14px; color: ${card.colours.text}">${card.title} - ${card.company}
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>

					<td style="border-left: 1px solid ${card.colours.primary};padding:5px"></td>

					<td style="text-align: right;padding-left:20px;><a target=" _blank" href="mailto:${card.email}"
						style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
						<span style="display: flex; justify-content: flex-start; align-items: center;">
							<img src="${icons.mail}" alt="Email" style="width: 16px; height: 16px; margin-right: 4px;" />
							${card.email}
						</span>
						</a>
					</td>
					<td style="padding:5px"><a href="tel:${card.phone}"
							style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
							<span style="display: flex; justify-content: flex-start; align-items: center;">
								<img src="${icons.phone}" alt="Phone" style="width: 16px; height: 16px; margin-right: 4px;" />
								${card.phone}
							</span>
						</a></td>
					<td style="padding:5px"><a target="_blank" href="${card.website}"
							style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
							<span style="display: flex; justify-content: flex-start; align-items: center;">
								<img src="${icons.web}" alt="Website" style="width: 16px; height: 16px; margin-right: 4px;" />
								${card.website}
							</span>
						</a></td>
				</tr>
			</table>

		`;
	} else if (card.template === 'professional-grid') {
		tailwindHTML += `
				<table id="email-signature"
				style="background-color: ${card.colours.background}; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 630px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0;padding: 20px;">

				<tr>
					<td rowspan="1" style="vertical-align: middle; width: 80px;height:80px; padding:5px;">
						${
							card.photos.profile
								? `<img src="${card.photos.profile}" alt="${card.name}"
							style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />`
								: ''
						}
					</td>
					<td colspan="3">
						<table width="100%">
							<tr>
								<td colspan="2">
									<table width="100%">
										<tr>
											<td colspan="2"
												style="font-size: 16px; font-weight: bold; color: ${card.colours.primary};">
												${card.name}</td>
										</tr>
										<tr>
											<td style="font-size: 14px; color: ${card.colours.text}">${card.title}
											</td>
										</tr>
										<tr>
											<td style="font-size: 14px; color: ${card.colours.text}">${card.company}
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td rowspan="1" style="width: 64px;height:64px;padding:5px;">
						${
							card.photos.company
								? `<img src="${card.photos.company}" alt="Company Logo"
							style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;" />`
								: ''
						}
					</td>
					<td colspan="3">
						<table width="100%">
							<tr>
								<td>
									<table style="border-top: 1px solid ${card.colours.primary}" width="100%">
										<tr>
											<td style=" text-align: left;">
												<a target="_blank" href="mailto:${card.email}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; align-items: center;">
														<img src="${icons.mail}" alt="Email"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.email}
													</span>
												</a>
											</td>
											<td style="text-align: left;">
												<a href="tel:${card.phone}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; justify-content: center; align-items: center;">
														<img src="${icons.phone}" alt="Phone"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.phone}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td style="text-align: left;">
												<a target="_blank" href="${card.website}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block;">
													<span style="display: flex; align-items: center;">
														<img src="${icons.web}" alt="Website"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.website}
													</span>
												</a>
											</td>
											<td colspan="3"><a target="_blank" href="${card.location}"
													style="color: ${card.colours.text}; text-decoration: none; display: inline-block; text-align: right;">
													<span style="display: flex; align-items: center;">
														<img src="${icons.location}" alt="Website"
															style="width: 16px; height: 16px; margin-right: 4px;" />
														${card.location}
													</span>
												</a></td>
										</tr>
										<tr>
											<td style="text-align: left;"> ${
												card.linkedIn
													? `<a href="${card.linkedIn}"
													style="text-decoration: none; color: ${card.colours.primary}; font-size: 14px;">in</a>`
													: ''
											} ${
												card.twitter
													? `<a href="${card.twitter}"
													style="text-decoration: none; color: ${card.colours.primary}; font-size: 14px; margin-left: 12px;">𝕏</a>`
													: ''
											}</td>
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