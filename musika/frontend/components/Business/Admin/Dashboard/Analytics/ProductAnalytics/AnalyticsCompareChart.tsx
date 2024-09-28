"use client";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore"
import { useEffect, useState } from "react";
import fix_date from "@/utils/Analytics/fix_date";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import useActionStore from "@/stores/ActionStore";




function AnalyticsCompareChart() {
    const {instances} = useProductAnalyticsCompareListStore()
    const [analyticsCompareChartInstances, setAnalyticsCompareChartInstances] = useState<Instance[]>([])
    const [analyticsCompareChartConfig, setAnalyticsCompareChartConfig] = useState<ChartConfig>({})
    const [days, setDays] = useState<number>(30)
    const {measure} = useProductAnalyticsMeasureStore();
    const {secondaryActionOccured} = useActionStore()



    const makeCustomIdentifier = (name: string) : string => {
      return name.split(" ").join("_").toLowerCase()
    }
    

    useEffect(() => {
        let analytics_instances: Instance[] = [];
        for (let x=0;x<=days;x++){
            const date = fix_date(days,x);
            let analytics_instance: Instance[] = [];
            
            instances.map((instance) => {
                if (measure.value === "views") {
                    analytics_instance.push({
                        name: instance.product_details.name,
                        measure: instance.product_views.find((view) => view.view_date === date) ? instance.product_views.length : 0
                    })
                }else if (measure.value === "cart_adds") {
                    analytics_instance.push({
                        name: instance.product_details.name,
                        measure: instance.product_bag_adds.find((cart_add) => cart_add.bag_add_date === date) ? instance.product_bag_adds.length : 0
                    })
                }
            })

            const data = analytics_instance.reduce((acc,curr) => {
                acc["date"] = date
                acc[curr.name] = curr.measure;
                return acc;
            },{} as Instance
            )
            analytics_instances.push(data)
        }
        setAnalyticsCompareChartInstances(analytics_instances)

        
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - {measure.name}</CardTitle>
        <CardDescription>
          Showing daily {measure.name} for the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={analyticsCompareChartConfig}>
          <AreaChart
            accessibilityLayer
            data={analyticsCompareChartInstances}
            margin={{
              left: -20,
              right: 12,
            }}
          >
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
              }}
            />
            
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            
            {instances.map((instance) => (
                <>
                    <Area
                    dataKey={instance.product_details.name}
                    type="bump"
                    fill={`var(--color-${makeCustomIdentifier(instance.product_details.name)})`}
                    fillOpacity={0.4}
                    stroke={`var(--color-${instance.product_details.name})`}
                    stackId="a"
                  />
              </>
            ))}
          </AreaChart>
        </ChartContainer>

      </CardContent>
    </Card>

  )
}

export default AnalyticsCompareChart
