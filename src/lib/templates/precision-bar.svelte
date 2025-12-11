<script lang="ts">
	import { getIcons } from '$lib/icon';
	import type { Card } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { extraInputs } from '$lib/extra-inputs.svelte';
	import DIfuseLogo from '$lib/DIfuseLogo.svelte';

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
      style="font-family: Arial, sans-serif;font-size: 13px;color: #111827;width: 500px;background-color: {card.colours.background};line-height: 1.4;margin: 0;padding: 10px 14px;border-radius: 10px;"
    >
      <tbody>
        <tr >
          <td width="70" valign="middle" style="padding-bottom: 10px;padding-right: 10px;">
            {#if card.photos.profile}
              <img
                src={card.photos.profile}
                alt={card.name}
                style="width: 60px; height: 60px; border-radius: 50%; display: block; object-fit: cover;"
              />
            {/if}
          </td>

          <td valign="middle" style="padding-bottom: 10px;padding-right: 20px; border-right: 1px solid {card.colours.primary};">
            <p
              style="margin: 0;font-size: 16px;font-weight: bold;color: {card.colours.primary};white-space: nowrap;"
            >
              {card.name}
            </p>
            <p
              style="
                margin: 2px 0 0;
                font-size: 13px;
                color: {card.colours.text};
                white-space: nowrap;
              "
            >
              {card.title}
            </p>
            <p
              style="margin: 4px 0 0;font-size: 12px;color: {card.colours.text};white-space: nowrap;"
            >
              {card.company}
            </p>
          </td>

          <td valign="middle" style="padding-bottom: 10px;padding-left: 18px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td align="right" style="padding-bottom: 2px;">
                    <table cellpadding="0" cellspacing="0" border="0" align="right">
                      <tbody>
                        <tr>
                          <td style="padding-right: 6px;">
                            <img
                              src={icons['mdi:phone']}
                              width="14"
                              height="14"
                              alt="Phone"
                              style="display:block; border:0;"
                            />
                          </td>
                          <td>
                            <a
                              href={'tel:' + card.phone}
                              style="color:#111827; text-decoration:none; font-size:12px; white-space:nowrap;"
                            >
                              {card.phone}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="right" style="padding-bottom: 2px;">
                    <table cellpadding="0" cellspacing="0" border="0" align="right">
                      <tbody>
                        <tr>
                          <td style="padding-right: 6px;">
                            <img
                              src={icons['lucide:mail']}
                              width="14"
                              height="14"
                              alt="Email"
                              style="display:block; border:0;"
                            />
                          </td>
                          <td>
                            <a
                              href={'mailto:' + card.email}
                              style="color:#111827; text-decoration:none; font-size:12px; white-space:nowrap;"
                            >
                              {card.email}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="right" style="padding-bottom: 2px;">
                    <table cellpadding="0" cellspacing="0" border="0" align="right">
                      <tbody>
                        <tr>
                          <td style="padding-right: 6px;">
                            <img
                              src={icons['mdi:web']}
                              width="14"
                              height="14"
                              alt="Website"
                              style="display:block; border:0;"
                            />
                          </td>
                          <td>
                            <a
                              href={card.websiteLink}
                              style="color:#111827; text-decoration:none; font-size:12px; white-space:nowrap;"
                            >
                              {card.website}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                {#if card.location}
                  <tr>
                    <td align="right">
                      <table cellpadding="0" cellspacing="0" border="0" align="right">
                        <tbody>
                          <tr>
                            <td style="padding-right: 6px;">
                              <img
                                src={icons['mdi:map-marker']}
                                width="14"
                                height="14"
                                alt="Location"
                                style="display:block; border:0;"
                              />
                            </td>
                            <td style="font-size:12px; color:{card.colours.text}; white-space:nowrap;">
                              {card.location}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="3" style="padding-top: 8px; border-top: 1px solid {card.colours.primary};">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td valign="middle">
                    {#each extraInputs.socialInputs as input}
                      <a
                        href={input.value}
                        target="_blank"
                        style="text-decoration:none; border:0; outline:none; display:inline-block; margin-right:6px;"
                      >
                        <img
                          src={icons[input.icon]}
                          alt={input.id}
                          width="16"
                          height="16"
                          style="display:block; border:0;"
                        />
                      </a>
                    {/each}
                  </td>
                  <td valign="middle" align="right">
                    <a
                      href="https://signify.difuse.io/"
                      target="_blank"
                      style="color:{card.colours.primary}; text-decoration:none; font-size:11px; white-space:nowrap;"
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
  {/if}
</div>
