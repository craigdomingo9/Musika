import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast';
import useActionStore from '@/stores/ActionStore';
import useProductAnalyticsCompareListStore from '@/stores/ProductAnalyticsCompareListStore'
import { DialogDescription } from '@radix-ui/react-dialog';
import { PlusSquareIcon } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
    productAnalytics: ProductAnalytics[];
}

function AnalyticsCompareChartListAdd({productAnalytics}: Props) {
    const {instances,addInstance,removeFromList} = useProductAnalyticsCompareListStore();
    const {secondaryActionOccured,toggleSecondaryActionOccurred} = useActionStore();


    function addInstanceToStore(instance: ProductAnalytics) {
        addInstance(instance);
        toggleSecondaryActionOccurred(!secondaryActionOccured);
    }
    function removeInstanceFromStore(product: number) {
        removeFromList(product);
        toggleSecondaryActionOccurred(!secondaryActionOccured);
    }

    useEffect(() => {

        if (instances.length === 0 && productAnalytics.length > 0){
            addInstance(productAnalytics[0])
            toast({
                variant: "success",
                description: "Compare List cannot be empty.",
                duration: 1500,
              })
            toggleSecondaryActionOccurred(!secondaryActionOccured);
        }

    },[secondaryActionOccured])

  return (
    <div>
        <Dialog>
            <DialogTrigger className="grid w-full my-6 rounded-md border p-2 text-sm">
                Add a product to compare
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] grid">
            <DialogHeader>
                <DialogTitle>Select products to compare.</DialogTitle>
            </DialogHeader>
                <DialogDescription>
                    {instances.length > 0 && <span>Selected Products</span>}
                    <span className='block'>
                        {instances.map((instance: ProductAnalytics) => (  
                            <Button key={instance.product} variant={"outline"} onClick={() => removeInstanceFromStore(instance.product)} className="text-xs m-1">
                                {instance.product_details.name}
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                            </Button>
                        ))}
                    </span>
                </DialogDescription>
                
                {instances.length > 0 && <hr />}
                {productAnalytics.map((analytics_instance : ProductAnalytics,index) => (
                    <div key={analytics_instance.product}>
                        {!instances.find((instance) => instance.product === analytics_instance.product) && (
                            <div className='grid grid-cols-[85%_15%]'>
                                <div className='grid grid-cols-[10%_90%] border p-4 rounded-lg'>
                                    <p>{index+1}</p>
                                    <p>{analytics_instance.product_details.name}</p>
                                </div>
                                <div className='grid h-full place-items-center mx-2'>
                                    <Button variant={"secondary"} onClick={() => addInstanceToStore(analytics_instance)}  className='h-14'>
                                        <PlusSquareIcon />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </DialogContent>
      </Dialog>
    </div>
  )
}

export default AnalyticsCompareChartListAdd