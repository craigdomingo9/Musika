"use client";
import variables from "@/utils/variables";
import CategoryItems from "./CategoryItems";
import getCategories from "@/utils/getCategories";
import { useEffect, useState } from "react";

type Props = {
    name: string
}


function Categories({name}: Props) {

    const [data, setData] = useState<Category[]>([]);
    
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories<Category[]>();
                setData(categories)
            }
            catch (error) {
                console.log(error)
            }
        }
        loadCategories()
    },[])

    return (
    <div>
        <div className="flex sm:mx-[5%] overflow-x-scroll overflow-y-hidden pl-4 sm:pl-0">
            <CategoryItems categories={data} name={name}/>
        </div>
    </div>
    )
}

export default Categories