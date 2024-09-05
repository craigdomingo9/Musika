import variables from "@/utils/variables";
import ProductDetailsMainContent from "./ProductDetailsMainContent";
import SimilarProducts from "./SimilarProducts";
import ProductDetailsAddCurrentProduct from "@/utils/ProductDetails/ProductDetailsAddCurrentProduct";
import ProductDetailsSplit from "@/utils/ProductDetails/ProductDetailsSplit";
  

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
    const data = (await response.json());



    const [
      current_product,
      images,
      global_product_details,
      product_details,
      business_details,
      catalog_details
    ] = ProductDetailsSplit(data);



    return (
      <>  
          <ProductDetailsAddCurrentProduct product_details={current_product} />
          <ProductDetailsMainContent 
            images={images}
            global_product_details={global_product_details}
            product_details={product_details}
            business_details={business_details}
            catalog_details={catalog_details}
          />
          <SimilarProducts id={id} category={data["catalog"]["category"]} />
          
      </>
    )
}

export default ProductDetailsMain