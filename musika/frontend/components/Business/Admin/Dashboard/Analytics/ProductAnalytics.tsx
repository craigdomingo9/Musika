import getBusinessCode from "@/utils/Business/getBusinessCode";
import { useEffect, useState } from "react";
import AnalyticsTable from "./ProductAnalytics/AnalyticsTable";
import AnalyticsCompare from "./ProductAnalytics/AnalyticsCompare";

type Props = {};

function ProductAnalytics({}: Props) {
    const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getProductAnalytics() {
            const url = `http://localhost:8000/api/analytics/products/b/${getBusinessCode()}/`;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        accept: "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setProductAnalytics(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        }   

        getProductAnalytics();

        // Optional: Return cleanup function if needed
        return () => {
            // Clean up actions (if necessary)
        };
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div>
            {productAnalytics.length > 0 ? (
                <>
                    <AnalyticsTable productAnalytics={productAnalytics} />
                    <AnalyticsCompare productAnalytics={productAnalytics} />
                </>
            ) : (
                <p className="text-center">No product analytics available.</p>
            )}
        </div>
    );
}

export default ProductAnalytics;