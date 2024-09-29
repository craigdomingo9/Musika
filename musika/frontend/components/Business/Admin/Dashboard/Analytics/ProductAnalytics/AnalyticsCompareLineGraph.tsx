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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { fix_date, makeCustomIdentifier } from "@/utils/Analytics/utils";




type Props = {
    analytics_instances: DataPoint[],
    chartConfig: ChartConfig,
    days: number,
}


function AnalyticsCompareLineGraph({analytics_instances,chartConfig,days}: Props) {
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<Instance[]>([])
    const {measure} = useProductAnalyticsMeasureStore();
    const {secondaryActionOccured} = useActionStore()
    const [keys, setKeys] = useState<string[]>([])

    
    function calculateCumulative(data: DataPoint[]): DataPoint[] {
        let cumulative: { [key: string]: number } = {};
        const copy = data.map((item) => ({...item}))

        Object.keys(copy[0]).forEach((key) => {
            if (key !== "date") {
                if (!keys.find((_key) => _key===key)) keys.push(key);

                cumulative[key] = 0;
                copy.forEach((item) => {
                    cumulative[key] += item[key];
                    item[`${key}`] = cumulative[key];
                });
            }
        });
        return copy;
    }


    useEffect(() => {
        
        // console.clear()

        if (analytics_instances.length > 0) {
            const cumulativeData = calculateCumulative(analytics_instances);
            setAnalyticsCompareChartInstances(cumulativeData);
        }


    },[secondaryActionOccured,analytics_instances])
    

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
                        config={chartConfig}
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
