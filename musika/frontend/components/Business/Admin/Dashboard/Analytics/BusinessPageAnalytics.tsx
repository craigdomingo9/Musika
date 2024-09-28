"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import getBusinessPageAnalytics from "@/utils/Business/Analytics/getBusinessPageAnalytics";
import { useEffect, useState } from "react";
import PageViewsChart from "./BusinessPageAnalytics/PageViewsChart";
import BusinessVisitorsChart from "./BusinessPageAnalytics/BusinessVisitorsChart";



function BusinessPageAnalytics() {
    const [businessPageViews, setBusinessPageViews] = useState<BusinessPageView[]>([])
    const [visitors, setVisitors] = useState<BusinessPageView[]>([])



    useEffect(() => {
        async function loadBusinessPageAnalytics() {
            const businessPageViewsData = await getBusinessPageAnalytics();
            setBusinessPageViews(businessPageViewsData);

            let businessPageVisitors: BusinessPageView[] = [];
            businessPageViewsData.map((view: BusinessPageView) => {
                if (!businessPageVisitors.find((visitor) => visitor.profile.credentials === view.profile.credentials)){
                    businessPageVisitors = [...businessPageVisitors,view]
                }
            })
            setVisitors(businessPageVisitors);
        }
        loadBusinessPageAnalytics()
    },[])


  return (
    <div>
        <div className="mx-2 text-xl mb-2 underline">
            <p className="font-semibold opacity-85">Store Analytics</p>
        </div>
        
        {businessPageViews && (
            <PageViewsChart businessPageViews={businessPageViews} />
        )}
        {visitors && (
            <BusinessVisitorsChart visitors={visitors} />
        )}

    </div>
  )
}

export default BusinessPageAnalytics
 