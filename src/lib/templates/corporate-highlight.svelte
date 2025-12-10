<script lang="ts">
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { extraInputs } from '$lib/extra-inputs.svelte';

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
			cellpadding="0"
			cellspacing="0"
			border="0"
			style="font-family:Arial, sans-serif;font-size:13px;color:#333333;width:710px;background-color:{card
				.colours.background};line-height:1.4;margin:0;padding:10px;border-radius:12px;"
		>
			<tbody>
				<tr>
					<td valign="top" style="padding:0 20px 10px 0; width:370px;">
						<table cellpadding="0" cellspacing="0" border="0">
							<tbody>
								<tr>
									<td style="padding-top:5px;">
										{#if card.custom?.corporateHighlight?.photos.company}
											<img
												src={card.custom.corporateHighlight.photos.company}
												alt={card.company}
												style="display:block; border:0; height:157px; width:370px;"
											/>
										{/if}
									</td>
								</tr>

								<tr>
									<td style="padding-top:15px; font-size:11px; color:#666666;">
										<table cellpadding="0" cellspacing="0" border="0" width="100%">
											<tbody>
												<tr>
													<td align="left">
														{#each extraInputs.socialInputs as input}
															<a
																href={input.value}
																target="_blank"
																style="text-decoration:none; border:0; outline:none; display:inline-block; margin-right:20px;"
															>
																<img
																	src={icons[input.icon]}
																	alt={input.id}
																	width="20"
																	height="20"
																	style="display:block; border:0;"
																/>
															</a>
														{/each}
													</td>

													<td align="right" valign="middle">
														<table cellpadding="0" cellspacing="0" border="0">
															<tbody>
																<tr>
																	<td valign="middle" style="padding-right:8px;">
																		<a
																			href={'tel:' +
																				(card.custom?.corporateHighlight?.tollFree || '800-LINUX')}
																			style="text-decoration:none;"
																		>
																			<img
																				src={icons['mdi:phone']}
																				alt="call"
																				width="20"
																				height="20"
																				style="display:block; border:0;"
																			/>
																		</a>
																	</td>
																	<td valign="middle" style="font-size:16px;white-space:nowrap;">
																		{card.custom?.corporateHighlight?.tollFree || '800-LINUX'}
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
					</td>

					<td valign="top" style="padding:0 0 10px 20px;">
						<table cellpadding="0" cellspacing="0" border="0">
							<tbody>
								<tr>
									<td
										style="font-size:30px;font-weight:bold;color:{card.colours
											.primary};padding-bottom:8px;"
									>
										{card.name}
									</td>
								</tr>
								<tr>
									<td
										style="font-size:16px;font-weight:bold;padding-bottom:8px;color:{card.colours
											.text};"
									>
										{card.title}
									</td>
								</tr>

								<tr>
									<td style="font-size:16px;line-height:1.8;color:#000000;">
										<table cellpadding="0" cellspacing="0" border="0">
											<tbody>
												<tr>
													<td style="padding:0 12px 7px 0;">
														<img
															src={icons['mdi:phone']}
															width="20"
															height="20"
															style="display:block; border:0;"
															alt="phone"
														/>
													</td>
													<td style="padding:0 0 7px 0;">
														<a
															href={'tel:' + card.phone}
															style="color:#000000; text-decoration:none;"
														>
															{card.phone}
														</a>
													</td>
												</tr>
											</tbody>
										</table>

										{#if card.custom?.corporateHighlight?.mobile}
											<table cellpadding="0" cellspacing="0" border="0">
												<tbody>
													<tr>
														<td style="padding:0 12px 7px 0;">
															<img
																src={icons['material-symbols:mobile-outline']}
																width="20"
																height="20"
																style="display:block; border:0;"
																alt="mobile"
															/>
														</td>
														<td style="padding:0 0 7px 0;">
															<a
																href={'tel:' + card.custom.corporateHighlight.mobile}
																style="color:#000000; text-decoration:none;"
															>
																{card.custom.corporateHighlight.mobile}
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										{/if}

										<table cellpadding="0" cellspacing="0" border="0">
											<tbody>
												<tr>
													<td style="padding:0 12px 7px 0;">
														<img
															src={icons['lucide:mail']}
															width="20"
															height="20"
															style="display:block; border:0;"
															alt="mail"
														/>
													</td>
													<td style="padding:0 0 7px 0;">
														<a
															href={'mailto:' + card.email}
															style="color:#000000; text-decoration:none;"
														>
															{card.email}
														</a>
													</td>
												</tr>
											</tbody>
										</table>

										<table cellpadding="0" cellspacing="0" border="0">
											<tbody>
												<tr>
													<td style="padding:0 12px 7px 0;">
														<img
															src={icons['mdi:web']}
															width="20"
															height="20"
															style="display:block; border:0;"
															alt="global"
														/>
													</td>
													<td style="padding:0 0 7px 0;">
														<a href={card.websiteLink} style="color:#000000; text-decoration:none;">
															{card.website}
														</a>
													</td>
												</tr>
											</tbody>
										</table>

										<table cellpadding="0" cellspacing="0" border="0">
											<tbody>
												<tr>
													<td style="padding:0 12px 7px 0;">
														<img
															src={icons['mdi:map-marker']}
															width="20"
															height="20"
															style="display:block; border:0;"
															alt="location"
														/>
													</td>
													<td style="padding:0 0 7px 0;">
														<span>
															{card.location}
														</span>
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
