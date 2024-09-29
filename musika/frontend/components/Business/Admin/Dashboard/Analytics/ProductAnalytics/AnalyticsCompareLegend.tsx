import { Card, CardContent } from '@/components/ui/card'
import { ChartConfig } from '@/components/ui/chart'



type Props = {
    chartConfig: ChartConfig
}

function AnalyticsCompareLegend({chartConfig}: Props) {
  return (
    <Card className='mt-4 grid place-items-center'>
        <CardContent>

            <div className="flex flex-wrap gap-2 pt-4 my-auto">
            {Object.keys(chartConfig).map((key, index) => (
                <div key={index} className="flex text-sm place-items-center gap-1">
                <span
                    className="w-2 h-2 rounded-[50%]"
                    style={{ backgroundColor: chartConfig[key].color }}
                />
                <span className="label">{chartConfig[key].label}</span>
                </div>
            ))}
            </div>
        </CardContent>

    </Card>

  )
}

export default AnalyticsCompareLegend