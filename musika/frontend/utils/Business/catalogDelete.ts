import { toast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

async function catalogDelete(catalog: number,router: AppRouterInstance) {
    const url = `http://localhost:8000/api/products/catalogs/${catalog}`;

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

export default catalogDelete