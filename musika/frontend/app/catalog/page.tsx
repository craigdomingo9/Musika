import CatalogHeader from '@/components/Catalog/CatalogHeader'
import ProductItems from '@/components/ProductItems'
import { Button } from '@/components/ui/button'
import getBusinessCode from '@/utils/Business/getBusinessCode'
import getCatalogProducts from '@/utils/Business/getCatalogProducts'
import variables from '@/utils/variables'
import Link from 'next/link'


type Props = {
  searchParams: {
    id: number,
  }
}

async function Catalog({searchParams: {id}}: Props) {
  const url = `http://localhost:8000/api/products/catalogs/b/${getBusinessCode()}/`

  const catalog_products = await getCatalogProducts(id);

  
  return (
    <div className='sm:w-[40rem] xl:w-[47rem] sm:mx-auto'>
      <CatalogHeader catalog_name={catalog_products[0]?.catalog?.name} />
        
      <div className='grid w-full place-items-center grid-cols-2 mt-4'>
        <ProductItems products={catalog_products} row={false} page="catalog" />
      </div>
    </div>
  )
}

export default Catalog