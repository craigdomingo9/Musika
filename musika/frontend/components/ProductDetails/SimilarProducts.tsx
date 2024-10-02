// components/SimilarProducts.tsx
import variables from "@/utils/variables";
import SimilarProductsClient from "./SimilarProductsClient";

type Props = {
    id: number;
};

async function fetchSimilarProducts(id: number): Promise<Product[]> {
    const url = `http://localhost:8000/api/products/similar/${id}/`;

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        next: {
            revalidate: variables.caching.products,
        },
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
        throw new Error("Failed to fetch similar products.");
    }

    return (await response.json()) as Product[];
}

async function SimilarProducts({ id }: Props) {
    let products: Product[] = [];
    let error: string | null = null;
    let loading: boolean = true;

    try {
        products = await fetchSimilarProducts(id);
    } catch (err) {
        error = err instanceof Error ? err.message : "An error occurred";
    } finally {
        loading = false;
    }

    return (
        <div className="pt-2 mb-[5rem] sm:mt-5 relative">
            <div className="px-2 sm:pl-0">
                <p className="text-xl font-semibold">You May Also Like</p>
            </div>

            {loading ? (
                <div className="px-2 grid text-gray-600 text-sm text-center">Loading...</div>
            ) : error ? (
                <div className="px-2 text-red-600">{error}</div>
            ) : (
                <SimilarProductsClient products={products} />
            )}
        </div>
    );
}

export default SimilarProducts;