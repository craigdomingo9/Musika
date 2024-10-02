import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore";
import { useEffect, useState } from "react";
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

type DataPoint = { [key: string]: any; date: string }; // Define DataPoint type
type Instance = any; // Replace with your actual Instance type

type Props = {
    analytics_instances: DataPoint[],
    chartConfig: ChartConfig,
    days: number,
}

function AnalyticsCompareLineGraph({ analytics_instances, chartConfig, days }: Props) {
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<Instance[]>([]);
    const { measure } = useProductAnalyticsMeasureStore();
    const [keys, setKeys] = useState<string[]>([]);

    function calculateCumulative(data: DataPoint[]): DataPoint[] {
        const cumulative: { [key: string]: number } = {};
        const copy = data.map((item) => ({ ...item }));

        Object.keys(copy[0]).forEach((key) => {
            if (key !== "date") {
                if (!keys.includes(key)) {
                    setKeys((prevKeys) => [...prevKeys, key]); // Update keys using functional state
                }

                cumulative[key] = 0;
                copy.forEach((item) => {
                    cumulative[key] += item[key];
                    item[key] = cumulative[key];
                });
            }
        });

        return copy;
    }

    useEffect(() => {
        if (analytics_instances.length > 0) {
            const cumulativeData = calculateCumulative(analytics_instances);
            setAnalyticsCompareChartInstances(cumulativeData);
        }
    }, [analytics_instances]);

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
                            {analyticsCompareChartInstances.length > 0 ? (
                                <LineChart
                                    accessibilityLayer
                                    data={analyticsCompareChartInstances}
                                    margin={{ left: -35, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return date.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            });
                                        }}
                                    />
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
                                                    });
                                                }}
                                            />
                                        }
                                    />
                                    {keys.map((key) => (
                                        <Line
                                            key={key} // Added key prop
                                            dataKey={key}
                                            type="monotone"
                                            stroke={`var(--color-${makeCustomIdentifier(key)})`}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    ))}
                                </LineChart>
                            ) : (
                                <p>No data available for the selected date range.</p>
                            )}
                        </ChartContainer>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default AnalyticsCompareLineGraph;