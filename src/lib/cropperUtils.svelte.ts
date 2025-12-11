import Cropper from "cropperjs";
import { tick } from "svelte";

export interface CropperInputs {
    isOpen: boolean;
    cropperInstance: Cropper | null;
    currentImageType: 'profile' | 'company';
}

export const cropperInputs: CropperInputs = $state({
    isOpen: false,
    cropperInstance: null,
    currentImageType: 'profile'
});


export function closeCropperModal() {
    cropperInputs.isOpen = false;
    if (cropperInputs.cropperInstance) {
        cropperInputs.cropperInstance.destroy();
        cropperInputs.cropperInstance = null;
    }
}

export async function processImage(blob: Blob, type: 'profile' | 'company', imageElement: HTMLImageElement | null) {
    cropperInputs.isOpen = true;
    await tick();

    if (!imageElement) {
        console.error('imageElement is undefined after modal open');
        return;
    }

    if (cropperInputs.cropperInstance) {
        cropperInputs.cropperInstance.destroy();
        cropperInputs.cropperInstance = null;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        await tick();

        imageElement.src = e.target?.result as string;
        imageElement.style.display = 'block';

        cropperInputs.cropperInstance = new Cropper(imageElement, {
            // aspectRatio: 2 / 1,
            viewMode: 1,
            autoCropArea: 1,
            ready() {
                cropperInputs.currentImageType = type;
            },
        });
    };

    reader.readAsDataURL(blob);
}

