import Cookies from "js-cookie"
import variables from "../variables";

async function getCatalogs() {
    const businessCode = Cookies.get("business_code")
    const url = `http://localhost:8000/api/products/catalogs/b/${businessCode}`;

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.business,
        }
    }

    const response = await fetch(url,options);
    const catalogs_data = (await response.json()) as Catalog[];

    return catalogs_data;
}

export default getCatalogs