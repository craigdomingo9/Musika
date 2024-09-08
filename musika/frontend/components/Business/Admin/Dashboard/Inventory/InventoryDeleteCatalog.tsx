"use client";
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
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import useActionStore from "@/stores/ActionStore"
import catalogDelete from "@/utils/Business/catalogDelete"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
  

  

type Props = {
    catalog: number
}

function InventoryDeleteCatalog({catalog}: Props) {
    const { secondaryActionOccured,toggleSecondaryActionOccurred } = useActionStore();



    async function deleteCatalog(){
        if (await catalogDelete(catalog)) {
            toast({
                variant: "green",
                description: "Catalog has been deleted successfully.",
                duration: 3000,
            })
            toggleSecondaryActionOccurred(!secondaryActionOccured);
        }
    }


    
  return (
    
    <AlertDialog>
        <AlertDialogTrigger className="w-full bg-red-50 grid place-items-center min-h-48 max-h-64 max-w-64 rounded-xl border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this catalog.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCatalog}>Continue</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default InventoryDeleteCatalog