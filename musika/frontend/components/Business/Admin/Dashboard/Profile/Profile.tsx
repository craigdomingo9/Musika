"use client";
import getBusinessInfo from "@/utils/Business/getBusinessInfo";
import { useEffect, useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import useActionStore from "@/stores/ActionStore";

function Profile() {
    const [businessInfo, setBusinessInfo] = useState<BusinessDetails | null>(null);
    const {secondaryActionOccured,toggleSecondaryActionOccurred} = useActionStore()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBusiness = async () => {
            try {
                const business_data = await getBusinessInfo();
                setBusinessInfo(business_data);
            } catch (err) {
                console.error("Failed to load business info", err);
                setError("Failed to load business information.");
            } finally {
                setLoading(false);
            }
        };

        loadBusiness();
    }, [secondaryActionOccured]);

    if (loading) {
        return <div className="text-sm text-center">Loading...</div>; // You can replace this with a spinner or skeleton loader
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Error message
    }

    return (
        <div className="mx-2 sm:max-w-[30rem] sm:mx-auto">
            {businessInfo && <ProfileEditForm business={businessInfo} />}
        </div>
    );
}

export default Profile;