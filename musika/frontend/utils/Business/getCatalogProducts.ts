

async function getCatalogProducts(catalog: number) {
    const url = `http://localhost:8000/api/products/catalog/${catalog}/`;

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    }

    const response = await fetch(url,options);
    const products_data = (await response.json()) as Product[];

    return products_data;

}

export default getCatalogProducts