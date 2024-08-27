import CheckoutButton from '@/components/Bag/CheckoutButton'
import ProductsInBag from '@/components/Bag/ProductsInBag'
import NavigationBar from '@/components/NavigationBar'

function Bag() {
  return (
    <div className='sm:mx-[10%]'>
      <ProductsInBag />
      <CheckoutButton />
    </div>
  )
}

export default Bag