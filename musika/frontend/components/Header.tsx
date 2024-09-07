"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProfileIcon from "./Navigation/ProfileIcon";

function Header() {
    
    const [token, setToken] = useState<string>()
    const [businessCode, setBusinessCode] = useState<string>()

    useEffect(() => {
        setToken(Cookies?.get("token"));
        setBusinessCode(Cookies?.get("business_code"));
    },[token,businessCode])

    console.log(token,businessCode)

  return (
    <header className="w-full grid sticky top-0 z-50 sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-between m-4">
            <Link href={"/"} className="my-auto">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Musika</h1>
            </Link>

            {token ? (
                <Link href={businessCode ? `/b/${businessCode}/admin/` : "/profile?edit=1"}>
                    {businessCode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        </svg>
                    ):(
                        <ProfileIcon active={true} />
                    )}
                </Link>
            ) : (
                <Link href={"/login"}>
                    <Button variant={"outline"}>
                        Login
                    </Button>
                </Link>
            )}
        </div>
    </header>

  )
}

export default Header