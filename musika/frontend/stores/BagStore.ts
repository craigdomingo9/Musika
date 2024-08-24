import { create } from 'zustand';

interface Item {
  id: string;
  name: string;
  price: number;
}

interface BagStore {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const useBagStore = create<BagStore>((set, get) => ({
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
}));

export default useBagStore;