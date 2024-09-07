import Cookies from "js-cookie";

function getBusinessCode(){
    const code = Cookies?.get("business_code");
    return code;
}

export default getBusinessCode