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
		cellspacing="0"
		cellpadding="0"
		border="0"
		style="background-color: {card.colours
			.background};  width: 100%; max-width: 580px; font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 5px;  border-radius: 8px;"
	>
		<tbody>
			<tr>
				<td
					rowspan="2"
					width="96"
					style="vertical-align: middle; padding: 5px; padding-right: 15px;"
				>
					{#if card.photos.company}
						<img
							src={card.photos.company}
							alt="Company Logo"
							style="width: 97px; height: 80px; border-radius: 8px; display: block;"
						/>
					{/if}
				</td>

				<td width="1" style="border-left: 1px solid {card.colours.primary}; padding: 2px;"></td>

				<td colspan="3">
					<table width="100%">
						<tbody>
							<tr>
								<td width="96" style="vertical-align: middle; padding: 5px;">
									{#if card.photos.profile}
										<img
											src={card.photos.profile}
											alt={card.name}
											style="width: 97px; height: 80px; border-radius: 50%; display: block;"
										/>
									{/if}
								</td>

								<td colspan="2">
									<table width="100%">
										<tbody>
											<tr>
												<td
													colspan="2"
													style="font-size: 16px; font-weight: bold; color: {card.colours
														.primary};white-space: nowrap;"
												>
													{card.name}
												</td>
											</tr>
											<tr>
												<td
													style="font-size: 14px; color: {card.colours.text};white-space: nowrap;"
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
				<td width="1" style="border-left: 1px solid {card.colours.primary}; padding: 5px;"></td>

				<td style="padding: 5px;">
					<table cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td style="padding-left:3px">
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
								<td>
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
								<td>
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
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
{/if}
