"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import useProductAnalyticsCompareListStore from "@/stores/ProductAnalyticsCompareListStore";
import { useEffect } from "react";
import useProductAnalyticsMeasureStore from "@/stores/ProductAnalyticsMeasureStore";
import useActionStore from "@/stores/ActionStore";
import { makeCustomIdentifier } from "@/utils/Analytics/utils";

type Props = {
  analytics_instances: DataPoint[],
  chartConfig: ChartConfig,
  days: number,
}

function AnalyticsCompareChart({ analytics_instances, chartConfig, days }: Props) {
  const { instances } = useProductAnalyticsCompareListStore();
  const { measure } = useProductAnalyticsMeasureStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - {measure.name}</CardTitle>
        <CardDescription>
          Showing daily {measure.name} for the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analytics_instances.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={analytics_instances}
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              {instances.map((instance) => (
                <Area
                  key={instance.product_details.name} // Unique key prop
                  dataKey={instance.product_details.name}
                  type="monotone"
                  fill={`var(--color-${makeCustomIdentifier(instance.product_details.name)})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${instance.product_details.name})`}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ChartContainer>
        ) : (
          <p>No data available for the selected period.</p> // Fallback UI
        )}
      </CardContent>
    </Card>
  );
}

export default AnalyticsCompareChart;