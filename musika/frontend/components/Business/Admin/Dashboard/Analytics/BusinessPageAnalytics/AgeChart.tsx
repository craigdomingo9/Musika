import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"
    
import {
ChartConfig,
ChartContainer,
ChartLegend,
ChartLegendContent,
ChartTooltip,
ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react";
import { Bar, AreaChart, Area, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";



type Props = {visitors: BusinessPageView[]}


const chartConfig = {
    age: {
      label: "Age",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig


function AgeChart({visitors}: Props) {
    const [chartData, setChartData] = useState<AgeChartData[]>([])
    
    useEffect(() => {
        let _chartData: AgeChartData[] = [];
        visitors.map((view: BusinessPageView) => {
            if (_chartData.find((record) => record.age === view.profile.age)){
                const existingRecord = _chartData.find((record) => record.age === view.profile.age);
                if (existingRecord) existingRecord["age"] += 1
            }
            if (!_chartData.find((record) => record.age === view.profile.age)){
                _chartData = [..._chartData,{
                    age: view.profile.age,
                    frequency: 1
                }]
            }
        })
        setChartData(_chartData)

    },[visitors])

  return (
    <Card className="flex flex-col mt-5">
        <CardHeader className="items-center pb-0">
            <CardTitle>Visitors By Age</CardTitle>
            <CardDescription>September - December 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig}>
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
                    type="bump"
                    fill="var(--color-age)"
                    fillOpacity={0.4}
                    stroke="var(--color-age)"
                    stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default AgeChart