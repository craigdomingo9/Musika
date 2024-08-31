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
    .max(100, 'Password must be no more than 100 characters long'),
})



function CustomerSignUpForm() {
    const lastStep = 1;
    const [currentStep, setcurrentStep] = useState<1|typeof lastStep>(1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          confirm_password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const url = "http://localhost:8000/auth/signup/";
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

            Cookies.set('token', responseData.key, { expires: 7 });

            toast({
                variant: "green",
                description: "Signed up successfully",
                duration: 1500,
            })

            // Save the token or redirect user as needed
        } catch (error: any) {
            console.error('Error:', error.message);
        }

    }


  return (
    <div>
        <p className="text-center text-sm font-semibold">Step {currentStep} / {lastStep}</p>
        {currentStep == 1 && (
            <div className="bg-white py-8 mt-2 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-center text-sm font-semibold">Customer Account</p>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@example.com" autoComplete="true" {...field} />
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
                            <Input placeholder="********" autoComplete="true" type="password" {...field} />
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
                            <Input placeholder="********" autoComplete="true" type="password" {...field} />
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
            </div>
        )}
    </div>
  )
}

export default CustomerSignUpForm