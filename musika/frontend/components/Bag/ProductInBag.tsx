"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import useBagStore from "@/stores/BagStore";


type Props = {
    product: BagProduct;
}

function ProductInBag({product}: Props) {

  const { addItem, decreaseItemQuantity, getTotalPrice } = useBagStore();

  return (
    <div className="flex min-w-full border-2 border-slate-100 border-opacity-80 p-2 my-4 h-40 rounded-xl">
      <div className="w-[40vw] max-h-full">
        <Image src={product.image} className="max-h-full object-fit rounded-md" width={140} height={140} alt="Bag Product" />
      </div>
      <div className="grid grid-rows-2 w-[50vw] relative">
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-xs font-semibold">{product.description}</p>
        </div>
        <div className="m-auto min-w-full grid grid-cols-2">
          <div className=" m-auto grid grid-cols-3">
            <Button className="size-8 bg-color-btn" onClick={() => decreaseItemQuantity(product.id)}>-</Button>
            <p className="m-auto font-semibold">{product.quantity}</p>
            <Button className="size-8 bg-color-btn" onClick={() => addItem(product)}>+</Button>
          </div>
          <div className="grid">
            <p className="m-auto font-bold">${product.quantity * (product.on_sale ? product.sale_price : product.price)} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInBag