import Cookies from "js-cookie";



async function getProfile<T>(): Promise<[boolean,T]> {
    const email = Cookies.get("email");
    const token = Cookies.get("token");
    const url = `http://localhost:8000/api/profiles/${email}`
    let profileNotFound = false;

    const response = await fetch(url,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const _profile : T = (await response.json());

    if (!response.ok) {
        profileNotFound = true;
    }

     

    return Promise.resolve([profileNotFound,_profile]);
    
}

export default getProfile