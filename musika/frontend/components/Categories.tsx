import variables from "@/utils/variables";
import CategoryItems from "./CategoryItems";

type Props = {
    name: string
}


async function Categories({name}: Props) {
    const url = "http://localhost:8000/api/category/";

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.categories,
        }
    }
    const response = await fetch(url,options);
    const categories = (await response.json());

    return (
    <div>

        <div className="flex sm:mx-[5%] overflow-x-scroll overflow-y-hidden pl-4 sm:pl-0">
            <CategoryItems categories={categories} name={name}/>
        </div>
    </div>
    )
}

export default Categories