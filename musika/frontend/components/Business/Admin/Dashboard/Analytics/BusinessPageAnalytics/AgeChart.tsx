import {
    Card,
    CardContent,
    CardDescription,
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
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

type Props = { visitors: BusinessPageView[] };

const chartConfig = {
    age: {
        label: "Age",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

function AgeChart({ visitors }: Props) {
    const [chartData, setChartData] = useState<AgeChartData[]>([]);

    useEffect(() => {
        const aggregatedData = visitors.reduce((acc: { [key: string]: number }, view: BusinessPageView) => {
            const age = view.profile.age;
            acc[age] = (acc[age] || 0) + 1;
            return acc;
        }, {});

        const _chartData = Object.entries(aggregatedData).map(([age, frequency]) => ({
            age,
            frequency,
        }));

        setChartData(_chartData);
    }, [visitors]);

    return (
        <Card className="flex flex-col mt-5">
            <CardHeader className="items-center pb-0">
                <CardTitle>Visitors By Age</CardTitle>
                <CardDescription>September - December 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig}>
                    {chartData.length > 0 ? (
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: -20,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="age"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={3}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area
                                dataKey="frequency"
                                type="monotone"
                                fill="var(--color-age)"
                                fillOpacity={0.4}
                                stroke="var(--color-age)"
                                stackId="a"
                            />
                        </AreaChart>
                    ) : (
                        <p className="text-center text-muted">No visitor data available.</p>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default AgeChart;