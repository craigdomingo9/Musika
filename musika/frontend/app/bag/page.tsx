import ProductsInBag from '@/components/Bag/ProductsInBag'
import Header from '@/components/Header'

function Bag() {
  return (
    <div>
      <Header />
      <div className='sm:mx-[15%] sm:min-h-[90vh]'>
        <ProductsInBag />
      </div>
    </div>
  )
}

export default Bag