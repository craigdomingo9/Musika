import { toast } from "@/components/ui/use-toast";

async function productDelete(id: string, isDeleteImage: boolean) {
    const url = isDeleteImage ?
    `http://localhost:8000/api/products/images/delete/${id}/`:
    `http://localhost:8000/api/products/delete/${id}/`;

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

export default productDelete