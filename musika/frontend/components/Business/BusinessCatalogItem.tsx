import { Archive } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { Button } from "../ui/button";


type Props = {
    catalog: Catalog,
}

function BusinessCatalogItem({catalog}: Props) {
    const base_url : string = "http://localhost:8000";

  return (
    <Link href={{
        pathname: "/catalog",
        query: {
            id: catalog.id
        }
    }}>
        <div className="w-full border-2 rounded-lg max-w-48">
            <div>
                {catalog?.category?.image ? 
                <Image src={`${base_url}${catalog?.category?.image}`} width={500} height={500} alt="Catalog Image" /> 
                :
                <Archive className="w-full size-28" strokeWidth={0.5}/>
            }
            </div>
            <div className="p-2 border-t border-dashed">
                <p className="font-bold opacity-80 text-md">{catalog.name}</p>
                <p className="font-bold opacity-50 text-sm">{catalog.category.name}</p>
                <Button variant={"secondary"} className="w-full mt-2">View Catalog</Button>
            </div>
        </div>
    </Link>
  )
}

export default BusinessCatalogItem