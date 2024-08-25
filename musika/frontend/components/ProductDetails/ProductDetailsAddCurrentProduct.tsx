"use client";
import useCurrentProductStore from "@/stores/CurrentProductStore";
import { useEffect } from "react";


type Props = {
    product_details: BagProduct;
}



function ProductDetailsAddCurrentProduct({product_details}: Props) {

    const addCurrentProductStore = useCurrentProductStore(
        (state) => state.setCurrentProduct)
    
    const current_product = useCurrentProductStore((state) => state.currentProduct)


    useEffect(() => {
        addCurrentProductStore(product_details);
    },[current_product])
    
    

  return (
    <></>
  )
}

export default ProductDetailsAddCurrentProduct