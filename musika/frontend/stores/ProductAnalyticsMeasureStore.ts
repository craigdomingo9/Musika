import { toast } from '@/components/ui/use-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';





interface ProductAnalyticsMeasureStore {
    measure: Measure;
    changeMeasure: (value:string,name:string) => void
}

const useProductAnalyticsMeasureStore = create<ProductAnalyticsMeasureStore>()(
    persist(
      immer(
      (set, get) => ({
        measure: {
            value: "views",
            name: "Views",
        },
        changeMeasure: (value,name) => {
            set({
                measure: {
                    value: value,
                    name: name
                }
            });
        },

      })
      ),
      {
        name: "storage",
      }
    )
  );


export default useProductAnalyticsMeasureStore;
