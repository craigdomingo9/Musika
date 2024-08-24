import { create } from 'zustand';




interface CurrentProductStore {
  currentProduct: CurrentProduct;
  setCurrentProduct: (product: CurrentProduct) => void;
  clearCurrentProduct: () => void;
}

const useCurrentProductStore = create<CurrentProductStore>((set) => ({
  currentProduct: {id: 0, price: 0},
  setCurrentProduct: (product) => {
    set({ currentProduct: product });
  },
  clearCurrentProduct: () => {
    set({ currentProduct: {id: 0, price: 0} });
  },
}));

export default useCurrentProductStore;