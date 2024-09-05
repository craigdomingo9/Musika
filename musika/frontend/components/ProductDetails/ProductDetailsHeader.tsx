import BackButton from "../BackButton";
import ProductDetailsBagButton from "./ProductDetailsBagButton";


function ProductDetailsHeader() {
  return (
    <header className="w-full grid sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="flex justify-between m-4 my-6 ml-2">
        <BackButton />
        <div className="mr-2">
          <ProductDetailsBagButton />
        </div>
      </div>
    </header>
  )
}

export default ProductDetailsHeader