import ProductDetailsHeader from "@/components/ProductDetails/ProductDetailsHeader"
import ProductDetailsMain from "@/components/ProductDetails/ProductDetailsMain"


type Props = {
    searchParams: {
        id: number,
        onsale: boolean,
        category: string,
    }
}


async function ProductDetails({searchParams: {id, onsale, category}} : Props) {
  
  return (
    <div className="sm:mx-[10%] xl:mx-[17%]">
        <ProductDetailsHeader />
        <ProductDetailsMain id={id} />
        
    </div>
  )
}

export default ProductDetails