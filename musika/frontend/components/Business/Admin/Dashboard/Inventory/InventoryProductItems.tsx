import getCatalogProducts from "@/utils/Business/getCatalogProducts";
import { useEffect, useState } from "react";
import InventoryProductItem from "./InventoryProductItem";
import InventoryDeleteCatalog from "./InventoryDeleteCatalog";
import InventoryCatalogAddProduct from "./InventoryCatalogAddProduct";
import useActionStore from "@/stores/ActionStore";

type Props = {
    catalog: number;
    category: number;
};

function InventoryProductItems({ catalog, category }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { actionOccurred, toggleActionOccurred } = useActionStore();

    useEffect(() => {
        const loadCatalogs = async () => {
            setLoading(true);
            try {
                const catalogs_data = await getCatalogProducts(catalog);
                setProducts(catalogs_data);
            } catch (error) {
                console.error("Failed to load products", error);
                // Optionally handle error state here
            } finally {
                setLoading(false);
            }
        };

        loadCatalogs();

        // Reset action state
        toggleActionOccurred(false);
    }, [actionOccurred]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
    }

    return (
        <div className="w-full grid grid-cols-2 gap-2 place-items-center">
            {products.map((product) => (
                <InventoryProductItem key={product.id} product={product} />
            ))}
            <InventoryCatalogAddProduct catalog={catalog} category={category} />
            <InventoryDeleteCatalog catalog={catalog} />
        </div>
    );
}

export default InventoryProductItems;