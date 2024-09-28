import CatalogHeader from '@/components/Catalog/CatalogHeader'
import ProductItems from '@/components/ProductItems'
import getCatalogProducts from '@/utils/Business/getCatalogProducts'
import Link from 'next/link'

type Props = {
  searchParams: {
    id: number,
  }
}

async function Catalog({searchParams: {id}}: Props) {
  const catalog_products = await getCatalogProducts(id);

  return (
    <div className='sm:w-[40rem] xl:w-[47rem] sm:mx-auto'>
      <CatalogHeader catalog_name={catalog_products[0]?.catalog && catalog_products[0].catalog.name} />
        {catalog_products ? (
          <>
          
        <Link href={`/b/${catalog_products[0]?.business.code}`} className='m-4 mt-6 text-blue-400 font-semibold'>
          {catalog_products[0]?.business.name}
        </Link>
      <div className='grid w-full place-items-center grid-cols-2 mt-4'>
        <ProductItems products={catalog_products} row={false} page="catalog" />
      </div>
          </>
        ):(
          <p>Empty Catalog</p>
        )}
    </div>
  )
}

export default Catalog