import { create } from 'zustand';




interface CurrentProductStore {
  currentProduct: BagProduct;
  setCurrentProduct: (product: BagProduct) => void;
  clearCurrentProduct: () => void;
}

const BagProductDefault = {
  id: 0,
  name: "",
  image: "",
  description: "",
  price: 0,
  on_sale: false,
  sale_price: 0,
  quantity: 0,
  stock_quantity: 0
}

const useCurrentProductStore = create<CurrentProductStore>((set) => ({
  currentProduct: BagProductDefault,
  setCurrentProduct: (product) => {
    set({ currentProduct: product });
  },
  clearCurrentProduct: () => {
    set({ currentProduct: BagProductDefault });
  },
}));

export default useCurrentProductStore;