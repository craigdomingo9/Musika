import variables from "@/utils/variables";
import { Archive, Boxes } from "lucide-react";
import Image from "next/image";
import BusinessCatalogItem from "./BusinessCatalogItem";


type Props = {
    business: string,
}

async function BusinessCatalogs({business}: Props) {

    const url : string = `http://localhost:8000/api/products/catalogs/b/${business}`

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.catalogs,
        }
    }
    const response = await fetch(url,options);

    const business_catalogs = (await response.json()) as Catalog[];


  return (
    <div className="mx-2 grid grid-cols-2">
        {business_catalogs.map((catalog : Catalog) => (
            <BusinessCatalogItem key={catalog.id} catalog={catalog} />
        ))}
    </div>
  )
}

export default BusinessCatalogs