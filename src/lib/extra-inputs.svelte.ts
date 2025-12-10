export const socialMediaOptions = [
    { id: 'twitter', icon: 'mdi:twitter', placeholder: 'Twitter URL' },
    { id: 'linkedin', icon: 'mdi:linkedin', placeholder: 'LinkedIn URL' },
    { id: 'facebook', icon: 'mdi:facebook', placeholder: 'Facebook URL' },
    { id: 'instagram', icon: 'mdi:instagram', placeholder: 'Instagram URL' },
    { id: 'whatsapp', icon: 'mdi:whatsapp', placeholder: 'WhatsApp URL' }
];

export interface ExtraInputs {
    socialInputs: SocialInput[];
    showModal: boolean;
}

export const extraInputs: ExtraInputs = $state({
    socialInputs: [],
    showModal: false,
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
