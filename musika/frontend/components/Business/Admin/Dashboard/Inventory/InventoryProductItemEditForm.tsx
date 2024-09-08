import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import productEditCreate from "@/utils/Business/productEditCreate";
import productImageCreate from "@/utils/Business/productImageCreate";
import { toast } from "@/components/ui/use-toast";
import InventoryProductItemEditFormDeleteImageButton from "./InventoryProductItemEditFormDeleteImageButton";
import useActionStore from "@/stores/ActionStore";



type Props = {
    product: Product
}

const ProductEditSchema = z.object({
    name: z.string().min(2).max(100),
    images: z.array(z.instanceof(File))
            .min(1, 'At least one image is required.'),
    description: z.string().min(5),
    price: z.string(),
    on_sale: z.boolean(),
    sale_price: z.string().optional(),
    inventory_quantity: z.number().positive(),
})



function InventoryProductItemEditForm({product}: Props) {
    const base_url = "http://localhost:8000";
    const [imagePreviews, setImagePreviews] = useState<string[] | null>(null);
    const [defaultImages, setDefaultImages] = useState<File[] | null>(null);
    const { actionOccurred, toggleActionOccurred } = useActionStore();
    
    const form = useForm<z.infer<typeof ProductEditSchema>>({
        resolver: zodResolver(ProductEditSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            on_sale: product.on_sale,
            sale_price: product.sale_price,
            inventory_quantity: product.inventory_quantity,
            images: [],
        }
    });

    async function setImagesDefaultfn(imageUrl: string) {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const blobExt = blob.type.split("/")[1];
        const file = new File([blob], `image.${blobExt}`, { type: blob.type });
        return file;
    }

    useEffect(() => {
        
        form.setValue(
            "images",[]
        )
        const loadImages = async () => {
            const files = await Promise.all(
                product.images.map(async (image) => {
                    const _image = `${base_url}${image.image}`;
                    const file = await setImagesDefaultfn(_image);
                    return file;
                })
            );
            setDefaultImages([...files]);

            // Set the images in form state
            form.setValue("images", files);
            // Create image previews
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        };

        loadImages();

    },[product,actionOccurred])


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

   
    
    const onSubmit = async (data: z.infer<typeof ProductEditSchema>) => {
        const formData = new FormData();
        formData.append("id", product.id.toString());
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('on_sale', String(data.on_sale));
        formData.append('sale_price', data.on_sale ? String(data.sale_price) : "0");
        formData.append('inventory_quantity', String(data.inventory_quantity));



        const [_,productUpdated] = await productEditCreate(formData,true)
        

        function getImagesToUpload(newImages: File[] | undefined){
            return newImages?.filter(image => !defaultImages?.includes(image));
        }


        
        if (productUpdated) {
            const url = `http://localhost:8000/api/products/images/create/`;
            const ImagesToUpload = getImagesToUpload(data.images);

            
            
            try {
                ImagesToUpload?.map(async (image) => {
                    const ImageFormData = new FormData();
                    ImageFormData.append("product",product.id.toString())
                    ImageFormData.append("image",image)
                    await productImageCreate(url,ImageFormData)   
                })
            } catch {
                console.log("Error occured.");
            }
            finally {
                toast({
                    variant: "green",
                    description: "Product has been changed successfully.",
                    duration: 3000,
                });
                toggleActionOccurred(!actionOccurred);
            }
        }
    };

  return (
    
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
                                    
                                    {defaultImages && defaultImages?.length > 1 && (
                                        <InventoryProductItemEditFormDeleteImageButton product={product} index={index} />
                                    )}
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
                        <Button type="submit" className="mt-5">Save changes</Button>
                    </DialogFooter>
                </Tabs>
            </form>
        </Form>
    
  )
}

export default InventoryProductItemEditForm