import { toast } from "@/components/ui/use-toast";


async function productImageCreate(url: string, data: FormData): Promise<boolean> {
    const response = await fetch(url, {
        method: "POST",
        body: data,
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

export default productImageCreate