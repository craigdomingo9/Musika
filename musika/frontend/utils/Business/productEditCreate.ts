import { toast } from "@/components/ui/use-toast";



async function productEditCreate(url: string, data: FormData, edit: boolean) : Promise<boolean> {
    
    const response = await fetch(url, {
        method: edit ? "PUT": "POST",
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

export default productEditCreate