import Cookies from "js-cookie";



async function getProfile<T>() {
    const email = Cookies.get("email");
    const url = `http://localhost:8000/api/profiles/${email}`
    try {
        const response = await fetch(url,{
            method: "GET",
        });
        const _profile : T = (await response.json());

        return _profile;
    
    } catch (error: any) {
    // console.log(error);
    }
    
}

export default getProfile