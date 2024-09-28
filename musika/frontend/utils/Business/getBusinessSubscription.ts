import Cookies from "js-cookie";
import variables from "../variables";

async function getBusinessSubscription() {
    const businessCode = Cookies.get("business_code")
        

    const url = `http://localhost:8000/api/business/subscriptions/${businessCode}/`

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
    const business_data = (await response.json()) as BusinessSubscription;


    return business_data;
}

export default getBusinessSubscription