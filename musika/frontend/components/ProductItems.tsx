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
          
            <div className={cn("product-img-container",row && "product-row",!row && "product-not-row",page=="catalog" && "product-on-catalog",page=="business" && "product-on-business")}>
                {product.images && (
                  <Image 
                  className={cn("h-full w-full rounded",!row && "max-h-full object-contain")} 
                  src={`${base_url}${product.images.map((img) => img.image)}`} 
                  width={1000} 
                  height={1000} 
                  quality={100}
                  alt="Product Image" />
                )}
            </div>

            <div className={cn("product-text",!row && "product-not-row-text",page=="catalog" && "product-text-on-catalog",page=="business" && "product-text-on-business")}>
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