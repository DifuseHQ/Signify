<script lang="ts">
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		card: Card;
	}

	let icons: { [key: string]: string } = $state({});

	onMount(async () => {
		icons = await getIcons();
	});

	let { card }: Props = $props();
</script>

{#if icons && card}
	<table
		id="email-signature"
		width="100%"
		cellspacing="5"
		cellpadding="0"
		border="0"
		style="background-color: {card.colours
			.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 5px;  border-radius: 8px;"
	>
		<tbody>
			<tr>
				<td width="80" style="vertical-align: middle; padding: 5px;">
					{#if card.photos.profile}
						<img
							src={card.photos.profile}
							alt={card.name}
							style="width: 80px; height: 80px; display: block;border-radius:8px"
						/>
					{/if}
				</td>
				<td colspan="2" style="padding-left: 10px;">
					<strong style="font-size: 16px; color: {card.colours.primary};white-space: nowrap;"
						>{card.name}</strong
					><br />
					<span style="font-size: 14px; color: {card.colours.text};white-space: nowrap;"
						>{card.title}</span
					><br />
					<span style="font-size: 14px; color: {card.colours.text};white-space: nowrap;"
						>{card.company}</span
					>
				</td>
			</tr>
			<tr>
				<td rowspan="2" width="80" style="vertical-align: middle; padding: 5px;">
					{#if card.photos.company}
						<img
							src={card.photos.company}
							alt={card.company}
							style="width: 80px; height: 80px; display: block;border-radius:8px"
						/>
					{/if}
				</td>
				<td colspan="2" style="padding-top: 10px; border-top: 1px solid {card.colours.primary};">
					<table cellspacing="0" cellpadding="0" border="0" width="100%">
						<tbody>
							<tr>
								<td style="padding-bottom: 5px;padding-left:10px">
									<a
										target=" _blank"
										href="mailto:{card.email}"
										style="color: {card.colours
											.text}; text-decoration: none;display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;"
									>
										<span style="display: flex; justify-content: flex-start; align-items: center;">
											<img
												src={icons['lucide:mail']}
												alt="Email"
												style="width: 16px; height: 16px; margin-right: 4px;"
											/>
											{card.email}
										</span>
									</a>
								</td>
								<td style="padding-bottom: 5px;padding-left:10px">
									<a
										href="tel:{card.phone}"
										style="color: {card.colours
											.text}; text-decoration: none; display: inline-block; text-align: right;margin-right:20px;white-space: nowrap;"
									>
										<span style="display: flex; justify-content: flex-start; align-items: center;">
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
								<td style="padding-bottom: 5px;padding-left:10px">
									<a
										target="_blank"
										href={card.websiteLink}
										style="color: {card.colours
											.text}; text-decoration: none; display: inline-block; text-align: right;white-space: nowrap;"
									>
										<span style="display: flex; justify-content: flex-start; align-items: center;">
											<img
												src={icons['mdi:web']}
												alt="Website"
												style="width: 16px; height: 16px; margin-right: 4px;"
											/>
											{card.website}
										</span>
									</a>
								</td>
								<td style="padding-bottom: 5px;padding-left:10px">
									<a
										href={card.location}
										target="_blank"
										style="color: {card.colours.text}; text-decoration: none;display:flex;"
									>
										<span
											style="display: flex; justify-content: flex-start; align-items: center;white-space: nowrap;"
										>
											<img
												src={icons['mdi:map-marker']}
												alt="Location"
												width="16"
												height="16"
												style="vertical-align: middle;margin-right: 4px;"
											/>
											<span>{card.location}</span>
										</span>
									</a>
								</td>
							</tr>
							<tr>
								<td colspan="2" style="padding-bottom:5px;padding-left: 10px;display:flex;">
									{#if card.linkedIn}
										<a
											href={card.linkedIn}
											target="_blank"
											style="text-decoration: none; margin-right: 10px;"
										>
											<img
												src={icons['mdi:linkedin']}
												alt="LinkedIn"
												width="16"
												height="16"
												style="vertical-align: middle;"
											/>
										</a>
									{/if}
									{#if card.twitter}
										<a href={card.twitter} target="_blank" style="text-decoration: none;">
											<img
												src={icons['mdi:twitter']}
												alt="Twitter"
												width="16"
												height="16"
												style="vertical-align: middle;"
											/>
										</a>
									{/if}
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
{/if}
