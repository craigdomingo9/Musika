import CheckoutButton from '@/components/Bag/CheckoutButton'
import ProductsInBag from '@/components/Bag/ProductsInBag'
import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'

function Bag() {
  return (
    <div>
      <Header />
      <div className='sm:mx-[15%]'>
        <ProductsInBag />
        <CheckoutButton />
      </div>
    </div>
  )
}

export default Bag