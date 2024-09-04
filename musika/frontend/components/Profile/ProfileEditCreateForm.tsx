"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cities } from "@/utils/extras";


type Props = {
    profile: Profile | undefined,
    editProfile: boolean,
}


const profileEditCreateFormSchema = z.object({
    first_name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
    phone_number: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' })
    .regex(/^\d+$/, { message: 'Phone number must only contain digits' }),
    profile_picture: z.instanceof(File).optional(),
    address: z.string().min(2).max(100),
    city: z.string(),
})


function ProfileEditCreateForm({profile,editProfile}: Props) {


    const [email, setEmail] = useState<string | undefined>(" ")
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    // console.log(profile)
    

    useEffect(() => {
        
        const _email = Cookies.get("email");
        setEmail(_email);
        if (profile){
            setImagePreview(profile.profile_picture)
        }
    },[])

    const form = useForm<z.infer<typeof profileEditCreateFormSchema>>({
        resolver: zodResolver(profileEditCreateFormSchema),
        defaultValues: {
            first_name: profile ? profile.first_name : "Brandon",
            last_name: profile ? profile.last_name : "William",
            phone_number: profile ? profile.phone_number : "263776808964",
            address: profile ? profile.address : "5007 Kuwadzana",
            city: profile ? profile.city : "Harare",
        },
    })


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
          }
        }
    };

    async function onSubmit(data: z.infer<typeof profileEditCreateFormSchema>) {
        console.log("------------")
        console.log(data)
    }


  return (
    <div className="p-4 w-full grid place-items-center">
        
        <p className="text-center text-xs font-semibold opacity-90">
        {!profile ? (
            "Create your profile."
        ):(
            "Edit your profile."
        )}
        </p>

        <div className="w-[95%] mb-16 sm:w-[30rem] shadow sm:rounded-lg p-4 mt-3">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
            <FormField
            control={form.control}
            name="profile_picture"
            render={({ field : { onChange} }) => (
                <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
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
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" placeholder="Tafadzwa" autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" placeholder="Muchemwa" autoComplete="true" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <p className="absolute left-4 top-[.375rem] py-auto">+</p>
                                        <Input className="text-sm pl-8" type="tel" placeholder="263719867908" autoComplete="true" {...field} />
                                    </div>
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input className="text-sm" placeholder="56785 Warren Park" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                        <Select defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={profile ? profile.city : "Choose your city"} />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city} defaultValue={profile ? profile.city : ""} value={city}>{city}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-amber-600 opacity-90 hover:bg-amber-600 hover:opacity-50 w-full" type="submit">
                    {!profile ? "Create Profile" : "Update Profile"}
                </Button>
            </form>
            </Form>
        </div>
    </div>
  )
}

export default ProfileEditCreateForm