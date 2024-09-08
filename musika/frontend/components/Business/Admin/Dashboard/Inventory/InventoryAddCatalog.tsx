"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import getCategories from "@/utils/getCategories";
import getBusinessCode from "@/utils/Business/getBusinessCode";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";


const CatalogSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(5).max(300),
    category: z.string(),
})

function InventoryAddCatalog() {
    const [data, setData] = useState<Category[]>([]);
    const router = useRouter();


    const form = useForm<z.infer<typeof CatalogSchema>>({
        resolver: zodResolver(CatalogSchema),
        defaultValues: {
            name: "Minimalist Fashion",
            description: "For the minimalist guys and girls",
            
        }
    })

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories<Category[]>();
                setData(categories)
            } catch{}
        }
        loadCategories()
    },[])


    async function onSubmit(values: z.infer<typeof CatalogSchema>) {
        const formData = new FormData();

        const businessCode = getBusinessCode();
        const category = data.filter((category) => category.name == values.category)[0].id

        formData.append("business",businessCode ? businessCode : "")
        formData.append("name",values.name)
        formData.append("description",values.description)
        formData.append("category", category.toString())

        try {
            const url = "http://localhost:8000/api/products/catalogs/create/";

            const response = await fetch(url, {
                method: "POST",
                body: formData
            })

            const responseData = await response.json()

            if (!response.ok){
                toast({
                    variant: "destructive",
                    description: responseData.detail,
                    duration: 1500,
                })
            }

            if(response.ok){
                toast({
                    variant: "green",
                    description: responseData.detail,
                    duration: 3000,
                });
                router.refresh();
            }

        } catch {}
    }

  return (
    <Dialog>
      <DialogTrigger className="grid w-full my-6 rounded-md border p-2 text-sm">
            Create a catalog
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create catalog</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Catalog Name</FormLabel>
                                <FormControl>
                                    <Input className="text-sm" placeholder="Minimalist Fashion" autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="text-sm" placeholder="For the minimalist guys and girls." autoComplete="true" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                                <FormControl>
                                <Select onValueChange={(value) => {
                                    field.onChange;
                                    form.setValue("category",value);
                                }}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Choose the category"} />
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

                <DialogFooter>
                    <Button type="submit">Create Catalog</Button>
                </DialogFooter>
            </form>
            </Form>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

export default InventoryAddCatalog