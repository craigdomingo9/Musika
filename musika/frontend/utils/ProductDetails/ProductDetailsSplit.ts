
function ProductDetailsSplit(data: any) : [
    BagProduct,
    ProductImage[],
    GlobalProductDetails,
    ProductDetails[],
    Business,
    Catalog
] {

    const images: ProductImage[] = [data["images"][0] as ProductImage,...data["variant"]];

    const main_details : ProductDetails = {
      id: data["id"],
      price: data["price"],
      on_sale: data["on_sale"],
      description: "",
      sale_price: data["sale_price"],
      stock_quantity: data["inventory_quantity"],
      attribute_name: "",
      attribute_value: ""
    }

    let variants : ProductDetails[] = [];
    data["variant"].map((variant: ProductVariant) => {
      const details : ProductDetails[] = [{
        id: variant["id"],
        price: variant["price"],
        on_sale: false,
        description: variant["description"],
        sale_price: "",
        stock_quantity: variant["stock_quantity"],
        attribute_name: variant["attribute_name"],
        attribute_value: variant["attribute_value"]
      }]
      variants = [...details]
    })

    const global_product_details: GlobalProductDetails = {
      name: data["name"],
      description: data["description"],
      has_variant: data["variant"] != "",
    }

    const business_details : Business = data["business"];
    const catalog_details : Catalog = data["catalog"];


    const product_details : ProductDetails[] = [main_details,...variants]

    const current_product : BagProduct = {
      id: Number(main_details["id"]),
      name: global_product_details["name"],
      description: global_product_details["description"],
      image: images[0].image,
      price: Number(main_details.on_sale ? main_details["sale_price"] : main_details["price"]),
      on_sale: main_details["on_sale"],
      sale_price: Number(main_details["sale_price"]),
      quantity: 1,
      stock_quantity: main_details["stock_quantity"],
    }

    return [
        current_product,
        images,
        global_product_details,
        product_details,
        business_details,
        catalog_details
    ];
  
}

export default ProductDetailsSplit