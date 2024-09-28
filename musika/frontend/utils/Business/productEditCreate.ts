import { toast } from "@/components/ui/use-toast";



async function productEditCreate(data: FormData, edit: boolean) : Promise<[number,boolean]> {
    
    const url = edit ? 
    `http://localhost:8000/api/products/update/${data.get("id")}/`: 
    'http://localhost:8000/api/products/create/';

    console.log("yeah")

    const response = await fetch(url, {
        method: edit ? "PUT": "POST",
        body: data,
    });

    const responseData = await response.json();
    if (!response.ok) {
        toast({
            variant: "destructive",
            description: responseData.detail,
            duration: 1500,
        })
    }


    if (edit){
        return [1,response.ok];
    }

    const product_id = responseData?.id
    const productCreated = response.ok

    return [product_id,productCreated]

}

export default productEditCreate