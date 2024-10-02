import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import ProductDetailsAddToBagButton from "../ProductDetails/ProductDetailsAddToBagButton";
import { PlusIcon } from "lucide-react";



type Props = {
    products: Product[]
}


function ExploreProductItems({products}: Props) {
    const base_url = "http://localhost:8000";

    const truncate = (text: string, length: number, suffix: string = '...'): string => {
        if (text.length <= length) return text;
        return text.substring(0, length) + suffix;
    };

    
  return (
    <div className="grid md:grid-cols-2 snap-y snap-mandatory h-screen w-screen md:w-full mx:auto overflow-scroll">
        {products.map((product) => (
            <Link href={{
            pathname: "/product",
            query: {
                id: product.id,
            }
            }} 
            key={product.id}>
                <div className="h-[100vh] grid md:m-5 py-5 pt-2 snap-center">
                    <div className="max-h-[55vh] relative">
                        {product.images && (
                            <>
                                <Image className="h-full object-contain" src={`${base_url}${product?.images[0].image}`} width={500} height={500} alt="Product" />
                                
                            </>
                        )}
                    </div>
                    <div className="h-[45vh]">
                        <div className={cn("mx-3 pt-1 border-t border-dashed flex justify-between")}>
                            <div>
                                <p className="text-lg font-bold">{product.name}</p>
                                <p className="text-xs opacity-70">{product.description}</p>
                            </div>
                            <div className="flex mx-3 my-auto">
                                <p className={cn("text-lg",product.on_sale && "line-through txt-color")}>${product.price}</p>
                                <p className={cn("hidden",product.on_sale && "inline-block pl-3 text-lg")}>${product.sale_price}</p>
                            </div>
                        </div>
                        

                        {product.business.logo && (
                            <div className="m-3 flex">
                                <Image className="rounded-full p-0 m-0" src={`${base_url}${product.business.logo}`} width={40} height={40} alt="Business Logo" />
                                <p className="pl-3 my-auto font-bold opacity-85">{product.business.name}</p>
                            </div>
                        )}
                        
                        
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ExploreProductItems