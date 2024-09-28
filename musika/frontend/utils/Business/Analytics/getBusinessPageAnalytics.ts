import getBusinessCode from "../getBusinessCode"

async function getBusinessPageAnalytics() {
    const code = getBusinessCode();

    const url = `http://localhost:8000/api/analytics/business/${code}`

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    }

    const response = await fetch(url,options);
    const response_data = (await response.json()) as BusinessPageAnalytics
    
    
    return response_data.business_page_views

}

export default getBusinessPageAnalytics
