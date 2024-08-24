import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Item {
  id: number;
  price: number;
}

interface BagStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const useBagStore = create<BagStore>()(
  persist(
    (set, get) => ({
    items: [],
    addItem: (item) => {
      set((state) => ({
        items: [...state.items, item],
      }));
    },
    removeItem: (id) => {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    },
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + item.price, 0);
    },
    getTotalItems: () => {
      return get().items.length;
    },
    }),
    {
      name: "storage",
    }
  )
);

export default useBagStore;