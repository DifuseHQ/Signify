<script lang="ts">
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		card: Card;
	}

	let icons: { [key: string]: string } = $state({});

	onMount(async () => {
		icons = await getIcons();
	});

	let { card }: Props = $props();
</script>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
	{#if icons && card}
		<table
			id="email-signature"
			cellspacing="10"
			cellpadding="0"
			width="100%"
			style="background-color: {card.colours
				.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; border-radius: 8px;"
		>
			<tbody>
				<tr>
					<td width="96" style="padding: 10px; vertical-align: middle;">
						{#if card.photos.company}
							<img
								src={card.photos.company}
								alt={card.company}
								style="width: 96px; height: 96px; border-radius: 8px; display: block;"
							/>
						{/if}
					</td>

					<td style="padding: 0;">
						<table cellspacing="0" cellpadding="0" width="100%">
							<tbody>
								<tr>
									<td>
										<table cellspacing="0" cellpadding="0">
											<tbody>
												<tr>
													<td width="89" style="vertical-align: middle; padding: 5px;">
														{#if card.photos.profile}
															<img
																src={card.photos.profile}
																alt={card.name}
																style="width: 86px; height: 80px; border-radius: 50%; display: block;"
															/>
														{/if}
													</td>
													<td style="vertical-align: middle;">
														<p
															style="font-size: 16px; font-weight: bold; color: {card.colours
																.primary};margin:0px;white-space: nowrap;"
														>
															{card.name}
														</p>
														<p
															style="font-size: 14px; color: {card.colours
																.text};margin:0px;white-space: nowrap;"
														>
															{card.title}
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>

									<td style="text-align: right; padding: 10px;">
										<table cellspacing="0" cellpadding="0" width="100%">
											<tbody>
												<tr>
													<td style="text-align: right; padding-bottom: 4px;">
														<a
															target=" _blank"
															href="mailto:{card.email}"
															style="color: {card.colours
																.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;"
														>
															<span
																style="display: flex; justify-content: flex-start; align-items: center;"
															>
																<img
																	src={icons['lucide:mail']}
																	alt="Email"
																	style="width: 16px; height: 16px; margin-right: 4px;"
																/>
																{card.email}
															</span>
														</a>
													</td>
												</tr>
												<tr>
													<td style="text-align: right; padding-bottom: 4px;">
														<a
															href="tel:{card.phone}"
															style="color: {card.colours
																.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;"
														>
															<span
																style="display: flex; justify-content: flex-start; align-items: center;"
															>
																<img
																	src={icons['mdi:phone']}
																	alt="Phone"
																	style="width: 16px; height: 16px; margin-right: 4px;"
																/>
																{card.phone}
															</span>
														</a>
													</td>
												</tr>
												<tr>
													<td style="text-align: right;">
														<a
															target="_blank"
															href={card.websiteLink}
															style="color: {card.colours
																.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;"
														>
															<span
																style="display: flex; justify-content: flex-start; align-items: center;"
															>
																<img
																	src={icons['mdi:web']}
																	alt="Website"
																	style="width: 16px; height: 16px; margin-right: 4px;"
																/>
																{card.website}
															</span>
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="font-size: 12px; color: {card.colours
											.text}; vertical-align: middle; padding: 10px; 
                   border-top: 1px solid {card.colours.primary};white-space: nowrap;"
									>
										{card.company}
									</td>
									<td
										style="text-align: right; border-top: 1px solid {card.colours
											.primary}; padding-top: 10px; padding-right: 10px;white-space: nowrap;"
									>
										<table cellspacing="0" cellpadding="0" style="display: inline-block;">
											<tbody>
												<tr>
													{#if card.linkedIn}
														<td style="padding-right: 8px;">
															<a
																href={card.linkedIn}
																target="_blank"
																style="text-decoration: none; color: {card.colours.primary};"
															>
																<img
																	src={icons['mdi:linkedin']}
																	alt="LinkedIn"
																	width="16"
																	height="16"
																/>
															</a>
														</td>
													{/if}
													{#if card.twitter}
														<td>
															<a
																href={card.twitter}
																target="_blank"
																style="text-decoration: none; color: {card.colours.primary};"
															>
																<img
																	src={icons['mdi:twitter']}
																	alt="Twitter"
																	width="16"
																	height="16"
																/>
															</a>
														</td>
													{/if}
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	{/if}
</div>
