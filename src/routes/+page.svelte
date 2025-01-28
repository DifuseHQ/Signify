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
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

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
	let photoUrl = $state('');

	function handleColorChange(newColor: string) {
		selectedColors[selectedColorKey] = newColor;
	}

	async function handleAddUrl(
		type: 'profile' | 'company',
		setImage: (value: string | null) => void
	) {
		const inputUrl = prompt('Please enter a URL:', 'https://');
		if (!inputUrl) return;

		try {
			onImageUpdate = setImage;
			photoUrl = inputUrl;

			const response = await fetch(photoUrl);
			if (!response.ok) throw new Error('Failed to fetch image');

			const blob = await response.blob();
			if (!blob.type.startsWith('image/')) {
				alert('The URL must point to an image file');
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				if (imageElement) {
					if (cropper) {
						cropper.destroy();
						cropper = null;
					}
					imageElement.src = e.target?.result as string;
					imageElement.style.display = 'block';

					setTimeout(() => {
						imageSrc = true;
						cropper = new Cropper(imageElement, {
							aspectRatio: 1,
							viewMode: 3,
							autoCropArea: 1,
							ready() {
								console.log('Cropper is ready');
							}
						});
					}, 50);
				} else {
					console.error('imageElement is undefined');
				}
			};

			reader.readAsDataURL(blob);
		} catch (error) {
			console.error('Error loading image:', error);
			alert('Failed to load image from URL. Please check the URL and try again.');
		}
	}

	const defaultCard = getDefaultCard(selectedColors);
	let card = $state<Card>(defaultCard);

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

	let onImageUpdate: (url: string | null) => void;
	let imageSrc: boolean = $state(false);
	let imageElement: HTMLImageElement;
	let cropper = $state(null);

	function handleImageUpload(event: Event, setImage: (value: string | null) => void) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		console.log('file', file);
		onImageUpdate = setImage;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (imageElement) {
					if (cropper) {
						cropper.destroy();
						cropper = null;
					}

					imageElement.src = e.target?.result as string;
					imageElement.style.display = 'block';

					imageSrc = true;

					setTimeout(() => {
						imageSrc = true;
						cropper = new Cropper(imageElement, {
							aspectRatio: 1,
							viewMode: 3,
							autoCropArea: 1,
							ready() {
								console.log('Cropper is ready');
							}
						});
					}, 50);
				} else {
					console.error('imageElement is undefined');
				}
			};
			reader.readAsDataURL(file);
		}
		input.value = '';
	}

	function getCroppedImage() {
		if (cropper) {
			cropper.getCroppedCanvas().toBlob((blob) => {
				if (blob) {
					const reader = new FileReader();
					reader.onload = () => {
						console.log('onImageUpdate', onImageUpdate);

						onImageUpdate(reader.result as string);
					};
					reader.readAsDataURL(blob);
				}
			}, 'image/jpeg');
		}
		closeModal();
	}

	function closeModal() {
		imageSrc = false;
		if (cropper) {
			cropper.destroy();
			cropper = null;
		}
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

	type SocialInput = {
		id: string;
		icon: string;
		placeholder: string;
		value: string;
	};

	let socialInputs: SocialInput[] = $state([]);
	let showModal: boolean = $state(false);

	const socialMediaOptions = [
		{ id: 'twitter', icon: 'mdi:twitter', placeholder: 'Twitter URL' },
		{ id: 'linkedin', icon: 'mdi:linkedin', placeholder: 'LinkedIn URL' },
		{ id: 'facebook', icon: 'mdi:facebook', placeholder: 'Facebook URL' },
		{ id: 'instagram', icon: 'mdi:instagram', placeholder: 'Instagram URL' }
	];

	function addSocialInput(selectedOption: { id: string; icon: string; placeholder: string }) {
		console.log('selectedOption', selectedOption);

		if (!socialInputs.find((input) => input.id === selectedOption.id)) {
			socialInputs = [
				...socialInputs,
				{
					id: selectedOption.id,
					icon: selectedOption.icon,
					placeholder: selectedOption.placeholder,
					value: ''
				}
			];
		}
		showModal = false;
	}

	function removeSocialInput(index: number) {
		socialInputs = socialInputs.filter((_, i) => i !== index);
	}
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
										onchange={(e) => handleImageUpload(e, (url) => (card.photos.profile = url))}
									/>
								</label>
								<button
									class="flex items-center rounded-lg border border-gray-300 px-4 py-1 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
									onclick={() => handleAddUrl('profile', (url) => (card.photos.profile = url))}
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
										onchange={(e) => handleImageUpload(e, (url) => (card.photos.company = url))}
									/>
								</label>
								<button
									class="flex items-center rounded-lg border border-gray-300 px-4 py-1 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
									onclick={() => handleAddUrl('company', (url) => (card.photos.company = url))}
								>
									<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
									Add URL
								</button>
							</div>
						</div>

						<div class="flex items-center space-x-2" title="Add More social media">
							<button
								onclick={() => (showModal = true)}
								class="py- flex w-auto items-center space-x-2 rounded-md px-4 focus:outline-none"
							>
								<Icon icon="simple-line-icons:plus" class="h-6 w-6 text-blue-500" />
							</button>
						</div>
					</div>

					<div
						class={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${!imageSrc ? 'hidden' : ''}`}
					>
						<div class="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
							<div class="mb-4 flex items-center justify-between border-b pb-4">
								<h3 class="text-xl font-semibold text-gray-900">Crop Image</h3>
								<button onclick={closeModal} class="text-gray-500 hover:text-gray-700">
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
									onclick={closeModal}
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
									type="url"
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
							<!-- <div class="flex items-center space-x-2">
								<Icon icon="mdi:linkedin" class="text-gray-500" />
								<input
									id="linkedIn"
									type="url"
									placeholder="LinkedIn URL"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.linkedIn}
								/>
							</div>
							<div class="flex items-center space-x-2">
								<Icon icon="mdi:twitter" class="text-gray-500" />
								<input
									id="twitter"
									type="url"
									placeholder="Twitter URL"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
									bind:value={card.twitter}
								/>
							</div> -->

							{#if showModal}
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
													{socialInputs.some((input) => input.id === option.id) ? 'bg-blue-50 text-blue-600' : ''}"
													disabled={socialInputs.some((input) => input.id === option.id)}
												>
													<Icon icon={option.icon} class="text-gray-500" />
													<span>{option.placeholder}</span>
													{#if socialInputs.some((input) => input.id === option.id)}
														<Icon icon="mdi:check-circle" class="ml-auto text-blue-500" />
													{/if}
												</button>
											{/each}
										</div>
										<button
											onclick={() => (showModal = false)}
											class="mt-4 w-full rounded-xl bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-700"
										>
											Cancel
										</button>
									</div>
								</div>
							{/if}

							{#each socialInputs as input, index}
								<div class="flex items-center space-x-2">
									<Icon icon={input.icon} class="text-gray-500" />
									<input
										type="url"
										placeholder={input.placeholder}
										class="w-full rounded-md border border-gray-300 px-3 py-2"
										bind:value={input.value}
									/>
									<button
										onclick={() => removeSocialInput(index)}
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
												onclick={() => downloadSignature('html')}
											>
												Download HTML
											</button>
										</li>
										<li>
											<button
												class=" w-full cursor-pointer rounded px-4 py-2 text-left hover:bg-gray-200"
												onclick={() => downloadSignature('png')}
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

		<p class="py-5 text-center">
			© 2025 Signify - Made with ❤️ by <a href="https://difuse.io" target="_blank">Difuse</a>
		</p>
	</div>
</div>
