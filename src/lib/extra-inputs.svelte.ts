import Cropper from "cropperjs";
import { tick } from "svelte";

export const socialMediaOptions = [
	{ id: 'twitter', icon: 'mdi:twitter', placeholder: 'Twitter URL' },
	{ id: 'linkedin', icon: 'mdi:linkedin', placeholder: 'LinkedIn URL' },
	{ id: 'facebook', icon: 'mdi:facebook', placeholder: 'Facebook URL' },
	{ id: 'instagram', icon: 'mdi:instagram', placeholder: 'Instagram URL' }
];

export interface ExtraInputs {
	socialInputs: SocialInput[];
	showModal: boolean;
	cropperModal: boolean;
	cropper: Cropper | null;
	currentImageType: 'profile' | 'company';
}

export const extraInputs: ExtraInputs = $state({
	socialInputs: [],
	showModal: false,
	cropperModal: false,
	cropper: null,
	currentImageType: 'profile' 
});

export interface SocialInput {
	id: string;
	icon: string;
	placeholder: string;
	value: string;
}

export function addSocialInput(selectedOption: { id: string; icon: string; placeholder: string }) {
	if (!extraInputs.socialInputs.find((input) => input.id === selectedOption.id)) {
		extraInputs.socialInputs = [
			...extraInputs.socialInputs,
			{
				id: selectedOption.id,
				icon: selectedOption.icon,
				placeholder: selectedOption.placeholder,
				value: ''
			}
		];
	}

	extraInputs.showModal = false;
}

export function closeCropperModal() {
	extraInputs.cropperModal = false;
	if (extraInputs.cropper) {
		extraInputs.cropper.destroy();
		extraInputs.cropper = null;
		}
}

export async function processImage(blob: Blob, type: 'profile' | 'company', imageElement: HTMLImageElement | null) {
	extraInputs.cropperModal = true;
	await tick();

	if (!imageElement) {
		console.error('imageElement is undefined after modal open');
		return;
	}

	if (extraInputs.cropper) {
		extraInputs.cropper.destroy();
		extraInputs.cropper = null;
	}

	const reader = new FileReader();
	reader.onload = async (e) => {
		await tick();

		imageElement.src = e.target?.result as string;
		imageElement.style.display = 'block';

		extraInputs.cropper = new Cropper(imageElement, {
			aspectRatio: 1,
			viewMode: 3,
			autoCropArea: 1,
			ready() {
				extraInputs.currentImageType = type;
			},
		});
	};

	reader.readAsDataURL(blob);
}