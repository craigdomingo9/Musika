"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductItems from "./ProductItems";

interface OnSaleProductsClientProps {
    products: Product[];
}

const OnSaleProductsClient: React.FC<OnSaleProductsClientProps> = ({ products }) => {
    const productRef = useRef<HTMLDivElement | null>(null);

    const scrollTo = (direction: 'left' | 'right') => {
        if (productRef.current) {
            const scrollAmount = direction === 'right' ? 300 : -300; // Adjust scroll amount as needed
            productRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <button
                className="absolute left-0 top-[50%] z-10 bg-white p-1 mx-1 rounded-full shadow-lg"
                onClick={() => scrollTo('left')}
            >
                <ChevronLeft />
            </button>

            <div ref={productRef} className="flex w-full overflow-x-scroll overflow-y-hidden">
                <ProductItems products={products} row={true} page="home" />
            </div>

            <button
                className="absolute right-0 top-[50%] z-10 bg-white p-1 mx-1 rounded-full shadow-lg"
                onClick={() => scrollTo('right')}
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default OnSaleProductsClient;