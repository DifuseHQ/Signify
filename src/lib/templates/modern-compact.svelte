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
		<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} class="flex justify-center">
			{#if icons && card}
				<table
					id="email-signature"
					width="100%"
					cellspacing="0"
					cellpadding="0"
					border="0"
					style="background-color:{card.colours
						.background};max-width:580px;font-family:Arial, sans-serif;line-height:1.5;margin:0;padding:5px;border-radius:8px;"
				>
					<tbody>
						<tr>
							<td
								rowspan="3"
								width="96"
								style="vertical-align:middle; padding:5px; padding-right:15px;"
							>
								{#if card.photos.company}
									<img
										src={card.photos.company}
										alt="Company Logo"
										style="width:97px; height:80px; border-radius:8px; display:block;"
									/>
								{/if}
							</td>

							<td width="1" style="border-left:1px solid {card.colours.primary}; padding:2px;"></td>

							<td colspan="3">
								<table width="100%" cellpadding="0" cellspacing="0" border="0">
									<tbody>
										<tr>
											<td width="96" style="vertical-align:middle; padding:5px;">
												{#if card.photos.profile}
													<img
														src={card.photos.profile}
														alt={card.name}
														style="width:97px; height:80px; border-radius:50%; display:block;"
													/>
												{/if}
											</td>

											<td colspan="2">
												<table width="100%" cellpadding="0" cellspacing="0" border="0">
													<tbody>
														<tr>
															<td
																colspan="2"
																style="font-size:16px;font-weight:bold;color:{card.colours
																	.primary};white-space:nowrap;"
															>
																{card.name}
															</td>
														</tr>
														<tr>
															<td
																style="font-size:14px;color:{card.colours.text};white-space:nowrap;"
															>
																{card.title} - {card.company}
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

						<tr>
							<td width="1" style="border-left:1px solid {card.colours.primary}; padding:5px;"></td>

							<td style="padding:5px;" colspan="3">
								<table cellpadding="0" cellspacing="0" border="0">
									<tbody>
										<tr>
											<td style="padding-left:3px; padding-right:10px;">
												<a
													target="_blank"
													href={'mailto:' + card.email}
													style="color:{card.colours.text};text-decoration:none;white-space:nowrap;"
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

											<td style="padding-right:10px;">
												<a
													href={'tel:' + card.phone}
													style="color:{card.colours.text};text-decoration:none;white-space:nowrap;"
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

											<td>
												<a
													target="_blank"
													href={card.websiteLink}
													style="color:{card.colours.text};text-decoration:none;white-space:nowrap;"
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
									</tbody>
								</table>
							</td>
						</tr>

						<tr>
							<td width="1" style="border-left:1px solid {card.colours.primary}; padding:2px;"></td>
							<td colspan="3" style="padding:5px 5px 0 5px;">
								<table width="100%" cellpadding="0" cellspacing="0" border="0">
									<tbody>
										<tr>
											<td style="text-align:left; vertical-align:middle;">
												<a
													href="https://signify.difuse.io/"
													target="_blank"
													style="color:{card.colours
														.text}; text-decoration:none; white-space:nowrap;"
												>
													<span style="display:inline-flex; align-items:center; gap:4px;">
														<DIfuseLogo />
														<span>Create your own signature</span>
													</span>
												</a>
											</td>

											<td style="text-align:right; vertical-align:middle; white-space:nowrap;">
												{#each extraInputs.socialInputs as input}
													<a
														href={input.value}
														target="_blank"
														style="text-decoration:none;border:0;outline:none;display:inline-block;margin-left:12px;"
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
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			{/if}
		</div>
	{/if}
</div>
