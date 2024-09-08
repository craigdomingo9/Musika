"use client";
import getCatalogs from "@/utils/Business/getCatalogs";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import InventoryProductItems from "./InventoryProductItems";
import InventoryAddCatalog from "./InventoryAddCatalog";
import { useRouter } from "next/navigation";
import useActionStore from "@/stores/ActionStore";
  


function Inventory() {
    const [catalogs, setCatalogs] = useState<Catalog[]>()
    const { secondaryActionOccured,toggleSecondaryActionOccurred } = useActionStore();

    useEffect(() => {
        async function loadCatalogs(){
            const catalogs_data = await getCatalogs();
            setCatalogs(catalogs_data);
        }
        loadCatalogs()

    },[secondaryActionOccured])

  return (
    <div className="mx-4 mb-20">
        <InventoryAddCatalog /> 
        
        <p className="text-lg font-bold underline">Inventory</p>

        <div>
            <Accordion type="single" collapsible defaultValue="catalog-1">
                {catalogs && catalogs.map((catalog,i) => (
                    <AccordionItem value={`catalog-${i}`} key={catalog.id}>
                        <AccordionTrigger>{catalog.name}</AccordionTrigger>
                        <AccordionContent>
                            <InventoryProductItems catalog={catalog.id} category={catalog.category.id} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
                
            </Accordion>

        </div>

    </div>
  )
}

export default Inventory