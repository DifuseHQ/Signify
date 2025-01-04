<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mount, onMount } from 'svelte';
	import type { Card, Template } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { downloadSignature } from '$lib/utils';

	import ColorPicker from 'svelte-awesome-color-picker';
	import ModernStack from '$lib/templates/modern-stack.svelte';
	import CorporateClean from '$lib/templates/corporate-clean.svelte';
	import ElegantMinimal from '$lib/templates/elegant-minimal.svelte';
	import ModernCompact from '$lib/templates/modern-compact.svelte';
	import ProfessionalGrid from '$lib/templates/professional-grid.svelte';

	interface SelectedColors {
		primary: string;
		text: string;
		background: string;
	}

	let selectedColors: SelectedColors = $state({
		primary: '#031159',
		text: '#39447c',
		background: '#f4f5fa'
	});

	const templates: { id: Template; label: string }[] = [
		{ id: 'modern-stack', label: 'Modern Stack' },
		{ id: 'corporate-clean', label: 'Corporate Clean' },
		{ id: 'elegant-minimal', label: 'Elegant Minimal' },
		{ id: 'modern-compact', label: 'Modern Compact' },
		{ id: 'professional-grid', label: 'Professional Grid' }
	];

	let pickerWidth: number = $state(0);
	let hex: string = $state('#031159');
	let selectedColorKey: keyof SelectedColors = $state('primary');
	let dropdown: boolean = $state(false);
	let photoUrl = $state('');

	function handleColorChange(newColor: string) {
		selectedColors[selectedColorKey] = newColor;
	}

	onMount(() => {
		handleColorChange(selectedColors.primary);
	});

	async function handleAddUrl(type: 'profile' | 'company') {
		const inputUrl = prompt('Please enter a URL:', 'https://');
		if (inputUrl) {
			photoUrl = inputUrl;
			const response = await fetch(photoUrl);
			const blob = await response.blob();
			const reader = new FileReader();
			reader.onload = () => {
				card.photos[type] = reader.result as string;
			};

			reader.readAsDataURL(blob);
		}
	}

	let card = $state<Card>({
		template: 'modern-stack',
		name: 'John Doe',
		title: 'Senior Developer',
		company: 'Iridia Solutions Private Limited',
		email: 'hello@difuse.io',
		phone: '1800-599-5324',
		website: 'difuse.io',
		websiteLink: 'https://difuse.io',
		location: 'Chennai, Tamil Nadu, India',
		linkedIn: 'https://linkedin.com/in/johndoe',
		twitter: 'https://twitter.com/DifuseHQ',
		colours: selectedColors,
		photos: { profile: null, company: null }
	});

	onMount(() => {
		const photos = localStorage.getItem('photos');
		if (photos) {
			card.photos = JSON.parse(photos);
		} else {
			localStorage.setItem('photos', JSON.stringify(card.photos));
		}

		if (!card.photos.profile) {
			card.photos.profile =
				'https://avatars.githubusercontent.com/u/3922884?s=400&u=441b2ae32a36f919fa3dc4bea6ce478f0f42e1fc&v=4';
		}

		if (!card.photos.company) {
			card.photos.company = 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_640.jpg';
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

	function handleImageUpload(event: Event, setImage: (value: string | null) => void) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
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
</script>

<div class="mt-8 bg-gray-50 text-gray-900">
	<div class="container mx-auto px-4">
		<button class="flex flex-row gap-3" onclick={() => (window.location.href = '/')}>
			<img src="/favicon/favicon.ico" alt="favicon" class="h-10 w-10" />
			<h1 class="mt-1 text-2xl font-semibold">Signify</h1>
		</button>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div>
				<div class="mb-6 rounded-lg bg-white p-6 shadow">
					<div class="mb-6 flex items-start justify-between">
						<div class="flex max-w-[45%] flex-grow items-start space-x-4">
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
									onclick={() => handleAddUrl('profile')}
								>
									<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
									Add URL
								</button>
							</div>
						</div>

						<div class="flex max-w-[45%] flex-grow items-start space-x-4">
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
									onclick={() => handleAddUrl('company')}
								>
									<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
									Add URL
								</button>
							</div>
						</div>
					</div>

					<div>
						<form class="grid grid-cols-2 gap-4">
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
							<div class="flex items-center space-x-2">
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
							</div>
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

		<p class="py-5 text-center">© 2025 Signify - Made with ❤️ by Difuse</p>
	</div>
</div>
