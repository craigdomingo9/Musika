import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';


type Props = {
    chartConfig: ChartConfig;
};

function AnalyticsCompareLegend({ chartConfig }: Props) {
    return (
        <Card className='mt-4 grid place-items-center'>
            <CardContent>
                <div className="flex flex-wrap gap-2 pt-4 my-auto">
                    {Object.keys(chartConfig).map((key) => (
                        <div key={key} className="flex text-sm place-items-center gap-1">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: chartConfig[key].color }}
                                aria-label={`Color for ${chartConfig[key].label}`}
                            />
                            <span className="label">{chartConfig[key].label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default AnalyticsCompareLegend;