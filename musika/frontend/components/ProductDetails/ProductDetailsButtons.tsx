import ProductDetailsAddToBagButton from './ProductDetailsAddToBagButton'
import ProductDetailsBuyNow from './ProductDetailsBuyNow'

function ProductDetailsButtons() {
  return (
    <div className='min-w-full max-w-full sm:flex sm:relative flex fixed bottom-1 z-50'>
        <ProductDetailsAddToBagButton />
        <ProductDetailsBuyNow />
    </div>
  )
}

export default ProductDetailsButtons