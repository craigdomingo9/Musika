"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import useBagStore from "@/stores/BagStore";
import Link from "next/link";


type Props = {
    product: BagProduct;
}

function ProductInBag({product}: Props) {

  const { addItem, decreaseItemQuantity, getTotalPrice } = useBagStore();

  return (
    <div className="flex min-w-full border-2 border-slate-100 border-opacity-80 p-2 my-4 h-40 rounded-xl">
      <div className="w-[40vw] sm:w-[15vw] xl:w-[15vw] max-h-full">
        <Image src={product.image} className="max-h-full object-fit rounded-md" width={140} height={140} alt="Bag Product" />
      </div>
      <div className="grid grid-rows-2 w-[50vw] relative">
        <Link href={{
          pathname: "product",
          query: {
            id: product.id,
            sale: product.on_sale
          }
        }}>
          <p className="font-semibold">{product.name}</p>
          <p className="text-xs font-semibold">{product.description}</p>
        </Link>
        <div className="m-auto min-w-full grid grid-cols-2">
          <div className=" m-auto grid grid-cols-3 md:mx-5 md:flex">
            <Button className="size-8 bg-color-btn" onClick={() => decreaseItemQuantity(product.id)}>-</Button>
            <p className="m-auto md:mx-5 font-semibold">{product.quantity}</p>
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