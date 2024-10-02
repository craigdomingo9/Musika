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
import useActionStore from "@/stores/ActionStore";

function Inventory() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { secondaryActionOccured } = useActionStore();

    useEffect(() => {
        async function loadCatalogs() {
            setLoading(true);
            try {
                const catalogs_data = await getCatalogs();
                setCatalogs(catalogs_data);
            } catch (err) {
                setError("Failed to load catalogs. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        loadCatalogs();
    }, [secondaryActionOccured]);

    return (
        <div className="mx-4 mb-20">
            <InventoryAddCatalog />

            <p className="text-lg font-bold underline">Inventory</p>

            {loading && <p className="text-center text-sm">Loading catalogs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {catalogs.length === 0 && !loading && <p>No catalogs available.</p>}

            <div>
                <Accordion type="single" collapsible defaultValue="catalog-1">
                    {catalogs.map((catalog, i) => (
                        <AccordionItem value={`catalog-${i}`} key={catalog.id}>
                            <AccordionTrigger>{catalog.name}</AccordionTrigger>
                            <AccordionContent>
                                <InventoryProductItems catalog={catalog.id} category={catalog.category?.id} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default Inventory;