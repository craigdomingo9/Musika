"use client";
import getProfile from "@/utils/getProfile";
import { useEffect } from "react";

type Props = {
    product: Product;
};

function ProductAnalyticsViewLogic({ product }: Props) {
    useEffect(() => {
        
        const addAnalyticsView = async () => {
            const [profileNotFound, profile] = await getProfile<Profile>();
            const url = "http://localhost:8000/api/analytics/products/views/add/";

            const options: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    product: product.id,
                    profile: profile?.credentials, // Use optional chaining
                }),
            };

            if (!profileNotFound && profile) {
                try {
                    console.log("Sending analytics view:", options);
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(`Error fetching analytics: ${response.statusText}`);
                    }
                    console.log("Analytics view recorded successfully.");
                } catch (error) {
                    console.error("Failed to record analytics view:", error);
                }
            }
        };

        addAnalyticsView();
    }, [product]);

    return null;
}

export default ProductAnalyticsViewLogic;