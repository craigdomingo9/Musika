import { ChartConfig } from "@/components/ui/chart";
import useActionStore from "@/stores/ActionStore";
import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import { fix_date, makeCustomIdentifier } from "@/utils/Analytics/utils";
import { useEffect, useState } from "react";
import AnalyticsCompareChart from "./AnalyticsCompareChart";
import AnalyticsCompareLineGraph from "./AnalyticsCompareLineGraph";
import AnalyticsCompareLegend from "./AnalyticsCompareLegend";

function AnalyticsCompareChartsRenderer() {
    const { instances } = useProductAnalyticsCompareListStore();
    const [days, setDays] = useState<number>(30);
    const { measure } = useProductAnalyticsMeasureStore();
    const { secondaryActionOccured } = useActionStore();
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<DataPoint[]>([]);
    const [analyticsCompareChartConfig, setAnalyticsCompareChartConfig] = useState<ChartConfig>({});

    useEffect(() => {
        const analyticsInstances: DataPoint[] = [];

        for (let x = 0; x <= days; x++) {
            const date = fix_date(days, x);
            const analyticsInstance: DataPoint = { date: "" };

            instances.forEach((instance) => {
                analyticsInstance.date = date;

                if (measure.value === "views") {
                    const viewCount = instance.product_views.filter(view => view.view_date === date).length;
                    analyticsInstance[instance.product_details.name] = viewCount;
                }

                if (measure.value === "cart_adds") {
                    const cartAddCount = instance.product_bag_adds.filter(cart_add => cart_add.bag_add_date === date).length;
                    analyticsInstance[instance.product_details.name] = cartAddCount;
                }
            });

            analyticsInstances.push(analyticsInstance);
        }

        setAnalyticsCompareChartInstances(analyticsInstances);

        const chartConfig: ChartConfig = {};
        instances.forEach((instance, index) => {
            chartConfig[makeCustomIdentifier(instance.product_details.name)] = {
                label: instance.product_details.name,
                color: `hsl(var(--chart-${index + 1}))`
            };
        });

        setAnalyticsCompareChartConfig(chartConfig);

    }, [secondaryActionOccured, instances, days, measure]);

    return (
        <>
            {analyticsCompareChartInstances.length > 0 && (
                <>
                    <AnalyticsCompareChart 
                        analytics_instances={analyticsCompareChartInstances} 
                        chartConfig={analyticsCompareChartConfig} 
                        days={days} 
                    />
                    <AnalyticsCompareLegend chartConfig={analyticsCompareChartConfig} />
                    <AnalyticsCompareLineGraph 
                        analytics_instances={analyticsCompareChartInstances} 
                        chartConfig={analyticsCompareChartConfig} 
                        days={days} 
                    />
                </>
            )}
        </>
    );
}

export default AnalyticsCompareChartsRenderer;