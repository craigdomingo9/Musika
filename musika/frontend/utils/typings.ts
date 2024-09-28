type Category = {
    id: number,
    name: string,
    image: string,
    has_products: boolean,
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
    category: Category,
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
    age: string,
    gender: string,
    country: string,
    credentials: string,
    date_of_birth: null | string,
    first_name: string,
    last_name: string,
    phone_number: string,
    profile_picture: string,
  }

type BusinessSubscription = {
    id: number,
    plan: Plan,
    interval: string,
    payment_amount: string,
    status: SubscriptionStatus,
    missing_features: Feature[],
    next_plan: Plan
}

type SubscriptionStatus = {
    status: string,
    end_date: string,
}


type Plan = {
    id: number,
    name: string,
    description: string,
    price: string,
    features: Feature[],

}

type Feature = {
    id: number,
    name: string,
    description: string,
}

type BusinessPageAnalytics = {
    business_page_views: BusinessPageView[];
}


type BusinessPageView = {
    id: number,
    view_date: string,
    profile: AnalyticsProfileView,
}

type AnalyticsProfileView = {
    credentials: string,
    age: string,
    gender: string,
    city: string,
}

type PageViewsChartData = {
    date: string,
    views: number,
}

type PageVisitorsBySexChartData = {
    gender: string,
    frequency: number,
}

type AgeChartData = {
    age: string,
    frequency: number,
}

type CityChartData = {
    city: string,
    frequency: number,
}

type ProductAnalyticsProducts = {
    product_analytics: ProductAnalytics[]
}

type ProductAnalytics = {
    product: number,
    product_details: AnalyticsProductDetails,
    product_views: AnalyticsProductViews[],
    product_bag_adds: AnalyticsProductAdds[],
}

type AnalyticsProductDetails = {
    id: number,
    name: string,
    catalog: Catalog,
    category: Category,
    images: ProductImage[],
}

type AnalyticsProductViews = {
    id: number,
    product: number,
    profile: string,
    view_date: string,
}

type AnalyticsProductAdds = {
    id: number,
    product: number,
    bag_add_date: string,
}


type Instance = {
    [key: string]: number | string
}


type Measure = {
    value: string,
    name: string,
}


