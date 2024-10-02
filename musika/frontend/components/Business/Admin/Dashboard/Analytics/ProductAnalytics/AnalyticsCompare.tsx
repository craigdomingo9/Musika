import AnalyticsCompareChart from './AnalyticsCompareChart';
import AnalyticsCompareChartListAdd from './AnalyticsCompareChartListAdd';
import AnalyticsCompareChartsRenderer from './AnalyticsCompareChartsRenderer';
import AnalyticsCompareLineGraph from './AnalyticsCompareLineGraph';
import AnalyticsCompareMeasureSelect from './AnalyticsCompareMeasureSelect';

type Props = {
    productAnalytics: ProductAnalytics[];
}

function AnalyticsCompare({ productAnalytics }: Props) {
    return (
        <div className='mb-20'>
            <p className="text-center mt-4 text-sm font-semibold underline text-gray-700 pt-2">
                Product Performance Comparison Charts
            </p>

            <AnalyticsCompareChartListAdd productAnalytics={productAnalytics} />
            <AnalyticsCompareMeasureSelect />
            <AnalyticsCompareChartsRenderer />

            {/* Optional: Handle empty productAnalytics */}
            {productAnalytics.length === 0 && (
                <p className="text-center text-sm text-gray-500 mt-4">
                    No products available for comparison.
                </p>
            )}
        </div>
    );
}

export default AnalyticsCompare;