// components/SimilarProductsClient.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductItems from "../ProductItems";

interface SimilarProductsClientProps {
    products: Product[];
}

const SimilarProductsClient: React.FC<SimilarProductsClientProps> = ({ products }) => {
    const productRef = useRef<HTMLDivElement | null>(null);

    const scrollTo = (direction: 'left' | 'right') => {
        if (productRef.current) {
            const scrollAmount = direction === 'right' ? 300 : -300; // Adjust scroll amount as needed
            productRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="px-2 relative sm:pl-0 pt-4 w-full flex items-center">
            <button 
                className="absolute left-0 z-10 bg-white p-1 mx-1 rounded-full shadow-lg"
                onClick={() => scrollTo('left')}
            >
                <ChevronLeft />
            </button>

            <div ref={productRef} className="flex overflow-x-scroll overflow-y-hidden w-full">
                <ProductItems products={products} row={true} page="product_details" />
            </div>

            <button 
                className="absolute right-0 z-10 bg-white p-1 mx-1 rounded-full shadow-lg"
                onClick={() => scrollTo('right')}
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default SimilarProductsClient;