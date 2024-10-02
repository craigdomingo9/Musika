import { Button } from "@/components/ui/button";
import useActionStore from "@/stores/ActionStore";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import { measurePrettier } from "@/utils/Analytics/utils";

function AnalyticsCompareMeasureSelect() {
    const { measure, changeMeasure } = useProductAnalyticsMeasureStore();
    const { secondaryActionOccured, toggleSecondaryActionOccurred } = useActionStore();

    const toggleMeasure = () => {
        const nextMeasure = measure.value === "views" ? "cart_adds" : "views";
        changeMeasure(nextMeasure, measurePrettier(nextMeasure));
        toggleSecondaryActionOccurred(!secondaryActionOccured);
    };

    return (
        <Button
            variant="ghost"
            onClick={toggleMeasure}
            className="grid w-full my-6 rounded-md border p-2 text-sm text-center"
            aria-label={`Change Measure to ${measure.value === "views" ? "Cart Adds" : "Views"}`}
        >
            Change Measure: {measure.name}
        </Button>
    );
}

export default AnalyticsCompareMeasureSelect;