"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


type CategoryItemsProps = {
    categories: Category[];
    name: string;
}


function CategoryItems({categories,name}: CategoryItemsProps) {
    return (
        <div className="flex">
            <Link href={"/"}>
                <Button className={cn("m-2 ml-0 bg-white text-black font-bold text-xs rounded",!name && "bg-color hover:bg-color hover:text-white font-bold rounded text-white")} >
                    All
                </Button>
            </Link>
            
            {categories.map((category) => (
                
                <div key={category.id} className={cn(!category.has_products && "hidden")}>
                    <Link href={{
                    pathname: '/explore',
                    query: {
                        category: category?.name,
                    }
                    }}>
                        <Button variant={"outline"} className={cn("m-2 h-10 text-xs bg-white hover:bg-white hover:cursor-pointer opacity-70 font-bold text-black",category.name == name && "bg-amber-700 hover:bg-amber-700 hover:text-white font-bold rounded text-white")}>
                            {category.name}
                        </Button>
                    </Link>
              </div>
            ))}
        </div>
    )
}

export default CategoryItems
