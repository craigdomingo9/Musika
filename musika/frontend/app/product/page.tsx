import ProductDetailsHeader from "@/components/ProductDetails/ProductDetailsHeader";
import ProductDetailsMain from "@/components/ProductDetails/ProductDetailsMain";

type Props = {
    searchParams: {
        id: number;
    };
};

async function ProductDetails({ searchParams: { id } }: Props) {

    return (
        <div className="sm:w-[40rem] xl:w-[47rem] sm:mx-auto">
            <ProductDetailsHeader />
            <ProductDetailsMain id={id} />
        </div>
    );
}

export default ProductDetails;