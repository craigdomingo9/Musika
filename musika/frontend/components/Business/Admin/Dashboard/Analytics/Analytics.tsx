import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BusinessPageAnalytics from './BusinessPageAnalytics'
import ProductAnalytics from "./ProductAnalytics"

function Analytics() {
  return (
    <div className='mx-2'>
      
      <Tabs defaultValue={"products_analytics"} className='max-w-full sm:m-4'>
            <div className='overflow-scroll max-w-full'>
                <TabsList className='overflow-x-scroll flex'>
                    <TabsTrigger value="business_analytics">Business Page</TabsTrigger>
                    <TabsTrigger value="products_analytics">Products</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="business_analytics">
                <BusinessPageAnalytics />
            </TabsContent>
            <TabsContent value="products_analytics">
                <ProductAnalytics />
            </TabsContent>
            
        </Tabs>
    </div>
  )
}

export default Analytics
