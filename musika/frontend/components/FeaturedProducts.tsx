import variables from "@/utils/variables";
import ProductItems from "./ProductItems";

async function FeaturedProducts() {

    const url = "http://localhost:8000/api/products/sale=0&homepage=1";

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.products
        }
    }

    const response = await fetch(url,options);
    const data = (await response.json()) as Product[];

  return (
    <>
        <h1 className="text-xl py-4 pt-8 font-semibold opacity-75 ml-4 sm:ml-0">Featured Products</h1>
        <div className="grid w-full grid-cols-2 xl:grid-cols-3 overflow-y-scroll [&>*:last-child]:mb-10"> 
            <ProductItems products={data} row={false} page="home"/>
        </div>
    </>
  )
}

export default FeaturedProducts