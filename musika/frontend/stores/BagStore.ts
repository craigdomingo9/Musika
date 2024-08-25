import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



interface BagStore {
  items: BagProduct[];
  addItem: (item: BagProduct) => void;
  removeFromBag: (id: number) => void;
  getTotalPrice: () => number;
  decreaseItemQuantity: (id: number) => void;
  getTotalItems: () => number;
  getItemCounts: () => Record<number, number>;
  resetBag: () => void;
}


const useBagStore = create<BagStore>()(
  persist(
    immer(
    (set, get) => ({
    items: [],
    addItem: (item) => {
      set((state) => {
        const existingItem = state.items.find((i: BagProduct) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(item);
        }
      });
    },
    removeFromBag: (id) => {
      set((state) => {
        const index = state.items.findIndex((i) => i.id === id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      });
    },
    decreaseItemQuantity: (id) => {
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
        } else {
          const index = state.items.findIndex((i) => i.id === id);
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
      });
    },
    getTotalItems: () => {
      return get().items.length;
    },
    getItemCounts: () => {
      const itemCounts: Record<number, number> = {};
      get().items.forEach((item) => {
        itemCounts[item.id] = (itemCounts[item.id] || 0) + item.quantity;
      });
      return itemCounts;
    },
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    resetBag: () => {
      set({ items: [] });
    },
    })),
    {
      name: "storage",
    }
  )
);

export default useBagStore;