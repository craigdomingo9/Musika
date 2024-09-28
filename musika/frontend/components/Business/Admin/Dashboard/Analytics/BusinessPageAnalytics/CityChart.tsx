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
    label: {
        color: "hsl(var(--background))",
      },
    city: {
      label: "city",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig


function CityChart({visitors}: Props) {
    const [chartData, setChartData] = useState<CityChartData[]>([])
    
    useEffect(() => {
        let _chartData: CityChartData[] = [];
        visitors.map((view: BusinessPageView) => {
            if (_chartData.find((record) => record.city === view.profile.age)){
                const existingRecord = _chartData.find((record) => record.city === view.profile.city);
                if (existingRecord) existingRecord["city"] += 1
            }
            if (!_chartData.find((record) => record.city === view.profile.city)){
                _chartData = [..._chartData,{
                    city: view.profile.city,
                    frequency: 1
                }]
            }
        })
        setChartData(_chartData)

    },[visitors])
  return (
    <Card className="flex flex-col mt-5">
        <CardHeader className="items-center pb-0">
            <CardTitle>Visitors By City</CardTitle>
            <CardDescription>September - December 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig}>
            <BarChart
            accessibilityLayer
            data={chartData}
            layout="horizontal"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="frequency"
              type="number"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <XAxis dataKey="city" type="category" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="frequency"
              layout="horizontal"
              fill="var(--color-city)"
              radius={4}
            >
              <LabelList
                dataKey="frequency"
                position="top"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              
            </Bar>
          </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default CityChart