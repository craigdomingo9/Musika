import ProductsInBag from '@/components/Bag/ProductsInBag'
import Header from '@/components/Header'
import NavigationBar from '@/components/NavigationBar'

function Bag() {
  return (
    <div>
      <Header />
      <NavigationBar />
      <ProductsInBag />
    </div>
  )
}

export default Bag