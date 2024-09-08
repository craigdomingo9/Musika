import { create } from 'zustand';



interface ActionStore {
    actionOccurred: boolean; // Use camelCase for consistency
    secondaryActionOccured: boolean;
    tertiaryActionOccured: boolean;
    toggleActionOccurred: (value: boolean) => void; // Use camelCase
    toggleSecondaryActionOccurred: (value: boolean) => void;
    toggleTertiaryActionOccurred: (value: boolean) => void;
}

const useActionStore = create<ActionStore>((set) => ({
    actionOccurred: false, // Initialize the state
    secondaryActionOccured: false,
    tertiaryActionOccured: false,
    toggleActionOccurred: (value: boolean) => {
        set({ actionOccurred: value }); // Update the state
    },
    toggleSecondaryActionOccurred: (value: boolean) => {
        set({ secondaryActionOccured: value }); // Update the state
    },
    toggleTertiaryActionOccurred: (value: boolean) => {
        set({ tertiaryActionOccured: value }); // Update the state
    },
}));

export default useActionStore;