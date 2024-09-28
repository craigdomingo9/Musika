import variables from "@/utils/variables";
import CategoryItems from "./CategoryItems";

type Props = {
    name: string
}


async function Categories({name}: Props) {
    let categories: Category[] = [];
    try {
        const url = "http://localhost:8000/api/products/category/";

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

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        categories = await response.json();
    }
    catch (error) {
        console.log(error)
    }

    return (
    <div>
        <div className="flex sm:mx-[5%] overflow-x-scroll overflow-y-hidden pl-4 sm:pl-0">
            <CategoryItems categories={categories} name={name}/>
        </div>
    </div>
    )
}

export default Categories