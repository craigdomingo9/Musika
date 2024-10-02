"use client";
import getBusinessPageAnalytics from "@/utils/Business/Analytics/getBusinessPageAnalytics";
import { useEffect, useState } from "react";
import PageViewsChart from "./BusinessPageAnalytics/PageViewsChart";
import BusinessVisitorsChart from "./BusinessPageAnalytics/BusinessVisitorsChart";

function BusinessPageAnalytics() {
    const [businessPageViews, setBusinessPageViews] = useState<BusinessPageView[]>([]);
    const [visitors, setVisitors] = useState<BusinessPageView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBusinessPageAnalytics() {
            try {
                const businessPageViewsData = await getBusinessPageAnalytics();
                setBusinessPageViews(businessPageViewsData);

                // Create a Set to store unique credentials
                const uniqueCredentials = new Set<string>();
                const uniqueVisitors: BusinessPageView[] = [];

                businessPageViewsData.forEach(view => {
                    if (!uniqueCredentials.has(view.profile.credentials)) {
                        uniqueCredentials.add(view.profile.credentials);
                        uniqueVisitors.push(view);
                    }
                });

                setVisitors(uniqueVisitors);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        }
        loadBusinessPageAnalytics();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div>
            
            
            {businessPageViews.length > 0 ? (
                <>
                    <div className="mx-2 text-xl mb-2 underline">
                        <p className="font-semibold opacity-85">Store Analytics</p>
                    </div>
                    <PageViewsChart businessPageViews={businessPageViews} />
                </>
            ): (
                <div>
                    <p className="text-center text-sm">You have no visitors yet. Soon though.</p>
                </div>
            )}
            {visitors.length > 0 && (
                <BusinessVisitorsChart visitors={visitors} />
            )}
        </div>
    );
}

export default BusinessPageAnalytics;