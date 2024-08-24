import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
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
    <div className="grid snap-y snap-proximity h-screen w-screen mx:auto overflow-scroll">
        {products.map((product) => (
            <Link href={{
            pathname: "/product",
            query: {
                id: product.id,
                on_sale: product.on_sale ? 1 : 0,
            }
            }} key={product.id}>
                <div className="h-[30rem] py-5 pt-2 snap-start ">
                    <div className="h-5/6">
                        {product.images && (
                            <Image className="min-h-full" src={`${base_url}${product.images[0].image}`} width={500} height={500} alt="Product" />
                        )}
                    </div>
                    <div className={cn("mx-3 pt-1 border-t border-dashed")}>
                        <p className="text-lg font-bold">{product.name}</p>
                        <p className="text-xs opacity-70">{product.description}</p>
                    </div>
                    <div className="flex mx-3">
                        <p className={cn("text-lg",product.on_sale && "line-through txt-color")}>${product.price}</p>
                        <p className={cn("hidden",product.on_sale && "inline-block pl-3 text-lg")}>${product.sale_price}</p>
                    </div>
                </div>
            </Link>
        ))}
               
    </div>
  )
}

export default ExploreProductItems