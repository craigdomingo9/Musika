import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore"
import { useEffect, useState } from "react"
import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "@/components/ui/card";
	import {
		ChartConfig,
		ChartContainer,
		ChartLegend,
		ChartLegendContent,
		ChartTooltip,
		ChartTooltipContent,
	} from "@/components/ui/chart";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import useActionStore from "@/stores/ActionStore";
import fix_date from "@/utils/Analytics/fix_date";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";



interface DataPoint {
    date: string;
    [key: string]: any;
  }


function AnalyticsCompareLineGraph() {
    const {instances} = useProductAnalyticsCompareListStore()
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<Instance[]>([])
    const [analyticsCompareChartConfig, setAnalyticsCompareChartConfig] = useState<ChartConfig>({})
    const [days, setDays] = useState<number>(30)
    const {measure} = useProductAnalyticsMeasureStore();
    const {secondaryActionOccured} = useActionStore()
    const [keys, setKeys] = useState<string[]>([])

    
    function calculateCumulative(data: DataPoint[]): DataPoint[] {
        let cumulative: { [key: string]: number } = {};

        Object.keys(data[0]).forEach((key) => {
            if (key !== "date") {
                if (!keys.find((_key) => _key===key)) keys.push(key);

                cumulative[key] = 0;
                data.forEach((item) => {
                    cumulative[key] += item[key];
                    item[`${key}`] = cumulative[key];
                });
            }
        });
        return data;
    }

    const makeCustomIdentifier = (name: string) : string => {
        return name.split(" ").join("_").toLowerCase()
    }
    
    useEffect(() => {

        console.clear()
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

        if (analytics_instances) {
            const cumulativeData = calculateCumulative(analytics_instances);
            setAnalyticsCompareChartInstances(cumulativeData);
        }

        let _chartConfig: ChartConfig = {};
        instances.map((instance,index) => {
            _chartConfig[
            makeCustomIdentifier(instance.product_details.name)
            ] = {
                label: instance.product_details.name,
                color: `hsl(var(--chart-${index+1}))`
            }
        })
        
        setAnalyticsCompareChartConfig(
            _chartConfig
        )
        
    },[secondaryActionOccured])
    
    console.log(keys)

    return (
        <div className="mb-20 mt-4">
            <Card>
            <CardHeader>
                <CardTitle>Line Chart - {measure.name}</CardTitle>
                <CardDescription>
                    Showing total {measure.name} for the last {days} days
                </CardDescription>
                <CardContent>
                    <ChartContainer
                        config={analyticsCompareChartConfig}
                        className="aspect-auto h-[300px] w-full"
                        >
                        <LineChart
                            accessibilityLayer
                            data={analyticsCompareChartInstances}
                            margin={{
                            left: -35,
                            right: 12,
                        }}>

                            <CartesianGrid vertical={false} />

                            <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                })
                            }}/>
                            <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
                            />

                            <ChartTooltip
                                content={
                                <ChartTooltipContent
                                className="w-[150px]"
                                nameKey="views"
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    })
                                }}
                                />
                            }
                            />
                            {keys && keys.map((key) => (
                                <>
                                    <Line
                                    dataKey={key}
                                    type="monotone"
                                    stroke={`var(--color-${makeCustomIdentifier(key)})`}
                                    strokeWidth={2}
                                    dot={false}
                                    />
                                    

                                </>
                                
                            ))}

                            
                        </LineChart>
                           
                    </ChartContainer>
                </CardContent>
            </CardHeader>
            </Card>
        </div>
    )
}

export default AnalyticsCompareLineGraph
