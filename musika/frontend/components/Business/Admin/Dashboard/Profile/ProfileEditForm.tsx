"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
type Props = {
    business: BusinessDetails;
}



const profileEditFormSchema = z.object({
    name: z.string().min(2).max(60),
    description: z.string().min(10).max(300),
    logo: z.instanceof(File),
})


function ProfileEditForm({business}: Props) {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof profileEditFormSchema>>({
        resolver: zodResolver(profileEditFormSchema),
        defaultValues: {
            name: business.name,
            description: business.description,
            
        },
    })

    async function setImageDefaultfn(imageUrl: string){
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const blob_ext = blob.type.split("/")[1]
        const file = new File([blob], `profile_picture.${blob_ext}`, { type: blob.type });

        return file;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
          }
        }
    };

    async function onSubmit(data: z.infer<typeof profileEditFormSchema>){
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description',data.description);
        formData.append('logo',data.logo);

        const url = `http://localhost:8000/api/business/${business.code}/update/`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                accept: "application/json"
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast({
                variant: "destructive",
                description: "Failed to update Profile.",
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


    useEffect(() => {
        if (business){
            setImagePreview(business.logo);
            setImageDefaultfn(business.logo)
            .then(file => {
                if (file) {
                    form.setValue("logo",file);
                    // console.log(file)
                }
            })
        }
    },[business])

    
  return (
    <div>
        <div className='flex mt-4 justify-center text-sm font-semibold opacity-'>
            <p>Edit your Business Profile.</p>
        </div>
        {business && (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3 mb-20">
            <FormField
            control={form.control}
            name="logo"
            render={({ field : { onChange} }) => (
                <FormItem>
                    <FormLabel>Business Logo</FormLabel>
                        <FormControl>
                            <div className="grid">
                                <Input
                                type="file" 
                                accept="image/*" 
                                className="file-input text-xs"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        onChange(e.target.files[0]); // Set the first file
                                        handleImageChange(e);
                                    }
                                }}
                                />
                                {imagePreview && (
                                    <Image
                                    src={imagePreview}
                                    alt="Image Preview"
                                    height={1000}
                                    width={1000}
                                    className="mt-4 border rounded-full mx-auto w-80 h-80 object-cover"
                                    priority
                                    />
                                )}
                            </div>
                        </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Description</FormLabel>
                                <FormControl>
                                    <Textarea className="text-sm" autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button className="bg-amber-600 opacity-90 hover:bg-amber-600 hover:opacity-50 w-full" type="submit">
                    Update Profile
                </Button>
            </form>
            </Form>
        )}
    </div>
  )
}

export default ProfileEditForm