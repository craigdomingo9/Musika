"use client";
import useBagStore from "@/stores/BagStore"


function ProductsInBag() {

    const products = useBagStore((store) => store.items)

    console.log(products)

  return (
    <div>ProductsInBag</div>
  )
}

export default ProductsInBag