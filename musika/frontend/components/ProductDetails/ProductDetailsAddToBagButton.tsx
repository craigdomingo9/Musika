"use client";
import useBagStore from "@/stores/BagStore";
import { Button } from "../ui/button";
import useCurrentProductStore from "@/stores/CurrentProductStore";
import { useEffect, useState } from "react";
import getProfile from "@/utils/getProfile";


const addAnalyticsCartAdd = async (product: BagProduct) => {
    const [profileNotFound, profile] = await getProfile<Profile>();
    const url = "http://localhost:8000/api/analytics/products/bag/add/";

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
            console.log("Analytics cart add recorded successfully.");
        } catch (error) {
            console.error("Failed to record analytics view:", error);
        }
    } else {
        console.warn("Profile not found or invalid profile data.");
    }

    
};


function ProductDetailsAddToBagButton() {
    const addProductToStore = useBagStore((state) => state.addItem);
    const current_product = useCurrentProductStore((state) => state.currentProduct);
    const [isAdded, setIsAdded] = useState(false);

    const addToBag = () => {
        if (current_product) {
            addProductToStore(current_product);
            setIsAdded(true);
            addAnalyticsCartAdd(current_product)
            setTimeout(() => setIsAdded(false), 1000); // Reset after 2 seconds
        }
    };


    return (
        <div className="w-1/2 p-2">
            <Button 
                onClick={addToBag} 
                className="w-full h-16 bg-color-btn hover:bg-color-btn"
                disabled={!current_product} // Disable if no current product
            >
                {isAdded ? "Added to Bag!" : "Add to Bag"}
            </Button>
        </div>
    );
}

export default ProductDetailsAddToBagButton;