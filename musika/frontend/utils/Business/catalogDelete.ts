import { toast } from "@/components/ui/use-toast";


async function catalogDelete(catalog: number) {
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

    return response.ok;
}

export default catalogDelete