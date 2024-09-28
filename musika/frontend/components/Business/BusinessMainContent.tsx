import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductItems from "../ProductItems"
import variables from "@/utils/variables"
import BusinessCatalogs from "./BusinessCatalogs"
import BusinessLocation from "./BusinessLocation"

type Props = {
    business: string,
    business_locations: BusinessLocation[]
}


async function BusinessMainContent({business,business_locations}: Props) {
    const url = `http://localhost:8000/api/products/b/${business}/`

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.products,
        }
    }
    const response = await fetch(url,options);
    const business_products = (await response.json()) as Product[];


  return (
    <header className=" min-w-full justify-center">
        <Tabs className="min-w-full grid items-center" defaultValue="products">
            <TabsList className="grid grid-cols-3 sticky top-16 z-50 mb-4">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="catalogs">Catalogs</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="grid place-items-center grid-cols-2 min-w-full">
                <ProductItems products={business_products} row={false} page="business" />
            </TabsContent>
            <TabsContent value="catalogs">
                <BusinessCatalogs business={business} />
            </TabsContent>
            <TabsContent value="location">
                <BusinessLocation business_locations={business_locations} />
            </TabsContent>
        </Tabs>

    </header>
  )
}

export default BusinessMainContent