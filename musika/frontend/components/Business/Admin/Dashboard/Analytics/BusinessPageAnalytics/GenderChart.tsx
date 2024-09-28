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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";


type Props = {
    visitors: BusinessPageView[];
}


const chartConfig = {
    female: {
      label: "Female",
      color: "hsl(var(--chart-1))",
    },
    male: {
      label: "Male",
      color: "hsl(var(--chart-2))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig

function GenderChart({visitors}: Props) {
    const [chartData, setChartData] = useState<PageVisitorsBySexChartData[]>([])
    
    useEffect(() => {
        let _chartData: PageVisitorsBySexChartData[] = [];
        visitors.map((view: BusinessPageView) => {
            if (_chartData.find((record) => record.gender === view.profile.gender)){
                const existingRecord = _chartData.find((record) => record.gender === view.profile.gender);
                if (existingRecord) existingRecord["gender"] += 1
            }
            if (!_chartData.find((record) => record.gender === view.profile.gender)){
                _chartData = [..._chartData,{
                    gender: view.profile.gender,
                    frequency: 1
                }]
            }
        })
        setChartData(_chartData)

    },[visitors])

  return (
    <div>
        <div>
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Visitors By Sex</CardTitle>
                    <CardDescription>September - December 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{
                    right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                    dataKey="gender"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    
                    />
                    <XAxis dataKey="frequency" type="number" />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                    dataKey="frequency"
                    layout="vertical"
                    fill="var(--color-male)"
                    radius={4}
                    >
                    <LabelList
                        dataKey="gender"
                        position="insideLeft"
                        offset={8}
                        className="fill-[--color-label]"
                        fontSize={12}
                    />
                    <LabelList
                        dataKey="frequency"
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    </Bar>
                </BarChart>
                </ChartContainer>

                </CardContent>
            </Card>

        </div>
    </div>
  )
}

export default GenderChart