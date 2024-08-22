import Categories from "@/components/Categories"
import ExploreProductItems from "@/components/Explore/ExploreProductItems"
import Header from "@/components/Header"
import NavigationBar from "@/components/NavigationBar"
import ProductItems from "@/components/ProductItems"
import { cn } from "@/lib/utils"
import variables from "@/utils/variables"

type Props = {
  searchParams: {
    category: string
  }
}

async function ExplorePage({searchParams : { category }}: Props) {

  let url;
  if (category == undefined) {
    url = "http://localhost:8000/api/products/sale=0&homepage=0";
  }else{
    url = `http://localhost:8000/api/products/category=${category}`;
  }

  const options: RequestInit = {
      method: "GET",
      headers: {
          accept: "application/json"
      },
      next:{
          revalidate: variables.caching.products
      }
  }

  const response = await fetch(url,options);
  const data = (await response.json());

  // console.log(data)

  return (
    <>
        <Header />
        <Categories name={category} />
        <div>
          <h1 className="text-2xl font-bold pl-4 pb-2">{category==undefined ? "Explore": `Explore: ${category}`}</h1>
          <ExploreProductItems products={data} />
        </div>
        <NavigationBar />
    </>
  )
}


export default ExplorePage