type Category = {
    id: number;
    name: string;
    image: string;
}


type Catalog = {
    id: number,
    name: string,
    description: string,
    category: Category
}

type BusinessLocation = {
    id: number,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    city: string,
    country: string,
}

type Business = {
    code: string,
    name: string,
    description: string,
    categories: string,
    logo: string,
    cover_photo: string,
    phone_number: string,
    email: string,
    location: BusinessLocation[],
    created_at: string,
}

type BusinessDetails = {
    code: string,
    name: string,
    description: string,
    catalog: Catalog[],
    categories: string,
    logo: string,
    cover_photo: string,
    products: Product[],
    phone_number: string,
    email: string,
    created_at: string,
    location: BusinessLocation[],
}

type ProductImage = {
    id: number,
    image: string,
    alt: string,
}

type ProductVariant = {
    id: number,
    image: string,
    description: string,
    attribute_name: string,
    attribute_value: string,
    price: string,
    stock_quantity: number,
}

type GlobalProductDetails = {
    name: string,
    description: string,
    has_variant: boolean,
}

type Product = {
    id: number,
    name: string,
    catalog: Catalog,
    business: Business,
    images: ProductImage[],
    variant: ProductVariant[],
    description: string,
    price: string,
    on_sale: boolean,
    sale_price: string,
    inventory_quantity: number,
}

type ProductDetails = {
    id: number,
    price: string,
    on_sale: boolean,
    description: string,
    sale_price: string,
    stock_quantity: number,
    attribute_name: string,
    attribute_value: string,
}

type BagProduct = {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    on_sale: boolean,
    sale_price: number,
    quantity: number,
    stock_quantity: number,
}

type CurrentProduct = {
    id: number;
    price: number;
    quantity: number;
}


type Profile = {
    address: string,
    city: string,
    country: string,
    credentials: string,
    date_of_birth: null | string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profile_picture: string,
  }