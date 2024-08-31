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
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";



const BusinessSignupFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(50).max(1000),
    categories: z.string(),
    image: z.string().max(100),
    phoneNumber: z.string().min(10).max(100),
    email: z.string().email("Invalid email address"),
    city: z.string(),
    address: z.string(),
})

const CredentialsFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long')
})


function BusinessSignupForm() {

    const lastStep = 2;
    const [currentStep, setcurrentStep] = useState<1|typeof lastStep>(1)

    const form = useForm<z.infer<typeof BusinessSignupFormSchema>>({
        resolver: zodResolver(BusinessSignupFormSchema),
        defaultValues: {
            name: "",
            description: "",
            categories: "",
            image: "",
            phoneNumber: "",
            email: "",
            city: "",
            address: "",
        },
    })
    const credentialsForm = useForm<z.infer<typeof CredentialsFormSchema>>({
        resolver: zodResolver(CredentialsFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    async function onStep1Submit(values: z.infer<typeof BusinessSignupFormSchema>) {

    }

    async function onStep2Submit(values: z.infer<typeof CredentialsFormSchema>) {

    }

  return (
    <div>
        <p className="text-center text-sm font-semibold">Step {currentStep} / {lastStep}</p>
        {currentStep == 1 && (
           <div className="bg-white py-8 mt-2 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-center text-sm font-semibold">Business Account</p>
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
                    <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categories</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" {...field} />
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
        {currentStep == 2 && (
            "step 2"
        )}
    </div>
  )
}

export default BusinessSignupForm