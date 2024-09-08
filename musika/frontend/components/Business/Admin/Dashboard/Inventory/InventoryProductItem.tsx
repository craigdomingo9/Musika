import { Button } from "@/components/ui/button"
import Image from "next/image"
import InventoryProductItemEditButton from "./InventoryProductItemEditButton"
import InventoryProductItemDeleteButton from "./InventoryProductItemDeleteButton"


type Props = {
    product: Product
}

function InventoryProductItem({product}: Props) {
    const backend_url = "http://localhost:8000"

  return (
    <div className="w-full flex flex-col justify-center min-h-48 max-w-64 lg:max-w-72 rounded-xl border">
        <div className="grid place-items-center min-h-48 max-h-64 max-w-64 lg:max-h-72 lg:max-w-72">
            {product.images[0]?.image ? (
                <Image 
                className="rounded-md"  
                src={`${backend_url}${product.images[0]?.image}`} 
                height={500} 
                width={500} 
                alt=""  
                priority
                />
            ):(
                <div className="min-h-full [&>svg]:min-h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <p>No Image for this product</p>

                </div>


            )}
        </div>
        <div className="px-2 mb-4">
            <p className="font-semibold opacity-75">{product.name}</p>
            <div className="flex justify-between">
                <p>Price: ${product.price}</p>
                <p>{product.on_sale && `Sale: $${product.sale_price}`}</p>
            </div>
            <p>Stock: {product.inventory_quantity}</p>
        </div>
        <div className="grid grid-cols-[75%_25%]">
            <InventoryProductItemEditButton product={product} />
            <InventoryProductItemDeleteButton product={product} />
        </div>

    </div>
  )
}

export default InventoryProductItem