import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link";


type ProductItemsProps = {
  products: Product[],
  row: boolean,
  page: string,
}

function ProductItems({products,row,page}: ProductItemsProps) {
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
          
            <div className={cn("grid w-40 sm:w-full mx-4 bg-opacity-70 h-40",
                            row && "h-36 w-36 sm:ml-0 sm:w-60 sm:h-60",
                            !row && "sm:overflow-hidden sm:w-[20rem] xl:w-[17rem] sm:border-2 sm:object-cover sm:h-[20rem] xl:h-[17rem] sm:grid ",
                            page=="catalog" && "sm:w-[18rem] sm:flex lg:w-[19rem] xl:w-[22rem] xl:h-[22rem]",
                            page=="business" && "sm:w-[12rem] sm:h-[12rem] md:w-[14rem] md:h-[14rem] lg:w-[19rem] lg:h-[19rem] xl:w-[22rem] xl:h-[22rem]")}>
              <div className={cn("",!row && "sm:grid w-full")}>
                {product.images && (
                  <Image 
                  className={cn("min-w-full h-full w-full rounded",!row && "max-h-full object-contain")} 
                  src={`${base_url}${product.images.map((img) => img.image)}`} 
                  width={1000} 
                  height={1000} 
                  quality={90}
                  alt="Product Image" />
                )}
              </div>
            </div>
            <div className={cn("mx-3 sm:ml-0 pt-1 border-t border-dashed",
              !row && "h-28 w-36 mx-5 sm:mx-5 sm:w-full",
              page=="catalog" && "sm:w-[18rem] lg:w-[19rem] xl:w-[22rem]",
              page=="business" && "sm:w-[12rem] md:w-[14rem] lg:w-[19rem] xl:w-[22rem] ")}>
                <p className="text-sm font-bold">{truncate(product.name,30)}</p>
                <p className="text-xs opacity-70">{truncate(product.description,30)}</p>
                <div className="flex">
                  <p className={cn("text-sm",product.on_sale && "line-through txt-color")}>${product.price}</p>
                  <p className={cn("hidden",product.on_sale && "inline-block pl-3 text-sm")}>${product.sale_price}</p>
                </div>
            </div>
          
        </Link>
      ))}
    </>
  )
}

export default ProductItems