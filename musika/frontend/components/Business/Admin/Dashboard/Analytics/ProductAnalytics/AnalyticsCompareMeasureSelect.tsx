import { Button } from "@/components/ui/button"
import useActionStore from "@/stores/ActionStore";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import { useState } from "react"



function AnalyticsCompareMeasureSelect() {
    const {measure, changeMeasure} = useProductAnalyticsMeasureStore();
    const {secondaryActionOccured,toggleSecondaryActionOccurred} = useActionStore()

    function capitalizeFirstLetter(word: string): string {
        if (!word) return ''; // Handle empty strings
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    const measurePrettier = (measure: string) => {
        return measure.split("_").map((word: any) => word = capitalizeFirstLetter(word)).join(" ")
    }
    
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
