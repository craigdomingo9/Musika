import AnalyticsCompareChart from './AnalyticsCompareChart';
import AnalyticsCompareChartListAdd from './AnalyticsCompareChartListAdd';
import AnalyticsCompareLineGraph from './AnalyticsCompareLineGraph';
import AnalyticsCompareMeasureSelect from './AnalyticsCompareMeasureSelect';

type Props = {
    productAnalytics: ProductAnalytics[];
}

function AnalyticsCompare({productAnalytics}: Props) {
    

    return (
    <div className='mb-20'>
        <p className="text-center mt-4 text-sm font-semibold underline text-gray-700 pt-2">Product Performance Comparison Charts</p>

        <AnalyticsCompareChartListAdd productAnalytics={productAnalytics} />
        
        <AnalyticsCompareMeasureSelect />
        <AnalyticsCompareChart />
        <AnalyticsCompareLineGraph />
    </div>
  )
}

export default AnalyticsCompare