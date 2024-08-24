import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Item {
  id: number;
  price: number;
  quantity: number;
}

interface BagStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  resetBag: () => void;
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
    resetBag: () => {
      set({ items: [] });
    },
    }),
    {
      name: "storage",
    }
  )
);

export default useBagStore;