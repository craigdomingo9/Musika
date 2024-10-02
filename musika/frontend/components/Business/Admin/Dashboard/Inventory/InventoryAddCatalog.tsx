"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
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
import { toast } from "@/components/ui/use-toast";
import useActionStore from "@/stores/ActionStore";

const CatalogSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(5).max(300),
    category: z.string(),
});

function InventoryAddCatalog() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const { secondaryActionOccured, toggleSecondaryActionOccurred } = useActionStore();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof CatalogSchema>>({
        resolver: zodResolver(CatalogSchema),
        defaultValues: {
            name: "Minimalist Fashion",
            description: "For the minimalist guys and girls",
        },
    });

    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);
            try {
                const categoriesData = await getCategories<Category[]>();
                setCategories(categoriesData);
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Failed to load categories.",
                });
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
        setDialogOpen(false);
    }, [secondaryActionOccured]);

    async function onSubmit(values: z.infer<typeof CatalogSchema>) {
        const formData = new FormData();
        const businessCode = getBusinessCode();
        const category = categories.find(cat => cat.name === values.category)?.id;

        formData.append("business", businessCode || "");
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", category?.toString() || "");

        try {
            const url = "http://localhost:8000/api/products/catalogs/create/";
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    description: responseData.detail,
                    duration: 1500,
                });
            } else {
                toast({
                    variant: "green",
                    description: responseData.detail,
                    duration: 3000,
                });
                toggleSecondaryActionOccurred(!secondaryActionOccured);
                setDialogOpen(false); // Close dialog on successful submission
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Failed to submit catalog.",
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
            <DialogTrigger onClick={() => setDialogOpen(true)} className="grid w-full my-6 rounded-md border p-2 text-sm">
                Create a catalog
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create catalog</DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catalog Name</FormLabel>
                                        <FormControl>
                                            <Input className="text-sm" placeholder="Minimalist Fashion" {...field} />
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
                                            <Textarea className="text-sm" placeholder="For the minimalist guys and girls." {...field} />
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
                                                field.onChange(value);
                                                form.setValue("category", value);
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Choose the category"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {loadingCategories ? (
                                                        <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                                                    ) : (
                                                        categories.map((category) => (
                                                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                                                        ))
                                                    )}
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
            </DialogContent>
        </Dialog>
    );
}

export default InventoryAddCatalog;