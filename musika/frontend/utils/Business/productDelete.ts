import { toast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


async function productDelete(id: string, isDeleteImage: boolean, router:AppRouterInstance) {
    const url = isDeleteImage ?
    `http://localhost:8000/api/products/images/delete/${id}/`:
    `http://localhost:8000/api/products/${id}`
    ;

    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        const errorData = await response.json();
        toast({
            variant: "destructive",
            description: errorData.detail,
            duration: 1500,
        })
    }
    if (response.ok) {
        router.refresh();
    }

    return response.ok;
    
}

export default productDelete