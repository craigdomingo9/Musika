import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";


function logout() {
    Cookies.remove("token")
    Cookies.remove("email")
    Cookies.remove("business_code");
    Cookies.remove("business_email");
    toast({
        variant: "green",
        description: "Logged out sucessfully.",
        duration: 3000,
    })
}

export default logout