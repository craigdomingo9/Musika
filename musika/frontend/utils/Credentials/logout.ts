import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Props = {
    router: AppRouterInstance;
}

function logout({router} : Props) {
    Cookies.remove("token")
    Cookies.remove("email")
    Cookies.remove("email")
    Cookies.remove("business_code");
    Cookies.remove("business_email");
    toast({
        variant: "green",
        description: "Logged out sucessfully.",
        duration: 3000,
    })
    router.refresh()
}

export default logout