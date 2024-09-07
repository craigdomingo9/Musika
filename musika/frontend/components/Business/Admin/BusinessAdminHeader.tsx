import { Button } from "@/components/ui/button"
import Link from "next/link"


function BusinessAdminHeader() {
  return (
    <header className="w-full grid sticky top-0 z-50 sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-between my-4 w-full">
            <div className="my-auto mx-4">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Dashboard</h1>
            </div>
            <div className="mx-4">
              <Button variant={"outline"} className="h-7 w-16 m-0 text-xs">Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default BusinessAdminHeader