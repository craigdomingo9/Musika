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
} from "@/components/ui/chart"
import { useEffect, useState } from "react";
import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";
import CityChart from "./CityChart";

type Props = {
    visitors: BusinessPageView[];
}



function BusinessVisitorsChart({visitors}: Props) {
    

  return (
    <Card className="mt-5 mb-20 sm:mb-10">
        <CardHeader>
            <CardTitle>Store Visitors - {visitors.length}</CardTitle>
            <CardDescription>September - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <GenderChart visitors={visitors} />
            <AgeChart visitors={visitors} />
            <CityChart visitors={visitors} />
        </CardContent>
    </Card>
  )
}

export default BusinessVisitorsChart