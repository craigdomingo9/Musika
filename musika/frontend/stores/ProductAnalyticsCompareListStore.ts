import { toast } from '@/components/ui/use-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


interface ProductAnalyticsCompareListStore {
    instances: ProductAnalytics[];
    addInstance: (instance: ProductAnalytics) => void;
    removeFromList: (product: number) => void;
}





const useProductAnalyticsCompareListStore = create<ProductAnalyticsCompareListStore>()(
  persist(
    immer(
    (set, get) => ({
    instances: [],
    addInstance: (instance) => {
      set((state) => {
        const instanceisFound = state.instances.find((_instance) => _instance.product === instance.product);

        if (!instanceisFound) {
          state.instances.push(instance);
          toast({
            variant: "success",
            description: "Product has been added to List",
            duration: 1500,
          })
        }
      });
    },
    removeFromList: (product) => {
      set((state) => ({
        instances: state.instances.filter((instance) => instance.product !== product)
      }));
    },
    
    })),
    {
      name: "storage",
    }
  )
);

export default useProductAnalyticsCompareListStore;

