"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import { verifyToken } from "@/middleware/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import BusinessSignUpFormCategoryField from "./Forms/BusinessSignUpFormCategoryField";
import Image from "next/image";
import Cookies from 'js-cookie';


const BusinessSignupFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(30).max(1000),
    categories: z.string(),
    logo: z.instanceof(File),
    phone_number: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' })
    .regex(/^\d+$/, { message: 'Phone number must only contain digits' }),
    email: z.string().email("Invalid email address"),
})

function BusinessSignUpCreateBusinessForm() {

    const router = useRouter();

    const form = useForm<z.infer<typeof BusinessSignupFormSchema>>({
        resolver: zodResolver(BusinessSignupFormSchema),
        defaultValues: {
            name: "Mudiwa Clothing",
            description: "eg. Mudiwa Clothing offers the latest trends in clothing and accessories for all ages.",
            categories: "",
            logo: undefined,
            phone_number: "263719867907",
            email: "mudiwaclothing@gmail.com",
        },
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
          }
        }
    };

    async function onSubmit(data: z.infer<typeof BusinessSignupFormSchema>) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('categories', data.categories); // Handle optional
        formData.append('logo', data.logo); // Append the logo file if it exists
        formData.append('phone_number', data.phone_number);
        formData.append('email', data.email);


        
        try {
            const url = "http://localhost:8000/api/business/create/";

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });


            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    variant: "destructive",
                    description: errorData.detail,
                    duration: 1500,
                })
                throw new Error(errorData.detail || 'Login failed');
            }

            const responseData = await response.json();
            
            if(response.ok){
                toast({
                    variant: "success",
                    description: responseData.detail,
                    duration: 3000,
                })
                router.push("signup?step=2");


                const business_email = responseData["business_email"];
                const business_code = responseData["business_code"];

                Cookies.set("business_email",business_email,{ expires: 1 })
                Cookies.set("business_code",business_code,{ expires: 1 })
            }

        } catch (error: any) {
            console.error('Error:', error.message);
        }
    }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-5 sm:mb-0">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Business Name</FormLabel>
                        <FormControl>
                            <Input className="text-sm" placeholder="eg. Mudiwa Clothing" autoComplete="true" {...field} />
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
                    <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea className="text-sm" placeholder="eg. Mudiwa Clothing offers the latest trends in clothing and accessories for all ages." {...field} />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <BusinessSignUpFormCategoryField setValue={form.setValue} control={form.control} />
            <FormField
            control={form.control}
            name="logo"
            render={({ field : { onChange, onBlur, ref } }) => (
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
                                    height={300}
                                    width={300}
                                    className="mt-4 border rounded-full mx-auto"
                                    style={{ maxWidth: '100%', height: 'auto' }}
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
            name="phone_number"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone number</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <p className="absolute left-4 top-[.375rem] py-auto">+</p>
                                <Input className="text-sm pl-8" type="tel" placeholder="eg. 263719867908" autoComplete="true" {...field} />
                            </div>
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input className="text-sm" type="email" placeholder="example@example.com" autoComplete="true" {...field} />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                Next
            </Button>
        </form>
    <p className="text-xs my-2">
        Already have an account.&nbsp;
        <Link className="font-bold text-blue-500" href={"/login"}>Log in</Link>
    </p>
</Form>
  )
}

export default BusinessSignUpCreateBusinessForm