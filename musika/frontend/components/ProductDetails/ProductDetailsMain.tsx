import variables from "@/utils/variables";
import ProductDetailsMainContent from "./ProductDetailsMainContent";
import SimilarProducts from "./SimilarProducts";
import ProductDetailsButtons from "./ProductDetailsButtons";
import ProductDetailsAddCurrentProduct from "./ProductDetailsAddCurrentProduct";
  

type Props = {
    id: number,
}

type Images = {
  id: number,
  image: string,
  alt: string,
}



async function ProductDetailsMain({id}: Props) {
    const url = `http://localhost:8000/api/product/${id}/`;

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

    const images: Images[] = [data["images"][0] as Images,...data["variant"]];

    const main_details : ProductDetails = {
      id: data["id"],
      price: data["price"],
      on_sale: data["on_sale"],
      description: "",
      sale_price: data["sale_price"],
      stock_quantity: data["inventory_quantity"],
      attribute_name: "",
      attribute_value: ""
    }

    let variants : ProductDetails[] = [];
    data["variant"].map((variant: ProductVariant) => {
      const details : ProductDetails[] = [{
        id: variant["id"],
        price: variant["price"],
        on_sale: false,
        description: variant["description"],
        sale_price: "",
        stock_quantity: variant["stock_quantity"],
        attribute_name: variant["attribute_name"],
        attribute_value: variant["attribute_value"]
      }]
      variants = [...details]
    })

    const global_product_details: GlobalProductDetails = {
      name: data["name"],
      description: data["description"],
      has_variant: data["variant"] != "",
    }

    const business_details : Business = data["business"];
    const catalog_details : Catalog = data["catalog"];


    const product_details : ProductDetails[] = [main_details,...variants]

    const current_product : CurrentProduct = {
      id: main_details["id"],
      price: Number(main_details.on_sale ? main_details["sale_price"] : main_details["price"]) 
    }


    return (
      <>
          <ProductDetailsAddCurrentProduct product_details={current_product}  />
          <ProductDetailsMainContent 
            images={images} 
            global_product_details={global_product_details} 
            product_details={product_details} 
            business_details={business_details}
            catalog_details={catalog_details}
          />
          <SimilarProducts id={id} category={data["catalog"]["category"]} />
          <ProductDetailsButtons />
      </>
    )
}

export default ProductDetailsMain