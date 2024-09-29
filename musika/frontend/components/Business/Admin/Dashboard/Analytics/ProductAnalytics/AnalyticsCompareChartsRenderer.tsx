import { ChartConfig } from "@/components/ui/chart"
import useActionStore from "@/stores/ActionStore"
import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore"
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore"
import { fix_date, makeCustomIdentifier } from "@/utils/Analytics/utils"
import { useEffect, useState } from "react"
import AnalyticsCompareChart from "./AnalyticsCompareChart"
import AnalyticsCompareLineGraph from "./AnalyticsCompareLineGraph"
import AnalyticsCompareLegend from "./AnalyticsCompareLegend"



function AnalyticsCompareChartsRenderer() {
	const {instances} = useProductAnalyticsCompareListStore()
	const [days, setDays] = useState<number>(30)
	const {measure} = useProductAnalyticsMeasureStore();
	const {secondaryActionOccured} = useActionStore()
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<DataPoint[]>([])
    const [analyticsCompareChartConfig, setAnalyticsCompareChartConfig] = useState<ChartConfig>({})
	


	useEffect(() => {
		let analytics_instances: DataPoint[] = [];
		for (let x=0;x<=days;x++){
			const date = fix_date(days,x);
			let analytics_instance: DataPoint = {date: ""};
			
			instances.map((instance) => {
				if (measure.value === "views") {
					analytics_instance['date'] = date;
					analytics_instance[instance.product_details.name] = instance.product_views.find((view) => view.view_date === date) ? instance.product_views.length : 0
				}
				if (measure.value === "cart_adds") {
					analytics_instance['date'] = date;
					analytics_instance[instance.product_details.name] = instance.product_bag_adds.find((cart_add) => cart_add.bag_add_date === date) ? instance.product_bag_adds.length : 0
				}
			})
			
			analytics_instances.push(analytics_instance)
		}
		setAnalyticsCompareChartInstances(analytics_instances);
        
        let chartConfig: ChartConfig = {};
		instances.map((instance,index) => {
			chartConfig[
			makeCustomIdentifier(instance.product_details.name)
			] = {
				label: instance.product_details.name,
				color: `hsl(var(--chart-${index+1}))`
			}
		})
        setAnalyticsCompareChartConfig(chartConfig);


	},[secondaryActionOccured])

  return (
	<>
	{analyticsCompareChartInstances  && (
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
  )
}

export default AnalyticsCompareChartsRenderer
