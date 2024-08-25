import CheckoutButton from '@/components/Bag/CheckoutButton'
import ProductsInBag from '@/components/Bag/ProductsInBag'
import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'

function Bag() {
  return (
    <div>
      <Header />
      <NavigationBar />
      <ProductsInBag />
      <CheckoutButton />
    </div>
  )
}

export default Bag