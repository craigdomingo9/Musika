"use client";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getCategories from "@/utils/getCategories";
import { useEffect, useState } from "react";
import { UseFormSetValue } from 'react-hook-form';



type Props = {
    control: any;
    setValue: UseFormSetValue<
    { 
        name: string;
        logo: string; 
        description: string; 
        categories: string; 
        phone_number: string; 
        email: string; 
    }>;
}

function BusinessSignUpFormCategoryField({control, setValue}: Props) {
    const [data, setData] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [selected, setSelected] = useState<string[]>([]);



    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories<Category[]>();
                setData(categories)
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        }
        loadCategories()
    },[])

    const removeSelectedItem = (itemToRemove: string) => {
        setSelected((items) => items.filter(item => item !== itemToRemove));
    }

  return (
    <div>

        <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                  <FormControl>
                  <Select onValueChange={(value) => {
                    field.onChange;
                    if(!selected.includes(value)){
                        setSelected([...selected,value]);
                        setValue("categories",selected.join(', '));
                    }
                  }} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Add a category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {data.map((category) => (
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <div>
                {selected.map((item) => (
                    <Button key={item} variant={"outline"} onClick={() => removeSelectedItem(item)} className="text-xs m-1">
                        {item}
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        </span>
                    </Button>
                ))}
            </div>
    </div>
  )
}

export default BusinessSignUpFormCategoryField