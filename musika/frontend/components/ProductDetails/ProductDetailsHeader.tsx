import BackButton from "../BackButton";
import ProductDetailsBagButton from "./ProductDetailsBagButton";


function ProductDetailsHeader() {
  return (
    <header className="w-full max-h-16 grid sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="flex justify-between py-4 max-h-16 min-h-12">
        <BackButton />
        <div className="mr-2">
          <ProductDetailsBagButton />
        </div>
      </div>
    </header>
  )
}

export default ProductDetailsHeader