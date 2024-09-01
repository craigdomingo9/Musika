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
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";



const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long'),
    confirm_password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long')
    
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})


function BusinessSignUpCredentialsForm() {

    const router = useRouter();
    const email = Cookies.get("business_email");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: `${email}`,
          password: "",
          confirm_password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            const url = "http://localhost:8000/auth/signup/is_business=1/";
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

            toast({
                variant: "green",
                description: "Signed up successfully",
                duration: 4000,
            })

            router.push("/login");

            // Save the token or redirect user as needed
        } catch (error: any) {
            console.error('Error:', error.message);
        }

    }

  return (
    <div>
        <p className="text-center text-xs font-semibold">Finish setting up your account</p>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input disabled className="text-sm" placeholder="example@example.com" autoComplete="true" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input className="text-sm" placeholder="********" autoComplete="true" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input className="text-sm" placeholder="********" autoComplete="true" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                        Submit
                    </Button>
                </form>
                </Form>
    </div>
  )
}

export default BusinessSignUpCredentialsForm