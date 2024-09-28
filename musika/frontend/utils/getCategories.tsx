import variables from "./variables";

async function getCategories<T>() : Promise<T> {
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
    const categories : T = await response.json();
    

    return categories;
}

export default getCategories