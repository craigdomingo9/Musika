import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Props = {
    productAnalytics: ProductAnalytics[],
}

function AnalyticsTable({ productAnalytics }: Props) {
    const [totalProductViews, setTotalProductViews] = useState<number>(0);
    const [totalProductCartAdds, setTotalProductCartAdds] = useState<number>(0);

    useEffect(() => {
        const { views, cartAdds } = productAnalytics.reduce((acc, analytics_instance) => {
            acc.views += analytics_instance.product_views.length;
            acc.cartAdds += analytics_instance.product_bag_adds.length;
            return acc;
        }, { views: 0, cartAdds: 0 });

        setTotalProductViews(views);
        setTotalProductCartAdds(cartAdds);
    }, [productAnalytics]);

    return (
        <div>
            <p className="text-center text-sm font-semibold underline text-gray-700 pt-2">
                Product Performance Table
            </p>
            {productAnalytics.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Views</TableHead>
                            <TableHead className="text-center">Cart Adds</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productAnalytics.map((analytics_instance, index) => (
                            <TableRow key={analytics_instance.product}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{analytics_instance.product_details.name}</TableCell>
                                <TableCell className="text-center">{analytics_instance.product_views.length}</TableCell>
                                <TableCell className="text-center">{analytics_instance.product_bag_adds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-center">{totalProductViews}</TableCell>
                            <TableCell className="text-center">{totalProductCartAdds}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            ) : (
                <p className="text-center text-sm text-gray-500">No product analytics available.</p>
            )}
        </div>
    );
}

export default AnalyticsTable;