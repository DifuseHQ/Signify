<script lang="ts">
	import DIfuseLogo from '$lib/DIfuseLogo.svelte';
	import { extraInputs } from '$lib/extra-inputs.svelte';
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { fade } from 'svelte/transition';

	interface Props {
		card: Card;
	}

	let icons: { [key: string]: string } = $state({});
	let { card }: Props = $props();

	$effect(() => {
		getIcons('16px', card.colours.primary).then((data) => {
			icons = data;
		});
	});
</script>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} class="flex justify-center">
	{#if icons && card}
		<table
			id="email-signature"
			cellspacing="10"
			cellpadding="0"
			width="100%"
			style="background-color:{card.colours
				.background}; max-width:580px; font-family:Arial, sans-serif; line-height:1.5; margin:0; border-radius:8px;"
		>
			<tbody>
				<tr>
					<td width="96" align="center" valign="middle" style="padding:10px;">
						{#if card.photos.company}
							<img
								src={card.photos.company}
								alt={card.company}
								style="width:96px; height:80px; border-radius:8px; display:block;"
							/>
						{/if}
					</td>

					<td style="padding:0;">
						<table cellspacing="0" cellpadding="0" width="100%">
							<tbody>
								<tr>
									<td>
										<table cellspacing="0" cellpadding="0">
											<tbody>
												<tr>
													<td width="89" align="center" valign="middle" style="padding:5px;">
														{#if card.photos.profile}
															<img
																src={card.photos.profile}
																alt={card.name}
																style="width:86px; height:80px; border-radius:50%; display:block; object-fit:cover;"
															/>
														{/if}
													</td>
													<td valign="middle">
														<p
															style="font-size:16px; font-weight:bold; color:{card.colours
																.primary}; margin:0; white-space:nowrap;"
														>
															{card.name}
														</p>
														<p
															style="font-size:14px; color:{card.colours
																.text}; margin:0; white-space:nowrap;"
														>
															{card.title}
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>

									<td valign="middle" style="text-align:right; padding:10px 10px 10px 0;">
										<table cellspacing="0" cellpadding="0" align="right">
											<tbody>
												<!-- email -->
												<tr>
													<td style="padding-bottom:4px; text-align:right;">
														<a
															target="_blank"
															href="mailto:{card.email}"
															style="color:{card.colours
																.text}; text-decoration:none; white-space:nowrap;"
														>
															<span style="display:inline-flex; align-items:center;">
																<img
																	src={icons['lucide:mail']}
																	alt="Email"
																	style="width:16px; height:16px; margin-right:4px;"
																/>
																{card.email}
															</span>
														</a>
													</td>
												</tr>

												<!-- phone -->
												<tr>
													<td style="padding-bottom:4px; text-align:right;">
														<a
															href="tel:{card.phone}"
															style="color:{card.colours
																.text}; text-decoration:none; white-space:nowrap;"
														>
															<span style="display:inline-flex; align-items:center;">
																<img
																	src={icons['mdi:phone']}
																	alt="Phone"
																	style="width:16px; height:16px; margin-right:4px;"
																/>
																{card.phone}
															</span>
														</a>
													</td>
												</tr>

												<!-- website -->
												<tr>
													<td style="padding-bottom:4px; text-align:right;">
														<a
															target="_blank"
															href={card.websiteLink}
															style="color:{card.colours
																.text}; text-decoration:none; white-space:nowrap;"
														>
															<span style="display:inline-flex; align-items:center;">
																<img
																	src={icons['mdi:web']}
																	alt="Website"
																	style="width:16px; height:16px; margin-right:4px;"
																/>
																{card.website}
															</span>
														</a>
													</td>
												</tr>

												<!-- socials UNDER website, right-aligned -->
												<tr>
													<td style="text-align:right; padding-top:2px;">
														<table cellspacing="0" cellpadding="0" align="right">
															<tbody>
																<tr>
																	{#each extraInputs.socialInputs as item}
																		<td style="padding-left:4px;">
																			<a
																				href={item.value}
																				target="_blank"
																				style="text-decoration:none;"
																			>
																				<img
																					src={icons[item.icon]}
																					alt={item.id}
																					width="16"
																					height="16"
																					style="vertical-align:middle;"
																				/>
																			</a>
																		</td>
																	{/each}
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="font-size:12px; color:{card.colours
											.text}; vertical-align:middle; padding-top:5px; border-top:1px solid {card
											.colours.primary}; white-space:nowrap;"
									>
										{card.company}
									</td>
									<td
										style="text-align:right; border-top:1px solid {card.colours
											.primary}; white-space:nowrap;"
									>
										<table cellspacing="0" cellpadding="0" style="display:inline-block;">
											<tbody>
												<tr>
													<td style="padding-top: 8px; text-align:right;">
														<a
															href="https://signify.difuse.io/"
															target="_blank"
															style="color:{card.colours
																.text};text-decoration:none;white-space:nowrap;"
														>
															<span style="display:inline-flex; align-items:center;gap: 4px;">
																<DIfuseLogo />
																<span>Create your own signature</span>
															</span>
														</a>
													</td>
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
