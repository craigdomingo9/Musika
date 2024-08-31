import variables from "@/utils/variables";
import ProductItems from "./ProductItems";

async function OnSaleProducts() {

    const url = "http://localhost:8000/api/products/sale=1&homepage=1";

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
    const data = (await response.json());

    // console.log(data);

  return (
    <div>
        <h1 className="text-xl py-2 font-semibold opacity-75 ml-4">On Sale</h1>
        <div className="flex w-full overflow-y-hidden">
            <ProductItems products={data} row={true} />
        </div>
    </div>
  )
}

export default OnSaleProducts