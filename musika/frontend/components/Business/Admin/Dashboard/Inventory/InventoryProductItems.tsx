import getCatalogProducts from "@/utils/Business/getCatalogProducts";
import { useEffect, useState } from "react";
import InventoryProductItem from "./InventoryProductItem";


type Props = {
    catalog: number;
}

function InventoryProductItems({catalog}: Props) {

    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        async function loadCatalogs(){
            const catalogs_data = await getCatalogProducts(catalog);
            setProducts(catalogs_data);
        }
        loadCatalogs()
    },[])

  return (
    <div className="w-full grid grid-cols-2 gap-2 place-items-center mb-16">
        {products && products.map((product) => (
            <InventoryProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}

export default InventoryProductItems