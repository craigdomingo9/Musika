import { toast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


async function ProfileditCreate(url: string, data: FormData, edit: boolean, token: string | undefined, router: AppRouterInstance){
    const response = await fetch(url, {
        method: edit ? "PUT": "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
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

    const responseData = await response.json();
    
    if(response.ok){
        toast({
            variant: "green",
            description: responseData.detail,
            duration: 3000,
        });
        router.refresh();
    }
}

export default ProfileditCreate;