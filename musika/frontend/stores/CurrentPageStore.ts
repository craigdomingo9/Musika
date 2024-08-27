import { create } from 'zustand';

interface CurrentPageStore {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}


const useCurrentProductStore = create<CurrentPageStore>((set) => ({
    currentPage: "",
    setCurrentPage(page) {
        set({currentPage: page})
    },
}));

export default useCurrentProductStore;
