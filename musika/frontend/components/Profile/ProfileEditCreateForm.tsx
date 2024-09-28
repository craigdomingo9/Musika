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
import { toast } from "../ui/use-toast";
import ProfileditCreate from "@/utils/Profile/profileEditCreate";


type Props = {
    profile: Profile | undefined,
    editProfile: boolean,
}


const profileEditCreateFormSchema = z.object({
    first_name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
    gender: z.string().min(2).max(100),
    age: z.string().min(1).max(3),
    phone_number: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' })
    .regex(/^\d+$/, { message: 'Phone number must only contain digits' }),
    profile_picture: z.instanceof(File),
    address: z.string().min(2).max(100),
    city: z.string(),
})


function ProfileEditCreateForm({profile,editProfile}: Props) {

    const router = useRouter();
    const [token, setToken] = useState<string | undefined>(" ")
    const [email, setEmail] = useState<string | undefined>(" ");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    

    const form = useForm<z.infer<typeof profileEditCreateFormSchema>>({
        resolver: zodResolver(profileEditCreateFormSchema),
        defaultValues: {
            first_name: profile ? profile.first_name : "",
            last_name: profile ? profile.last_name : "",
            gender: profile ? profile.gender : "",
            age: profile ? profile.age : "",
            phone_number: profile ? profile.phone_number : "",
            address: profile ? profile.address : "",
            city: profile ? profile.city : "",
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


    useEffect(() => {
        
        const _email = Cookies.get("email");
        setEmail(_email);
        const _token = Cookies.get("token");
        setToken(_token);
        
        if (profile){
            setImagePreview(profile.profile_picture);
            setImageDefaultfn(profile.profile_picture)
            .then(file => {
                if (file) {
                    form.setValue("profile_picture",file);
                    // console.log(file)
                }
            })
        }
    },[])


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
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name',data.last_name);
        formData.append('profile_picture',data.profile_picture);
        formData.append('phone_number',data.phone_number);
        formData.append('age',data.age);
        formData.append('gender',data.gender);
        formData.append('address',data.address);
        formData.append('city',data.city);
        formData.append(editProfile ? 'credentials':'email',email ? email : "");

        
        const url = 
            editProfile ? 
                "http://localhost:8000/api/profiles/edit"
                : 
                "http://localhost:8000/api/profiles/create";
        
        ProfileditCreate(url,formData,editProfile,token,router);
        
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
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" placeholder="18" autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        field.onChange;
                                        form.setValue("gender",value);
                                    }}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={profile?.gender ? profile.gender : "Choose your gender"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <Select onValueChange={(value) => {
                                    field.onChange;
                                    form.setValue("city",value);
                                }}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={profile ? profile.city : "Choose your city"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities.map((city) => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
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