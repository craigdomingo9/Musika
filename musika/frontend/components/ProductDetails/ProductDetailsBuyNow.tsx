import useCurrentProductStore from "@/stores/CurrentProductStore";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

function ProductDetailsBuyNow() {
    const { currentProduct } = useCurrentProductStore();
    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    useEffect(() => {
        if (currentProduct) {
            setIsAvailable(currentProduct.stock_quantity > 0);
        }
    }, [currentProduct]);

    const handleBuyNow = () => {
        if (isAvailable) {
            // Handle the buy now action
            console.log("Proceeding to checkout...");
        }
    };

    return (
        <div className="w-1/2 p-2">
            <Button
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className={`w-full h-16 ${isAvailable ? 'bg-green-600 opacity-95' : 'bg-gray-400'}`}
            >
                {isAvailable ? "Buy Now" : "Out of Stock"}
            </Button>
        </div>
    );
}

export default ProductDetailsBuyNow;