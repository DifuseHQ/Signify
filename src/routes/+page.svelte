<script lang="ts">
	import { generateCard, type Card, type Template } from '$lib/generator';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

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

	function handleColorChange(newColor: string) {
		selectedColors[selectedColorKey] = newColor;
	}

	onMount(() => {
		handleColorChange(selectedColors.primary);
	});

	let card = $state<Card>({
		template: 'modern-stack',
		name: 'Hayzam Sherif',
		title: 'Senior Developer',
		company: 'Alchemilla Ventures Private Limited',
		email: 'hayzam@alchemilla.io',
		phone: '+91 9072188888',
		website: 'alchemilla.io',
		location: 'Chennai, Tamil Nadu, India',
		linkedIn: 'https://linkedin.com/in/johndoe',
		twitter: 'https://twitter.com/johndoe',
		colours: selectedColors,
		photos: { profile: null, company: null }
	});

	let generated: string = $state('');

	$effect(() => {
		if (card.name) {
			generated = generateCard(card);
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

	function downloadHTML() {
		const element = document.createElement('a');
		const file = new Blob([generated], { type: 'text/html' });
		element.href = URL.createObjectURL(file);
		element.download = 'business-card.html';
		document.body.appendChild(element);
		element.click();
	}
</script>

<Icon icon="mdi:phone" class="hidden h-5 w-5 text-indigo-500" />
<Icon icon="lucide:mail" class="hidden h-5 w-5 text-indigo-500" />
<Icon icon="mdi:web" class="hidden h-5 w-5 text-indigo-500" />

<div class="mt-8 bg-gray-50 text-gray-900">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="rounded-lg bg-white p-6 shadow">
				<div class="mb-6 flex items-start justify-between">
					<!-- Profile Photo Section -->
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
							>
								<Icon icon="mdi:link" class="mr-2 h-5 w-5" />
								Add URL
							</button>
						</div>
					</div>

					<!-- Company Logo Section -->
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

				<div class="mt-5">
					<div class="mb-2 flex items-center space-x-2">
						<Icon icon="lucide:sparkles" class="h-5 w-5 text-indigo-500" />
						<h2 class="text-lg font-semibold">Preview</h2>
					</div>
					<div class="rounded border border-gray-50 p-4">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html generated}
					</div>
					<button
						class="mt-4 rounded bg-indigo-600 px-4 py-2 text-white"
						onclick={() => downloadHTML()}
					>
						Download
					</button>
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
							--picker-width="{pickerWidth - 60}px"
							--cp-border-color="white"
							--cp-text-color="black"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
