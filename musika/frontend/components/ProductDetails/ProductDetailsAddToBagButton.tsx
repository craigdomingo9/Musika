"use client"
import useBagStore from "@/stores/BagStore"
import { Button } from "../ui/button"
import useCurrentProductStore from "@/stores/CurrentProductStore"
import { useToast } from "@/components/ui/use-toast"

function ProductDetailsAddToBagButton() {
  const { toast } = useToast()

  const addProductToStore = useBagStore((state) => state.addItem)

  const current_product = useCurrentProductStore((state) => state.currentProduct);

  const addToBag = () => {
    addProductToStore(current_product);
  }


  return (
    <div className="w-1/2 p-2">
        <Button onClick={addToBag} className="w-full h-16 bg-color-btn hover:bg-color-btn">
          Add to Bag
        </Button>
    </div>
  )
}

export default ProductDetailsAddToBagButton