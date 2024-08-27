import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link";


type ProductItemsProps = {
  products: Product[],
  row: boolean,
}

function ProductItems({products,row}: ProductItemsProps) {
  const base_url = "http://localhost:8000";

  const truncate = (text: string, length: number, suffix: string = '...'): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + suffix;
  };
  


  return (
    <>
      {products.map((product) => (
        <Link href={{
          pathname: "/product",
          query: {
            id: product.id,
            on_sale: product.on_sale ? 1 : 0,
          }
        }} key={product.id}>
          <>
            <div className={cn("grid w-40 mx-4 bg-opacity-70 h-40",row && "h-36 w-36 sm:ml-0 sm:w-60 sm:h-60")}>
              <div className={cn("",!row && "max-h-40 w-full")}>
                {product.images && (
                  <Image className={cn("min-w-full h-full w-full rounded",!row && "max-h-full object-contain")} src={`${base_url}${product.images[0].image}`} width={110} height={100} alt="" priority />
                )}
              </div>
            </div>
            <div className={cn("mx-3 sm:ml-0 pt-1 border-t border-dashed",!row && "h-28 mx-5")}>
                <p className="text-sm font-bold">{truncate(product.name,20)}</p>
                <p className="text-xs opacity-70">{truncate(product.description,25)}</p>
                <div className="flex">
                  <p className={cn("text-sm",product.on_sale && "line-through txt-color")}>${product.price}</p>
                  <p className={cn("hidden",product.on_sale && "inline-block pl-3 text-sm")}>${product.sale_price}</p>
                </div>
            </div>
          </>
        </Link>
      ))}
    </>
  )
}

export default ProductItems