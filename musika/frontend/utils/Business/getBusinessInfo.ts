import Cookies from "js-cookie";
import variables from "../variables";


async function getBusinessInfo() {

    const businessCode = Cookies.get("business_code")
        

    const url = `http://localhost:8000/api/business/${businessCode}`

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
    const business_data = (await response.json()) as BusinessDetails;

    return business_data;
  
}

export default getBusinessInfo