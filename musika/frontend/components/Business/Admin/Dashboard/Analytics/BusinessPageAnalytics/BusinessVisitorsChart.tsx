import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";
import CityChart from "./CityChart";

type Props = {
    visitors: BusinessPageView[];
};

function BusinessVisitorsChart({ visitors }: Props) {
    return (
        <Card className="mt-5 mb-20 sm:mb-10">
            <CardHeader>
                <CardTitle>Store Visitors - {visitors.length}</CardTitle>
                <CardDescription>September - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                {visitors.length > 0 ? (
                    <>
                        <GenderChart visitors={visitors} />
                        <AgeChart visitors={visitors} />
                        <CityChart visitors={visitors} />
                    </>
                ) : (
                    <p className="text-center text-muted">No visitor data available.</p>
                )}
            </CardContent>
        </Card>
    );
}

export default BusinessVisitorsChart;