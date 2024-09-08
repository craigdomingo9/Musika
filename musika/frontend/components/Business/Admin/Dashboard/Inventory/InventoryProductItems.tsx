import getCatalogProducts from "@/utils/Business/getCatalogProducts";
import { useEffect, useState } from "react";
import InventoryProductItem from "./InventoryProductItem";
import InventoryDeleteCatalog from "./InventoryDeleteCatalog";
import InventoryCatalogAddProduct from "./InventoryCatalogAddProduct";
import useActionStore from "@/stores/ActionStore";


type Props = {
    catalog: number,
    category: number,
}

function InventoryProductItems({catalog,category}: Props) {

    const [products, setProducts] = useState<Product[]>()
    const { actionOccurred, toggleActionOccurred } = useActionStore();

    useEffect(() => {
        async function loadCatalogs(){
            const catalogs_data = await getCatalogProducts(catalog);
            setProducts(catalogs_data);
        }
        loadCatalogs()

        
        toggleActionOccurred(false);
    },[actionOccurred])

  return (
    <div className="w-full grid grid-cols-2 gap-2 place-items-center">
        {products && products.map((product) => (
            <InventoryProductItem key={product.id} product={product} />
        ))}
        <InventoryCatalogAddProduct catalog={catalog} category={category} />
        <InventoryDeleteCatalog catalog={catalog} />
    </div>
  )
}

export default InventoryProductItems