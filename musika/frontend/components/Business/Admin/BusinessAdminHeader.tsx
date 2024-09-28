"use client";
import { Button } from "@/components/ui/button"
import logout from "@/utils/Credentials/logout"
import { useRouter } from "next/navigation";


function BusinessAdminHeader() {
  const router = useRouter();

  function logoutfn() {
    logout()
    router.push("/");
  }
  
  return (
    <header className="w-full grid sticky top-0 z-50 sm:w-[35rem] md:w-[40rem] lg:w-[42rem] xl:w-[50rem]  sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-between my-4 w-full">
            <div className="my-auto mx-4">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Dashboard</h1>
            </div>
            <div className="mx-4">
              <Button variant={"outline"} onClick={logoutfn} className="h-7 w-16 m-0 text-xs">Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default BusinessAdminHeader