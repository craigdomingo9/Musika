import Link from "next/link"
import { Button } from "./ui/button"

function Header() {
  return (
    <header className="w-full grid sticky top-0 z-50 bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-between m-4 sm:mx-[10%] md:mx-[12%] lg:mx-[22%]">
            <Link href={"/"} className="my-auto">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Musika</h1>
            </Link>
            
            <Link href={"/login"}>
                <Button variant={"outline"}>
                    Login
                </Button>
            </Link>
        </div>
        
    </header>

  )
}

export default Header