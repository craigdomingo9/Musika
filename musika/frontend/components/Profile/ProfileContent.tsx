"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
    profile: Profile | undefined;
}

function ProfileContent({profile}: Props) {
    
    const router = useRouter();
    const [token, setToken] = useState<string | undefined>(" ")
    const [email, setEmail] = useState<string | undefined>(" ")

    useEffect(() => {
        const _token = Cookies.get("token");
        const _email = Cookies.get("email");
        
        setToken(_token);
        setEmail(_email);

        if (!token) {
            router.push("/login")
        }

    })


  return (
    <div className="mx-4">
        <p className="text-center font-bold">Profile</p>
        <p className="text-center font-bold text-sm">{email}</p>
        {token && (
            <div className="flex flex-col justify-center">
                <div className="mt-5 grid">
                    {profile?.profile_picture ? (
                        <Image
                        className="rounded-full w-80 h-80 object-cover mx-auto"
                        src={profile.profile_picture}
                        width={500}
                        height={500}
                        alt=""
                        />
                    ):(
                        <div className="rounded-full border-2 w-80 h-80 grid place-items-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16 my-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center pt-4"> 
                    <div className="text-lg text-center [&>p>span]:font-bold [&>p>span]:text-xl">
                        <p>First Name: <span>{profile?.first_name ? profile?.first_name : "Not Set"}</span></p>
                        <p>Last Name: <span>{profile?.last_name ? profile?.last_name : "Not Set"}</span></p>
                        <p>Phone Number: <span>{profile?.phone_number ? profile?.phone_number : "Not Set"}</span></p>
                        <p>Address: <span>{profile?.address ? profile?.address : "Not Set"}</span></p>
                        <p>Date of Birth: <span>{profile?.date_of_birth ? profile?.date_of_birth :"Not Set"}</span></p>
                    </div>
                </div>
                <Button className="py-8 text-md bg-amber-600 opacity-90 mt-5">
                    Edit Profile &nbsp;&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </Button>
            </div>
        )}
    </div>
  )
}

export default ProfileContent