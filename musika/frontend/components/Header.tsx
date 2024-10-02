"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProfileIcon from "./Navigation/ProfileIcon";
import SearchBar from "./SearchBar";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Header() {
    
    const [searching, setSearching] = useState<boolean>(false)

    useEffect(() => {

    },[searching])


  return (
    <header className="w-full py-4 max-h-16 min-h-12 sticky top-0 z-50 sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className={cn("grid grid-cols-2 mx-4", searching && "grid-cols-1")}>
            {!searching ? (
            <>
                <Link href={"/"} className="my-auto">
                    <h1 className="font-bold align-middle text-slate-600 my-auto">Musika</h1>
                </Link>
            
                <div className="flex justify-end">
                    <SearchIcon 
                    onClick={() => setSearching(!searching)} />
                </div>
            </>
            ): (

            <SearchBar 
                setSearching={setSearching} 
                searching={searching} 
            />
            )}

        </div>
    </header>

  )
}

export default Header