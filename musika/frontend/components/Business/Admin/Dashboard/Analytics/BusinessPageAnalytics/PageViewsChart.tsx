"use client";
import { Activity } from "lucide-react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

type Props = {
    businessPageViews: BusinessPageView[];
};

const chartConfig = {
    views: {
        label: "Views",
        color: "hsl(var(--chart-1))",
        icon: Activity,
    },
} satisfies ChartConfig;

function PageViewsChart({ businessPageViews }: Props) {
    const [chartData, setChartData] = useState<PageViewsChartData[]>([]);

    useEffect(() => {
        const aggregatedData: { [key: string]: number } = {};

        businessPageViews.forEach((view: BusinessPageView) => {
            const date = view.view_date;
            aggregatedData[date] = (aggregatedData[date] || 0) + 1;
        });

        const _chartData = Object.entries(aggregatedData).map(([date, views]) => ({
            date,
            views,
        }));

        setChartData(_chartData);
    }, [businessPageViews]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chart - Store Views</CardTitle>
                <CardDescription>September - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout="horizontal"
                            margin={{ right: 16 }}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                dataKey="views"
                                type="number"
                                tickLine={false}
                                tickMargin={5}
                                axisLine={false}
                            />
                            <XAxis dataKey="date" type="category" />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Bar
                                dataKey="views"
                                layout="horizontal"
                                fill="var(--color-desktop)"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="views"
                                    position="top"
                                    offset={8}
                                    className="fill-[--color-label]"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                ) : (
                    <p className="text-center text-muted">No data available for the selected period.</p>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total views by date
                </div>
            </CardFooter>
        </Card>
    );
}

export default PageViewsChart;