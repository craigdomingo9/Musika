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
import useActionStore from "@/stores/ActionStore";

type Props = {
    business: BusinessDetails;
};

const profileEditFormSchema = z.object({
    name: z.string().min(2).max(60),
    description: z.string().min(10).max(300),
    logo: z.instanceof(File).optional(), // Made optional for initial load
});

function ProfileEditForm({ business }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const {tertiaryActionOccured,toggleTertiaryActionOccurred} = useActionStore()

    const form = useForm<z.infer<typeof profileEditFormSchema>>({
        resolver: zodResolver(profileEditFormSchema),
        defaultValues: {
            name: business.name,
            description: business.description,
        },
    });

    const setImageDefaultfn = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const blobExt = blob.type.split("/")[1];
            const file = new File([blob], `profile_picture.${blobExt}`, { type: blob.type });
            form.setValue("logo", file); // Set the logo in form state
        } catch (error) {
            console.error("Failed to set default image: ", error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (file) {
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
                form.setValue("logo", file); // Set the logo in form state
            }
        }
    };

    const onSubmit = async (data: z.infer<typeof profileEditFormSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        if (data.logo) {
            formData.append("logo", data.logo);
        }

        const url = `http://localhost:8000/api/business/${business.code}/update/`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    accept: "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to update Profile.");
            }

            const responseData = await response.json();
            toast({
                variant: "green",
                description: responseData.detail,
                duration: 3000,
            });
            toggleTertiaryActionOccurred(!tertiaryActionOccured);
        } catch (error) {
            toast({
                variant: "destructive",
                description: (error as Error).message,
                duration: 1500,
            });
        }
    };

    useEffect(() => {
        if (business) {
            setImagePreview(business.logo);
            setImageDefaultfn(business.logo); // Fetch and set the default logo image
        }
    }, [business]);

    return (
        <div>
            <div className='flex mt-4 justify-center text-sm font-semibold'>
                <p>Edit your Business Profile.</p>
            </div>
            {business && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3 mb-20">
                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Logo</FormLabel>
                                    <FormControl>
                                        <div className="grid">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="file-input text-xs"
                                                onChange={handleImageChange}
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
    );
}

export default ProfileEditForm;