import variables from "@/utils/variables";
import SimilarProducts from "./SimilarProducts";
import ProductDetailsAddCurrentProduct from "@/utils/ProductDetails/ProductDetailsAddCurrentProduct";
import ProductDetails from "./ProductDetails";
  

type Props = {
    id: number,
}




async function ProductDetailsMain({id}: Props) {
    
    const url = `http://localhost:8000/api/products/${id}/`;

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.product_details
        }
    }


    const response = await fetch(url,options);
    const product = (await response.json()) as Product;
    console.log(product)

    return (
        <>  
            <ProductDetailsAddCurrentProduct product={product} />
            <ProductDetails product={product} />
            
            {product && 
                <SimilarProducts id={product.id} /> 
            }
        </>
    )
}

export default ProductDetailsMain