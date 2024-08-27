import CatalogHeader from '@/components/Catalog/CatalogHeader'
import ProductItems from '@/components/ProductItems'
import { Button } from '@/components/ui/button'
import variables from '@/utils/variables'
import Link from 'next/link'


type Props = {
  searchParams: {
    id: number,
  }
}

async function Catalog({searchParams: {id}}: Props) {
  const url = `http://localhost:8000/api/products/catalog=${id}`

  const options: RequestInit = {
      method: "GET",
      headers: {
          accept: "application/json"
      },
      next:{
          revalidate: variables.caching.business,
      }
  }
  const response = await fetch(url,options);
  const catalog_products = (await response.json()) as Product[];

  const catalog_name : string = (catalog_products.length>0 ? catalog_products[0]?.catalog?.name : "");
  const business_name : string = (catalog_products.length>0 ? catalog_products[0]?.business?.name : "");
  const business_code : string = (catalog_products.length>0 ? catalog_products[0]?.business?.code : "");

  return (
    <div className='sm:mx-[15%]'>
      <CatalogHeader catalog_name={catalog_name} />
        <Link href={business_code} className='text-lg font-bold mx-2 mt-4 flex'>
          {catalog_name} by&nbsp;<Button variant={"link"} className='text-blue-300 font-bold text-lg h-0 p-0 my-auto'>{business_name}</Button>
        </Link>
        <p>{}</p>
      <div className='grid grid-cols-2 mt-4 sm:grid-cols-3'>
        <ProductItems products={catalog_products} row={false} />
      </div>
    </div>
  )
}

export default Catalog