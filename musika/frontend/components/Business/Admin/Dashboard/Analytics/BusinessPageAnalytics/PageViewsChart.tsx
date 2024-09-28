"use client"

import { Activity, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react";


type Props = {
    businessPageViews: BusinessPageView[];
}


const chartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  } satisfies ChartConfig





function PageViewsChart({businessPageViews}: Props) {
    const [chartData, setChartData] = useState<PageViewsChartData[]>([])


    useEffect(() => {
        let _chartData: PageViewsChartData[] = [];
        businessPageViews.map((view: BusinessPageView) => {
            if (_chartData.find((record) => record.date === view.view_date)){
                const existingRecord = _chartData.find((record) => record.date === view.view_date);
                if (existingRecord) existingRecord["views"] += 1
            }
            if (!_chartData.find((record) => record.date === view.view_date)){
                _chartData = [..._chartData,{
                    date: view.view_date,
                    views: 1
                }]
            }
        })
        // console.log(_chartData,chartData)
        setChartData(_chartData)
    },[businessPageViews])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart - Store Views</CardTitle>
        <CardDescription>September - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total views by date
        </div>
      </CardFooter>
    </Card>

  )
}

export default PageViewsChart