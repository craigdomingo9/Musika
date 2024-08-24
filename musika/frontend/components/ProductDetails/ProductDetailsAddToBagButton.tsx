"use client"
import useBagStore from "@/stores/BagStore"
import { Button } from "../ui/button"
import useCurrentProductStore from "@/stores/CurrentProductStore"

function ProductDetailsAddToBagButton() {

  const addProductToStore = useBagStore((state) => state.addItem)
  const bag = useBagStore((state) => state.items)

  const current_product = useCurrentProductStore((state) => state.currentProduct);

  const addToBag = () => {
    addProductToStore(current_product);
  }



  return (
    <div className="w-1/2 p-2">
        <Button onClick={addToBag} className="w-full h-16 bg-amber-600 opacity-95">Add to Bag</Button>
    </div>
  )
}

export default ProductDetailsAddToBagButton