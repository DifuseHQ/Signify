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
		cellspacing=""
		cellpadding="0"
		border="0"
		style="background-color: {card.colours
			.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; border-radius: 8px;"
	>
		<tbody>
			<tr>
				<td width="80" style="padding: 5px;">
					{#if card.photos.profile}
						<img
							src={card.photos.profile}
							alt={card.name}
							style="width: 80px; height: 70px;  border-radius: 50% / 40%; display: block;"
						/>
					{/if}
				</td>

				<td colspan="3">
					<table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 25px;">
						<tbody>
							<tr>
								<td
									style="font-size: 16px; font-weight: bold; color: {card.colours
										.primary};padding-left:10px;"
								>
									{card.name}
								</td>
							</tr>
							<tr>
								<td style="font-size: 14px; color: {card.colours.text};padding-left:10px;">
									{card.title} - {card.company}
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>

			<tr>
				<td width="80" style="padding: 5px;">
					{#if card.photos.company}
						<img
							src={card.photos.company}
							alt="Company Logo"
							style="width: 80px; height: 70px; border-radius: 8px; display: block;"
						/>
					{/if}
				</td>

				<td colspan="3">
					<table
						width="100%"
						cellspacing="0"
						cellpadding="0"
						border="0"
						style="margin-bottom: 40px;"
					>
						<tbody>
							<tr>
								<td style="padding-left:10px;">
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
								<td style="">
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
								<td style="">
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
							</tr>
							<tr>
								<td colspan="3" style="padding-left:9px;">
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
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
{/if}
