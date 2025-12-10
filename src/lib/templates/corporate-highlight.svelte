<script lang="ts">
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
			style="background-color:{card.colours.background};width:100%;max-width:680px;
				font-family:Arial, sans-serif;line-height:1.4;margin:0;padding:10px;border-radius:12px;"
		>
			<tbody>
				<tr>
                    <td
                        style="padding:4px 32px 4px 4px;vertical-align:top;
                        {card.custom?.corporateHighlight?.photos.company ? 'width:65%' : 'width:260px'};"
                    >
						<table
							width="100%"
							cellspacing="0"
							cellpadding="0"
							border="0"
							style="background-color:#f4f7fb;border-radius:20px;padding:18px 20px;"
						>
							<tbody>
								<tr>
                                    <td style="vertical-align:middle;">
                                        {#if card.custom?.corporateHighlight?.photos.company}
                                            <img
                                                src={card.custom.corporateHighlight.photos.company}
                                                alt={card.company}
                                                style="max-width:100%;height:auto;display:block;"
                                            />
                                        {/if}
                                    </td>
								</tr>
							</tbody>
						</table>

						<table
							width="100%"
							cellspacing="0"
							cellpadding="0"
							border="0"
							style="margin-top:10px;"
						>
							<tbody>
                                <tr>
                                    <td
                                        style="vertical-align:top;line-height:16px;"
                                    >
                                        {#if card.linkedIn}
                                            <a
                                                href={card.linkedIn}
                                                target="_blank"
                                                style="text-decoration:none;margin-right:8px;display:inline-block;"
                                            >
                                                <img
                                                    src={icons['mdi:linkedin']}
                                                    alt="LinkedIn"
                                                    style="width:16px;height:16px;display:block;"
                                                />
                                            </a>
                                        {/if}
                                        {#if card.twitter}
                                            <a
                                                href={card.twitter}
                                                target="_blank"
                                                style="text-decoration:none;margin-right:8px;display:inline-block;"
                                            >
                                                <img
                                                    src={icons['mdi:twitter']}
                                                    alt="Twitter"
                                                    style="width:16px;height:16px;display:block;"
                                                />
                                            </a>
                                        {/if}
                                        {#if card.websiteLink}
                                            <a
                                                href={card.websiteLink}
                                                target="_blank"
                                                style="text-decoration:none;display:inline-block;"
                                            >
                                                <img
                                                    src={icons['mdi:web']}
                                                    alt="Website"
                                                    style="width:16px;height:16px;display:block;"
                                                />
                                            </a>
                                        {/if}
                                    </td>

                                    <td
                                        style="text-align:right;font-size:11px;color:#333;
                                        vertical-align:top;line-height:16px;"
                                    >
                                        <span style="white-space:nowrap;display:inline-block;">
                                            <img
                                                src={icons['mdi:phone']}
                                                alt="Phone"
                                                style="width:14px;height:14px;margin-right:4px;
                                                display:inline-block;vertical-align:top;"
                                            />
                                            <span style="display:inline-block;vertical-align:top;font-size:11px;font-weight:500;">
                                                {card.custom?.corporateHighlight?.tollFree}
                                            </span>
                                        </span>
                                    </td>
                                </tr>

							</tbody>
						</table>
					</td>

					<!-- RIGHT PANEL -->
					<td style="padding:4px 4px 4px 0;vertical-align:top;">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr>
									<td
										style="font-size:18px;font-weight:600;color:{card.colours.primary};
											padding-bottom:4px;white-space:nowrap;letter-spacing: 0.5px;"
									>
										{card.name}
									</td>
								</tr>
								<tr>
									<td
										style="font-size:13px;font-weight:400;color:{card.colours.text};padding-bottom:16px;white-space:nowrap;letter-spacing: 0.5px;"
									>
										{card.title}
									</td>
								</tr>

								<tr>
									<td
										style="font-size:12px;color:{card.colours.text};
										padding-bottom:8px;white-space:nowrap;"
									>
										<img
											src={icons['lucide:mail']}
											alt="Email"
											style="width:14px;height:14px;margin-right:6px;
											vertical-align:middle;display:inline-block;"
										/>
										<a
											href="mailto:{card.email}"
											style="color:{card.colours.text};text-decoration:none;
											display:inline-block;vertical-align:middle;"
										>
											{card.email}
										</a>
									</td>
								</tr>

                                {#if card.custom?.corporateHighlight?.mobile}
                                    <tr>
                                        <td
                                            style="font-size:12px;color:{card.colours.text};
                                            padding-bottom:8px;white-space:nowrap;"
                                        >
                                            <img
                                                src={icons['material-symbols:mobile-outline']}
                                                alt="Mobile"
                                                style="width:14px;height:14px;margin-right:6px;
                                                vertical-align:middle;display:inline-block;"
                                            />
                                            <a
                                                href="tel:{card.custom.corporateHighlight.mobile}"
                                                style="color:{card.colours.text};text-decoration:none;
                                                display:inline-block;vertical-align:middle;"
                                            >
                                                {card.custom.corporateHighlight.mobile}
                                            </a>
                                        </td>
                                    </tr>
                                {/if}

                                <tr>
									<td
										style="font-size:12px;color:{card.colours.text};
										padding-bottom:8px;white-space:nowrap;"
									>
										<img
											src={icons['mdi:phone']}
											alt="Phone"
											style="width:14px;height:14px;margin-right:6px;
											vertical-align:middle;display:inline-block;"
										/>
										<a
											href="tel:{card.phone}"
											style="color:{card.colours.text};text-decoration:none;
											display:inline-block;vertical-align:middle;"
										>
											{card.phone}
										</a>
									</td>
								</tr>

								<tr>
									<td
										style="font-size:12px;color:{card.colours.text};
										padding-bottom:8px;white-space:nowrap;"
									>
										<img
											src={icons['mdi:web']}
											alt="Website"
											style="width:14px;height:14px;margin-right:6px;
											vertical-align:middle;display:inline-block;"
										/>
										<a
											href={card.websiteLink}
											style="color:{card.colours.text};text-decoration:none;
											display:inline-block;vertical-align:middle;"
										>
											{card.website}
										</a>
									</td>
								</tr>

								<tr>
									<td
										style="font-size:12px;color:{card.colours.text};
										padding-bottom:8px;white-space:nowrap;"
									>
										<img
											src={icons['mdi:map-marker']}
											alt="Website"
											style="width:14px;height:14px;margin-right:6px;
											vertical-align:middle;display:inline-block;"
										/>
										<span
											style="color:{card.colours.text};text-decoration:none;
											display:inline-block;vertical-align:middle;"
										>
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
	{/if}
</div>
