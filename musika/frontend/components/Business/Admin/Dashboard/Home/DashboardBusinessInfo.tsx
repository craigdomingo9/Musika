"use client";
import { Button } from "@/components/ui/button";
import useActionStore from "@/stores/ActionStore";
import getBusinessInfo from "@/utils/Business/getBusinessInfo";
import Link from "next/link";
import { useEffect, useState } from "react";

function DashboardBusinessInfo() {
    const [businessInfo, setBusinessInfo] = useState<BusinessDetails | null>(null);
    const {tertiaryActionOccured} = useActionStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBusiness() {
            try {
                const business_data = await getBusinessInfo();
                setBusinessInfo(business_data);
            } catch (err) {
                setError("Failed to load business information.");
            } finally {
                setLoading(false);
            }
        }
        loadBusiness();
    }, [tertiaryActionOccured]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="h-20 sm:h-16 mx-4 my-3 grid grid-cols-[75%_25%] sm:flex sm:justify-between">
            <div>
                <p className="font-bold text-2xl">{businessInfo?.name || "Business Name"}</p>
                <p className="text-xs font-bold opacity-55">Administrator</p>
            </div>
            <div>
                <Link href={`/b/${businessInfo?.code}/`}>
                    <Button className="text-xs" variant={"outline"}>View Store</Button>
                </Link>
            </div>
        </div>
    );
}

export default DashboardBusinessInfo;