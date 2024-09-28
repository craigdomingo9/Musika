"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Cookies from 'js-cookie';
import { toast } from "../ui/use-toast";
import { verifyToken } from "@/middleware/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckIcon, Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long')
})


function LoginForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    const [loadingState, setLoadingState] = useState<string>();
    const router = useRouter()
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoadingState("running");
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password',values.password);
        
        const url = "http://localhost:8000/auth/login/";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json"
            },
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

        Cookies.set('token', responseData.key, { expires: 7 });
        Cookies.set('email', responseData.email, { expires: 7 });

        setLoadingState("complete");
        toast({
            variant: "green",
            description: "Logged in successfully",
            duration: 3000,
        })

        setTimeout(() => {
            verifyToken(router);
        }, 1000);
        // Save the token or redirect user as needed
    }

    return (
<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div className="mt-8 mx-5 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <p className="text-2xl pb-5 text-center">Login to your account</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@example.com" className="text-sm" autoComplete="true" {...field} />
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
                                <Input placeholder="********" autoComplete="true" className="text-sm" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        
                    )}
                    />
                    <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                        
                        {!loadingState && "Login"}
                        {loadingState == "running" && <Loader2 className="mr-2 h-4 w-4 animate-spin transition-transform" />}
                        {loadingState == "complete" && <CheckIcon className="transition-transform animate-bounce" />}
                    </Button>
                </form>
                <p className="text-xs my-2">
                    Don't have an account.&nbsp;
                    <Link className="font-bold text-blue-500" href={"/signup"}>Click here to Sign up</Link>
                </p>
            </Form>
        </div>
    </div>
</div>
)
}

export default LoginForm