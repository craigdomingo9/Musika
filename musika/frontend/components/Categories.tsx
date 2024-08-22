import variables from "@/utils/variables";
import CategoryItems from "./CategoryItems";

type Props = {
    name: string
}


async function Categories({name}: Props) {
    const url = "http://localhost:8000/api/categories/";

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
    <div className="flex overflow-x-scroll overflow-y-hidden pl-4">
        <CategoryItems categories={categories} name={name}/>
    </div>
    )
}

export default Categories