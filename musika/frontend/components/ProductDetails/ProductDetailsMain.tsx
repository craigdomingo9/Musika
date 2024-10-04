import variables from "@/utils/variables";
import SimilarProducts from "./SimilarProducts";
import ProductDetailsAddCurrentProduct from "@/utils/ProductDetails/ProductDetailsAddCurrentProduct";
import ProductDetails from "./ProductDetails";
import ProductAnalyticsViewLogic from "./ProductAnalyticsViewLogic";

type Props = {
    id: number;
};

async function ProductDetailsMain({ id }: Props) {
    const url = `http://localhost:8000/api/products/${id}/`;

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next: {
            revalidate: variables.caching.product_details
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
        }

        const product = (await response.json()) as Product;

        

        return (
            <>  
                {product && <ProductAnalyticsViewLogic product={product} />}
                <ProductDetails product={product} />
                <SimilarProducts id={product.id} />
            </>
        );
    } catch (error) {
        console.error("Failed to load product details:", error);
        return <div className="text-red-500 text-sm text-center">Failed to load product details. Please try again later.</div>;
    }
}

export default ProductDetailsMain;