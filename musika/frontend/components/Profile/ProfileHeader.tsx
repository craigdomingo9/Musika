"use client";
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Cookies from "js-cookie";

function ProfileHeader() {

  const router = useRouter();

  function logout() {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("email");
    Cookies.remove("business_code");
    Cookies.remove("business_email");
    toast({
        variant: "green",
        description: "Logged out sucessfully.",
        duration: 3000,
    })
    router.push("/");
  }

  return (
    <header className="w-full grid sticky top-0 z-50 sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-between my-4 w-full">
            <Link href={"/"} className="my-auto mx-4">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Musika</h1>
            </Link>
            <div className="mx-4">
              <Button variant={"outline"} className="h-7 w-16 m-0 text-xs" onClick={logout}>Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default ProfileHeader