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
import BusinessSignUpLocationForm from "./BusinessSignUpLocationForm";


const BusinessSignupFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(30).max(1000),
    categories: z.string(),
    logo: z.string().max(100),
    phone_number: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' })
    .regex(/^\d+$/, { message: 'Phone number must only contain digits' }),
    email: z.string().email("Invalid email address"),
})

const CredentialsFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long')
})



type Props = {
    step: number;
}


function BusinessSignupForm({step}: Props) {
    const router = useRouter();

    const lastStep = 2;
    const [currentStep, setcurrentStep] = useState<number>(1)

    const email = Cookies.get("business_email");


    useEffect(() => {
        if (step) {
            setcurrentStep(step);
            if (!email && step > 1) {
                router.push("signup?step=1")
            }
        } else {
            router.push("signup?step=1")
        }
    },[currentStep])


    const form = useForm<z.infer<typeof BusinessSignupFormSchema>>({
        resolver: zodResolver(BusinessSignupFormSchema),
        defaultValues: {
            name: "Mudiwa Clothing",
            description: "eg. Mudiwa Clothing offers the latest trends in clothing and accessories for all ages.",
            categories: "",
            logo: "",
            phone_number: "263719867907",
            email: "mudiwaclothing@gmail.com",
        },
    })

    const credentialsForm = useForm<z.infer<typeof CredentialsFormSchema>>({
        resolver: zodResolver(CredentialsFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            form.setValue("logo", `C:\\fakepath\\${file.name}`)
          }
        }
    };


    async function onStep1Submit(values: z.infer<typeof BusinessSignupFormSchema>) {
        try {
            const url = "http://localhost:8000/api/business/create/";

            const options: RequestInit = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }

            const response = await fetch(url, options);

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
                setcurrentStep(2);
                router.push("signup?step=2");


                const business_email = responseData["email"];
                const business_code = responseData["business_code"];

                Cookies.set("business_email",business_email,{ expires: 1 })
                Cookies.set("business_code",business_code,{ expires: 1 })
            }

        } catch (error: any) {
            console.error('Error:', error.message);
        }
    }

    async function onStep2Submit(values: z.infer<typeof CredentialsFormSchema>) {
        
    }

  return (
    <div>
        <p className="text-center text-sm font-semibold">Step {currentStep} / {lastStep}</p>
           <div className="bg-white py-8 mt-2 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-center text-sm font-semibold">Business Account</p>
                {currentStep == 1 && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onStep1Submit)} className="space-y-8">
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Logo</FormLabel>
                                <FormControl>
                                    <div className="grid">
                                        <Input {...field}
                                        id="picture" 
                                        type="file" 
                                        accept="image/*" 
                                        className="file-input text-xs"
                                        onChange={handleImageChange}
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
                                        <Input className="text-xs pl-8" type="tel" placeholder="eg. 263719867908" autoComplete="true" {...field} />
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
                        {currentStep < lastStep ? "Next": "Submit"}
                    </Button>
                </form>
                <p className="text-xs my-2">
                    Already have an account.&nbsp;
                    <Link className="font-bold text-blue-500" href={"/login"}>Log in</Link>
                </p>
            </Form>
        )}
           </div>
        {currentStep == 2 && (
            <BusinessSignUpLocationForm />
        )}
        
    </div>
  )
}

export default BusinessSignupForm