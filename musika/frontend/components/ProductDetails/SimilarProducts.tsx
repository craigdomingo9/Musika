import variables from "@/utils/variables";
import ProductItems from "../ProductItems";
import { ChevronRightCircle } from "lucide-react";

type Props = {
    id: number,
    category: number,
}


async function SimilarProducts({id, category} : Props) {
    
    const url = `http://localhost:8000/api/similar-products/id=${id}&category=${category}`;

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
    <div className="pt-2 mb-[5rem] sm:mt-5 relative">
        <div className="px-2 sm:pl-0">
            <p className="text-xl font-semibold">You May Also Like</p>
        </div>
        <div className="px-2 relative sm:pl-0 pt-4 w-full flex overflow-x-scroll overflow-y-hidden">
            <ProductItems products={data} row={true} />
            
        </div>
        <div className="absolute hidden md:block -right-10 top-[50%] text-slate-700">
            <ChevronRightCircle />
        </div>
        
    </div>
  )
}

export default SimilarProducts