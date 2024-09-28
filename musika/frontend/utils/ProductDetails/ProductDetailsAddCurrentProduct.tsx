"use client";
import useCurrentProductStore from "@/stores/CurrentProductStore";
import { useEffect } from "react";


type Props = {
  product: Product;
}



function ProductDetailsAddCurrentProduct({product}: Props) {


    const currentProd : BagProduct = {
      id: Number(product.id),
      name: product.name,
      description: product.description,
      image: product.images[0].image,
      price: Number(product.on_sale ? product.sale_price : product.price),
      on_sale: product.on_sale,
      sale_price: Number(product.sale_price),
      quantity: 1,
      stock_quantity: product.inventory_quantity
    }

    const addCurrentProductStore = useCurrentProductStore(
        (state) => state.setCurrentProduct)
    
    const current_product = useCurrentProductStore((state) => state.currentProduct)


    useEffect(() => {
        addCurrentProductStore(currentProd);
    },[])
    
    

  return (
    <></>
  )
}

export default ProductDetailsAddCurrentProduct