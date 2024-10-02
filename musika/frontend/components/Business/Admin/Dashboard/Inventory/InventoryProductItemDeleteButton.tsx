import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast";
import productDelete from "@/utils/Business/productDelete";
import useActionStore from "@/stores/ActionStore";

type Props = {
    product: Product;
};

function InventoryProductItemDeleteButton({ product }: Props) {
    const router = useRouter();
    const { actionOccurred, toggleActionOccurred } = useActionStore();

    async function deleteProduct() {
        try {
            const success = await productDelete(product.id.toString(), false);
            if (success) {
                toast({
                    variant: "success", // Use a defined success variant
                    description: "Product was deleted successfully.",
                    duration: 1500,
                });
                toggleActionOccurred(!actionOccurred);
                // Optionally redirect or update the state
                // router.push('/path-to-redirect'); // Uncomment if you want to redirect
            } else {
                toast({
                    variant: "destructive", // Use a defined error variant
                    description: "Failed to delete the product. Please try again.",
                    duration: 3000,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred while deleting the product.",
                duration: 3000,
            });
        }
    }

    return (
        <div className="grid overflow-clip">
            <AlertDialog>
                <AlertDialogTrigger className="flex justify-center items-center w-full max-w-12 sm:max-w-16 md:max-w-20 lg:max-w-24 rounded-none bg-red-400 text-white rounded-br-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteProduct}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default InventoryProductItemDeleteButton;