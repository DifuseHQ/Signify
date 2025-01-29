<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mount, onMount } from 'svelte';
	import type { Card, SelectedColors, Template } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { downloadSignature } from '$lib/utils';

	import ColorPicker from 'svelte-awesome-color-picker';
	import ModernStack from '$lib/templates/modern-stack.svelte';
	import CorporateClean from '$lib/templates/corporate-clean.svelte';
	import ElegantMinimal from '$lib/templates/elegant-minimal.svelte';
	import ModernCompact from '$lib/templates/modern-compact.svelte';
	import ProfessionalGrid from '$lib/templates/professional-grid.svelte';
	import { getDefaultCard } from '$lib/generator';
	import { addSocialInput, socialMediaOptions, extraInputs } from '$lib/extra-inputs.svelte';
	import { cropperInputs, processImage, closeCropperModal } from '$lib/cropperUtils.svelte';

	let selectedColors: SelectedColors = $state({
		primary: '#000000',
		text: '#000000',
		background: '#ffffff'
	});

	const templates: { id: Template; label: string }[] = [
		{ id: 'modern-stack', label: 'Modern Stack' },
		{ id: 'corporate-clean', label: 'Corporate Clean' },
		{ id: 'elegant-minimal', label: 'Elegant Minimal' },
		{ id: 'modern-compact', label: 'Modern Compact' },
		{ id: 'professional-grid', label: 'Professional Grid (QR)' }
	];

	let pickerWidth: number = $state(0);
	let hex: string = $state('#000000');
	let selectedColorKey: keyof SelectedColors = $state('primary');
	let dropdown: boolean = $state(false);

	function handleColorChange(newColor: string) {
		selectedColors[selectedColorKey] = newColor;
	}

	const defaultCard = getDefaultCard(selectedColors);
	let card = $state<Card>(defaultCard);
	let imageElement: HTMLImageElement;

	onMount(() => {
		handleColorChange(selectedColors.primary);

		const photos = localStorage.getItem('photos');
		if (photos) {
			card.photos = JSON.parse(photos);
		} else {
			localStorage.setItem('photos', JSON.stringify(card.photos));
		}
	});

	$effect(() => {
		const target = document.getElementById('email-signature-container');
		if (target) {
			target.innerHTML = '';
			switch (card.template) {
				case 'modern-stack':
					mount(ModernStack, { target, props: { card } });
					break;
				case 'corporate-clean':
					mount(CorporateClean, { target, props: { card } });
					break;
				case 'elegant-minimal':
					mount(ElegantMinimal, { target, props: { card } });
					break;
				case 'modern-compact':
					mount(ModernCompact, { target, props: { card } });
					break;
				case 'professional-grid':
					mount(ProfessionalGrid, { target, props: { card } });
					break;
			}
		}
	});

	async function handleImage(type: 'profile' | 'company', source: 'url' | 'file', event?: Event) {
		let blob: Blob;
		try {
			if (source === 'url') {
				const inputUrl = prompt('Please enter a URL:', 'https://');
				if (!inputUrl) return;

				const response = await fetch(inputUrl);
				if (!response.ok) throw new Error('Failed to fetch image');
				blob = await response.blob();
			} else if (source === 'file' && event) {
				const input = event.target as HTMLInputElement;
				const file = input.files?.[0];
				if (!file) return;
				blob = file;
				input.value = '';
			} else {
				throw new Error('Invalid source');
			}

			if (!blob.type.startsWith('image/')) {
				alert('The file must be an image');
				return;
			}

			await processImage(blob, type, imageElement);
		} catch (error) {
			console.error('Error handling image:', error);
			alert('Failed to load image. Please check the input and try again.');
		}
	}

	function getCroppedImage() {
		if (cropperInputs.cropperInstance) {
			cropperInputs.cropperInstance.getCroppedCanvas().toBlob((blob) => {
				if (blob) {
					const reader = new FileReader();
					reader.onload = () => {
						if (cropperInputs.currentImageType === 'profile') {
							card.photos.profile = reader.result as string;
						} else {
							card.photos.company = reader.result as string;
						}
					};
					reader.readAsDataURL(blob);
				}
			}, 'image/jpeg');
		}
		closeCropperModal();
	}

	$effect(() => {
		localStorage.setItem('photos', JSON.stringify(card.photos));
	});

	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest('.dropdown-container')) {
				dropdown = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<a
	class="github-fork-ribbon"
	href="https://github.com/DifuseHQ/Signify"
	data-ribbon="Fork me on GitHub"
	title="Fork me on GitHub">Fork me on GitHub</a
>

<div class="mt-8 bg-gray-50 text-gray-900">
	<div class="container mx-auto px-4">
		<button class="flex flex-row gap-3" onclick={() => (window.location.href = '/')}>
			<img src="/favicon/favicon.ico" alt="favicon" class="h-10 w-10" />
			<h1 class="mt-1 text-2xl font-semibold">Signify</h1>
		</button>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div>
				<div class="mb-6 rounded-lg bg-white p-6 shadow">
					<div class="mb-6 flex flex-col gap-4 md:flex-row">
						<div class="flex w-full flex-grow items-start space-x-4">
							<div
								class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-gray-100"
							>
								{#if card.photos.profile}
									<img src={card.photos.profile} class="h-full w-full object-cover" alt="" />
								{:else}
									<Icon icon="mdi:account-circle" class="h-10 w-10 text-gray-400" />
								{/if}
							</div>
							<div class="flex flex-col space-y-2">
								<label
									class="flex cursor-pointer items-center rounded-lg bg-blue-50 px-4 py-1 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300"
								>
									<Icon icon="mdi:upload" class="mr-2 h-5 w-5" />
									Upload Photo
									<input
										type="file"
										accept="image/*"
										class="hidden"
										onchange={(e) => handleImage('profile', 'file', e)}
									/>
								</label>
								<button
									class="flex items-center rounded-lg border border-gray-300 px-4 py-1 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
									onclick={() => handleImage('profile', 'url')}
								>
									<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
									Add URL
								</button>
							</div>
						</div>

						<div class="flex w-full flex-grow items-start space-x-4">
							<div
								class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-gray-100"
							>
								{#if card.photos.company}
									<img src={card.photos.company} class="h-full w-full object-cover" alt="" />
								{:else}
									<Icon icon="mdi:image-outline" class="h-10 w-10 text-gray-400" />
								{/if}
							</div>
							<div class="flex flex-col space-y-2">
								<label
									class="flex cursor-pointer items-center rounded-lg bg-blue-50 px-4 py-1 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300"
								>
									<Icon icon="mdi:upload" class="mr-2 h-5 w-5" />
									Upload Logo
									<input
										type="file"
										accept="image/*"
										class="hidden"
										onchange={(e) => handleImage('company', 'file', e)}
									/>
								</label>
								<button
									class="flex items-center rounded-lg border border-gray-300 px-4 py-1 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
									onclick={() => handleImage('company', 'url')}
								>
									<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
									Add URL
								</button>
							</div>
						</div>

						<div class="flex items-center space-x-2" title="Add More social media">
							<button
								onclick={() => (extraInputs.showModal = true)}
								class="py- flex w-auto items-center space-x-2 rounded-md px-4 focus:outline-none"
							>
								<Icon icon="simple-line-icons:plus" class="h-6 w-6 text-blue-500" />
							</button>
						</div>
					</div>

					<div
						class={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${!cropperInputs.isOpen ? 'hidden' : ''}`}
					>
						<div class="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
							<div class="mb-4 flex items-center justify-between border-b pb-4">
								<h3 class="text-xl font-semibold text-gray-900">Crop Image</h3>
								<button onclick={closeCropperModal} class="text-gray-500 hover:text-gray-700">
									<Icon icon="mdi:close" class="h-6 w-6" />
								</button>
							</div>

							<div class="relative h-[60vh] min-h-[400px] w-full">
								<!-- svelte-ignore a11y_img_redundant_alt -->
								<img
									bind:this={imageElement}
									src=""
									alt="Image to crop"
									class="max-h-full max-w-full"
								/>
							</div>

							<div class="mt-6 flex justify-end gap-3">
								<button
									onclick={closeCropperModal}
									class="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 md:w-40"
								>
									Cancel
								</button>
								<button
									onclick={getCroppedImage}
									class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 md:w-40"
								>
									Crop
								</button>
							</div>
						</div>
					</div>

					<div>
						<form class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:account" class="text-gray-500" />
								<input
									id="name"
									type="text"
									placeholder="Full Name"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.name}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:badge-account" class="text-gray-500" />
								<input
									id="title"
									type="text"
									placeholder="Job Title"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.title}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:domain" class="text-gray-500" />
								<input
									id="company"
									type="text"
									placeholder="Company"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.company}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:email" class="text-gray-500" />
								<input
									id="email"
									type="email"
									placeholder="Email"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.email}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:phone" class="text-gray-500" />
								<input
									id="phone"
									type="text"
									placeholder="Phone"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.phone}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:web" class="text-gray-500" />
								<input
									id="website"
									placeholder="Website"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.website}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:map-marker" class="text-gray-500" />
								<input
									id="location"
									type="text"
									placeholder="Location"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.location}
								/>
							</div>

							{#if extraInputs.showModal == true}
								<div
									class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
									in:fade={{ duration: 300 }}
									out:fade={{ duration: 300 }}
								>
									<div class="w-96 rounded-lg bg-white p-6">
										<h2 class="mb-2 text-lg font-semibold">Select Social Media</h2>
										<hr class="mb-2 border border-gray-300" />
										<div class="max-h-[300px] space-y-3 overflow-y-auto">
											{#each socialMediaOptions as option}
												<button
													onclick={() => addSocialInput(option)}
													class="flex w-full items-center space-x-2 rounded-md p-2 hover:bg-gray-100
													{extraInputs.socialInputs.some((input) => input.id === option.id)
														? 'bg-blue-50 text-blue-600'
														: ''}"
													disabled={extraInputs.socialInputs.some(
														(input) => input.id === option.id
													)}
												>
													<Icon icon={option.icon} class="text-gray-500" />
													<span>{option.placeholder}</span>
													{#if extraInputs.socialInputs.some((input) => input.id === option.id)}
														<Icon icon="mdi:check-circle" class="ml-auto text-blue-500" />
													{/if}
												</button>
											{/each}
										</div>
										<button
											onclick={() => (extraInputs.showModal = false)}
											class="mt-4 w-full rounded-xl bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-700"
										>
											Cancel
										</button>
									</div>
								</div>
							{/if}

							{#each extraInputs.socialInputs as input, index}
								<div class="flex items-center space-x-2">
									<Icon icon={input.icon} class="text-gray-500" />
									<input
										type="url"
										placeholder={input.placeholder}
										class="w-full rounded-md border border-gray-300 px-3 py-2"
										bind:value={input.value}
									/>
									<button
										onclick={() =>
											(extraInputs.socialInputs = extraInputs.socialInputs.filter(
												(_, i) => i !== index
											))}
										class="text-gray-400 hover:text-red-500"
									>
										<Icon icon="mdi:close-circle" class="h-5 w-5" />
									</button>
								</div>
							{/each}
						</form>
					</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow">
					<div class="">
						<div class="mb-5 flex items-center justify-between">
							<div class="flex items-center space-x-2">
								<Icon icon="lucide:sparkles" class="h-5 w-5 text-indigo-500" />
								<h2 class="text-lg font-semibold">Preview</h2>
							</div>
							<div class="dropdown-container relative inline-block">
								<button
									class="flex rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none"
									onclick={() => (dropdown = !dropdown)}
								>
									Download
								</button>
								<div
									in:fade={{ duration: 300 }}
									out:fade={{ duration: 300 }}
									class={`absolute left-1/2 z-10 mt-2 w-44 origin-top-left -translate-x-1/2 rounded-md border border-gray-200 bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
										dropdown ? 'block' : 'hidden'
									}`}
								>
									<ul class="divide-y divide-gray-300">
										<li>
											<button
												class="w-full cursor-pointer rounded px-4 py-2 text-left hover:bg-gray-200"
												onclick={() => downloadSignature($state.snapshot(card), 'html')}
											>
												Download HTML
											</button>
										</li>
										<li>
											<button
												class=" w-full cursor-pointer rounded px-4 py-2 text-left hover:bg-gray-200"
												onclick={() => downloadSignature($state.snapshot(card), 'png')}
											>
												Download PNG
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="rounded border border-gray-50 p-4" id="preview">
							<div id="email-signature-container"></div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="mb-6 rounded-lg bg-white p-6 shadow">
					<h2 class="mb-4 text-xl font-semibold">Templates</h2>

					<div class="grid grid-cols-2 gap-4">
						{#each templates as { id, label }}
							<button
								class={`transform rounded-xl border border-gray-300 px-4 py-2 transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-50 hover:text-blue-600 ${
									card.template === id ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300' : ''
								} focus:outline-none ${id === 'professional-grid' ? 'col-span-2' : ''}`}
								onclick={() => (card.template = id)}
							>
								{label}
							</button>
						{/each}
					</div>
				</div>

				<div class="mb-6 rounded-lg bg-white p-6 shadow">
					<div class="mb-4 flex items-center space-x-2">
						<Icon icon="lucide:palette" class="h-5 w-5 text-indigo-500" />
						<h2 class="text-lg font-semibold">Colours</h2>
					</div>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<button
							class="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 {selectedColorKey ===
							'primary'
								? 'ring-2 ring-blue-300'
								: ''}"
							onclick={() => (selectedColorKey = 'primary')}
						>
							<span
								class="mr-2 h-4 w-4 rounded-full border-gray-100"
								style="background-color: {selectedColors.primary}"
							></span>
							<span>Primary</span>
						</button>
						<button
							class="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 {selectedColorKey ===
							'text'
								? 'ring-2 ring-blue-300'
								: ''}"
							onclick={() => (selectedColorKey = 'text')}
						>
							<span
								class="mr-2 h-4 w-4 rounded-full border-gray-100"
								style="background-color: {selectedColors.text}"
							></span>
							<span>Text</span>
						</button>
						<button
							class="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 {selectedColorKey ===
							'background'
								? 'ring-2 ring-blue-300'
								: ''}"
							onclick={() => (selectedColorKey = 'background')}
						>
							<span
								class="mr-2 h-4 w-4 rounded-full border-gray-100"
								style="background-color: {selectedColors.background}"
							></span>
							<span>Background</span>
						</button>
					</div>

					<div class="mt-3" bind:clientWidth={pickerWidth}>
						<ColorPicker
							bind:hex
							position="responsive"
							isDialog={false}
							on:input={() => handleColorChange(hex)}
							textInputModes={['hex']}
							--picker-width="{pickerWidth - 60}px"
							--cp-border-color="white"
							--cp-text-color="black"
						/>
					</div>
				</div>

				<a
					href="mailto:hello@difuse.io"
					target="_blank"
					class="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow transition duration-300 hover:bg-gray-100"
				>
					<Icon icon="lucide:mail" class="text-[#1da1f2]" />
					<span>Share Your Feedback via Email</span>
				</a>
			</div>
		</div>

		<p class="mb-1 mt-3 text-center">
			© 2025 Signify - Made with ❤️ by <a
				href="https://difuse.io"
				target="_blank"
				class="text-blue-500 hover:underline">Difuse</a
			>
		</p>

		<p class="text-center">
			<a
				href="https://difuse.io/legal/website/privacy-policy"
				target="_blank"
				class="text-blue-500 hover:underline"
			>
				Privacy Policy
			</a>
		</p>
	</div>
</div>
