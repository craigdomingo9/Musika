// components/OnSaleProducts.tsx
import variables from "@/utils/variables";
import OnSaleProductsClient from "./OnSaleProductsClient";

async function fetchOnSaleProducts(): Promise<Product[]> {
    const url = "http://localhost:8000/api/products/sale/";

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
        throw new Error("Failed to fetch on-sale products.");
    }

    return (await response.json()) as Product[];
}

async function OnSaleProducts() {
    let products: Product[] = [];
    let error: string | null = null;

    try {
        products = await fetchOnSaleProducts();
    } catch (err) {
        error = err instanceof Error ? err.message : "An error occurred";
    }

    return (
        <div>
            <h1 className="text-xl py-2 font-semibold opacity-75 ml-4">On Sale</h1>

            {error ? (
                <div className="ml-4 text-red-600">{error}</div>
            ) : (
                <OnSaleProductsClient products={products} />
            )}
        </div>
    );
}

export default OnSaleProducts;