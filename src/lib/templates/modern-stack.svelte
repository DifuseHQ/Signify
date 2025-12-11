<script lang="ts">
	import DIfuseLogo from '$lib/DIfuseLogo.svelte';
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
			width="100%"
			cellspacing="0"
			cellpadding="0"
			border="0"
			style="background-color:{card.colours
				.background}; max-width:580px; font-family:Arial, sans-serif; line-height:1.5; margin:0; border-radius:8px;"
		>
			<tbody>
				<tr>
					<td style="padding:16px;">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr>
									<td width="70" valign="middle" style="padding:0;">
										{#if card.photos.profile}
											<img
												src={card.photos.profile}
												alt={card.name}
												style="width:70px; height:70px; border-radius:50%; display:block;"
											/>
										{/if}
									</td>
									<td style="padding-left:12px;" valign="middle">
										<p
											style="margin:0; font-size:16px; font-weight:bold; color:{card.colours
												.primary}; white-space:nowrap;"
										>
											{card.name}
										</p>
										<p
											style="margin:4px 0 0; font-size:14px; color:{card.colours
												.text}; white-space:nowrap;"
										>
											{card.title}
										</p>
										<p
											style="margin:0; font-size:14px; color:{card.colours
												.text}; white-space:nowrap;"
										>
											{card.company}
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>

				<tr>
					<td style="border-top:1px solid {card.colours.primary}; padding:16px;">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr>
									<td width="70" valign="middle" style="padding:0;">
										{#if card.photos.company}
											<img
												src={card.photos.company}
												alt="Company Logo"
												style="width:70px; height:70px; border-radius:50%; display:block;"
											/>
										{/if}
									</td>

									<td style="padding-left:12px;" valign="middle">
										<table
											width="100%"
											cellspacing="0"
											cellpadding="0"
											border="0"
											style="font-size:14px; color:{card.colours.text};"
										>
											<tbody>
												<tr>
													<td style="padding-bottom:6px;">
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
												<tr>
													<td style="padding-bottom:6px;">
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
												<tr>
													<td style="padding-bottom:6px;">
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
												<tr>
													<td>
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
