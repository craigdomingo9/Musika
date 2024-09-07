"use client";
import getBusinessSubscription from "@/utils/Business/getBusinessSubscription";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

function DashboardBusinessSubscription() {
    
    
    const [businessSubscription, setBusinessSubscription] = useState<BusinessSubscription>()
    
    function capitalizeFirstLetter(word: string): string {
        if (!word) return ''; // Handle empty strings
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    useEffect(() => {
        
        async function loadSubscription(){
            const subscription_data = await getBusinessSubscription();
            setBusinessSubscription(subscription_data);
        }
        loadSubscription()
    },[])
    // console.log(businessSubscription);

  return (
    <div className="pt-2 pl-2 grid">
        {/* <p className="text-sm font-bold py-2">Subscription</p> */}
        {businessSubscription ? (
            <Card className="bg-green-500 bg-opacity-90 text max-w-[25rem]">
                <CardHeader>
                    <CardTitle>
                        <div className="w-full flex justify-between">
                            <p>{businessSubscription.plan.name}</p>
                            <p>{businessSubscription.status.status}</p>
                        </div>
                    </CardTitle>
                    <p>{capitalizeFirstLetter(businessSubscription.interval)}</p>
                </CardHeader>
                <CardContent />
                <CardFooter>
                    <p className="text-[0.8rem] font-semibold">Expires on {businessSubscription.status.end_date}</p>
                </CardFooter>
            </Card>
        ):(
            ""
        )}

    </div>
  )
}

export default DashboardBusinessSubscription