<script lang="ts">
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { generateQR, generateVCard } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { extraInputs } from '$lib/extra-inputs.svelte';
	import DIfuseLogo from '$lib/DIfuseLogo.svelte';

	interface Props {
		card: Card;
	}

	let icons: { [key: string]: string } = $state({});
	let { card }: Props = $props();
	let qrCode: string = $state('');

	$effect(() => {
		getIcons('16px', card.colours.primary).then((data) => {
			icons = data;
		});

		generateQR(generateVCard(card), 128).then((data) => {
			qrCode = data;
		});
	});
</script>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} class="flex justify-center">
	{#if icons && card}
		<table
			id="email-signature"
			width="100%"
			cellspacing="5"
			cellpadding="0"
			border="0"
			style="background-color:{card.colours
				.background};max-width:580px;font-family:Arial, sans-serif;line-height:1.5;margin:0;padding:5px;border-radius:8px;"
		>
			<tbody>
				<tr>
					<td width="80" style="vertical-align:middle; padding:5px;">
						{#if card.photos.profile}
							<img
								src={card.photos.profile}
								alt={card.name}
								style="width:80px; height:80px; display:block; border-radius:8px;"
							/>
						{/if}
					</td>

					<td colspan="2" style="padding-left:10px;">
						<strong style="font-size:16px;color:{card.colours.primary};white-space:nowrap;">
							{card.name}
						</strong><br />
						<span style="font-size:14px;color:{card.colours.text};white-space:nowrap;">
							{card.title}
						</span><br />
						<span style="font-size:14px;color:{card.colours.text};white-space:nowrap;">
							{card.company}
						</span>
					</td>

					<td width="128" style="text-align:right; padding:5px;">
						{#if qrCode !== ''}
							<img
								src={qrCode}
								alt="QR Code"
								style="width:128px; height:128px; display:block; padding:5px;"
							/>
						{/if}
					</td>
				</tr>
				<tr>
					<td rowspan="2" width="80" style="vertical-align:middle; padding:5px;">
						{#if card.photos.company}
							<img
								src={card.photos.company}
								alt={card.company}
								style="width:80px; height:80px; display:block; border-radius:8px;"
							/>
						{/if}
					</td>

					<td colspan="3" style="padding-top:10px; border-top:1px solid {card.colours.primary};">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr>
									<td style="padding-bottom:5px; padding-left:10px; text-align:left;">
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

									<td
										style="padding-bottom:5px; padding-left:10px; text-align:right;padding-right: 10px;"
									>
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
								</tr>

								<tr>
									<td style="padding-bottom:5px; padding-left:10px; text-align:left;">
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

									<td
										style="padding-bottom:5px; padding-left:10px; text-align:right;padding-right: 10px;"
									>
										<a
											href={card.location}
											target="_blank"
											style="color:{card.colours.text};text-decoration:none;white-space:nowrap;"
										>
											<span style="display:inline-flex; align-items:center;">
												<img
													src={icons['mdi:map-marker']}
													alt="Location"
													width="16"
													height="16"
													style="margin-right:4px;"
												/>
												<span>{card.location}</span>
											</span>
										</a>
									</td>
								</tr>

								<tr>
									<td style="padding-bottom:5px; padding-left:10px; text-align:left;">
										{#each extraInputs.socialInputs as social}
											<a
												href={social.value}
												target="_blank"
												style="text-decoration:none; margin-right:8px; display:inline-block;"
											>
												<img
													src={icons[social.icon]}
													alt={social.id}
													width="16"
													height="16"
													style="vertical-align:middle;"
												/>
											</a>
										{/each}
									</td>

									<td
										style="padding-bottom:5px; padding-left:10px; text-align:right;padding-right: 10px;"
									>
										<a
											href="https://signify.difuse.io/"
											target="_blank"
											style="color:{card.colours.text};text-decoration:none;white-space:nowrap;"
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
	{/if}
</div>
