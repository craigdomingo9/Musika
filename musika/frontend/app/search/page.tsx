import Header from "@/components/Header"
import ProductItems from "@/components/ProductItems"
import variables from "@/utils/variables"
import Head from "next/head"


type Props = {
    searchParams: {
        query: string
    }
}

async function page({searchParams: {query}}: Props) {

    const url = `http://localhost:8000/api/products/search/?q=${query}`

    const response = await fetch(url,{
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.categories,
        }
    })

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const results: Product[] = await response.json();



  return (
    <div className="w-full sm:w-[40rem] md:w-[45rem] lg:w-[50rem] xl:w-[60rem] sm:mx-auto">
        <Header />
      <Head>
        <title>Search Results</title>
        <meta name="description" content={`Search results for "${query}"`} />
      </Head>
      <div className=""> 

        <h1 className="text-2xl font-bold mb-4 flex pl-4">Search Results for
            <p className="italic">&nbsp;{query}</p>
        </h1>
      <main className="flex justify-center items-center flex-wrap ">
        {results.length > 0 ? (
              <ProductItems products={results} page="" row={false} />
        ) : (
          <p>No results found.</p>
        )}
      </main>
      </div>
    </div>
  )
}

export default page