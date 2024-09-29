import { Button } from "@/components/ui/button"
import useActionStore from "@/stores/ActionStore";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import { measurePrettier } from "@/utils/Analytics/utils";



function AnalyticsCompareMeasureSelect() {
    const {measure, changeMeasure} = useProductAnalyticsMeasureStore();
    const {secondaryActionOccured,toggleSecondaryActionOccurred} = useActionStore()
    
    
    
    const change = () => {
        measure.value == "views" && changeMeasure("cart_adds",measurePrettier("cart_adds"));
        measure.value == "cart_adds" && changeMeasure("views",measurePrettier("Views"));
        toggleSecondaryActionOccurred(!secondaryActionOccured)
    }

  return (
    <Button variant={"ghost"} onClick={change}  className="grid w-full my-6 rounded-md border p-2 text-sm text-center">
       
       Change Measure : {measure.name}
      
    </Button>
  )
}

export default AnalyticsCompareMeasureSelect
