import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import productEditCreate from "@/utils/Business/productEditCreate";
import productImageCreate from "@/utils/Business/productImageCreate";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getBusinessCode from "@/utils/Business/getBusinessCode";
import useActionStore from "@/stores/ActionStore";


type Props = {
    catalog: number,
    category: number,
}


const ProductCreateSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(300),
    images: z.array(z.instanceof(File))
            .min(1, 'At least one image is required.'),
    price: z.string(),
    on_sale: z.boolean(),
    sale_price: z.string().optional(),
    inventory_quantity: z.number().positive(),
})



function InventoryCatalogAddProduct({catalog,category}: Props) {
    const [imagePreviews, setImagePreviews] = useState<string[] | null>(null);

    const { actionOccurred, toggleActionOccurred } = useActionStore();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    const form = useForm<z.infer<typeof ProductCreateSchema>>({
        resolver: zodResolver(ProductCreateSchema),
        defaultValues: {
            name: "Organic Fertilizer",
            description: "For your domestic crops to flourish.",
            price: "25",
            on_sale: false,
            sale_price: "",
            inventory_quantity: 1,
            images: [],
        }
    });

    const editQuantity = (action: string) => {
        if (action == "increment") {
            form.setValue("inventory_quantity",(form.getValues("inventory_quantity")+1))
        }
        if (action == "decrement") {
            form.setValue("inventory_quantity",(form.getValues("inventory_quantity")-1))
        }
    }

    const handleImageChange = (files: FileList | null) => {
        
        if (files) {
            const newFilesArray = Array.from(files);
            
            // Get existing files from the form state
            const existingFiles = form.getValues("images") || [];
    
            // Combine existing files with new files
            const combinedFiles = [...existingFiles, ...newFilesArray];

            // Generate previews for all files
            const previews = combinedFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
            
            // Update the form state with the combined files
            form.setValue("images", combinedFiles);
            console.log(form.getValues("images"));
            
            return combinedFiles; // Return combined files if needed
        }
        return [];
    };

    const onSubmit = async (data: z.infer<typeof ProductCreateSchema>) => {
        console.log("-------")
        const formData = new FormData();
        const businessCode = getBusinessCode();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append("business",businessCode ? businessCode : "")
        formData.append('catalog', catalog.toString());
        formData.append('category', category.toString());
        formData.append('on_sale', String(data.on_sale));
        formData.append('sale_price', data.on_sale ? String(data.sale_price) : "0");
        formData.append('inventory_quantity', String(data.inventory_quantity));


        const [product_id,productCreated] = await productEditCreate(formData,false)

        if (productCreated) {
            const url = `http://localhost:8000/api/products/images/create/`;
            

            data.images?.map(async (image) => {
                const ImageFormData = new FormData();
                ImageFormData.append("product",product_id.toString())
                ImageFormData.append("image",image)
                await productImageCreate(url,ImageFormData);
            })

            toggleActionOccurred(true);
            
        }
    }

    useEffect(() => {

        form.setValue(
            "images", [],
        )
        setImagePreviews([])
        setDialogOpen(false);

    },[actionOccurred])


  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
        <DialogTrigger onClick={() => setDialogOpen(true)} className="w-full bg-green-50 grid place-items-center min-h-48 max-h-64 max-w-64 rounded-xl border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                    Create your product here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
                <Tabs defaultValue="details" className="min-h-full">
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input className="text-sm" placeholder="eg. Water Bottle." autoComplete="true" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea className="text-sm" placeholder="Product Description." autoComplete="true" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input className="text-sm" placeholder="eg. $20" autoComplete="true" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="on_sale"
                            render={({ field }) => (
                                <FormItem className="flex mb-5 flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormLabel>Sale</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sale_price"
                            disabled={form.getValues("on_sale") ? false : true}
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Sale Price</FormLabel>
                                        <FormControl>
                                            <Input className="text-sm" placeholder="eg. $10" autoComplete="true" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="inventory_quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity in Stock</FormLabel>
                                        <FormControl>
                                            <div className="flex">
                                                <Button className="w-10 bg-color mx-2" onClick={() => editQuantity("decrement")}>
                                                    -
                                                </Button>
                                                <Input type="number" className="text-sm w-10 text-center sm:w-16" {...field} />
                                                <Button className="w-10 bg-color mx-2" onClick={() => editQuantity("increment")}>
                                                    +
                                                </Button>
                                            </div>
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </TabsContent>
                    <TabsContent value="images" className="min-h-[34rem]">
                        <div className="flex flex-wrap">
                            {imagePreviews?.map((imagePreview,index) => (
                                <div key={imagePreview} className="relative w-1/2">
                                    <Image
                                    key={imagePreview}
                                    src={imagePreview}
                                    alt="Image Preview"
                                    height={1000}
                                    width={1000}
                                    className="mt-4 border mx-auto w-36 h-36 object-cover"
                                    priority
                                    />
                                </div>

                            ))}
                        </div>
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field : { onChange} }) => (
                                <FormItem>
                                    <FormLabel>Product Images</FormLabel>
                                        <FormControl>
                                            <div className="grid">
                                                <Input
                                                type="file" 
                                                accept="image/*" 
                                                multiple
                                                className="file-input text-xs"
                                                onChange={(e) => {
                                                    const files = handleImageChange(e.target.files);
                                                    onChange(files); // Set files in form state
                                                }}
                                                />
                                            </div>
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                        </TabsContent>
                    <DialogFooter>
                        <Button type="submit" className="mt-5">Save</Button>
                    </DialogFooter>
                </Tabs>
            </form>
        </Form>

            
        </DialogContent>
    </Dialog>
  )
}

export default InventoryCatalogAddProduct