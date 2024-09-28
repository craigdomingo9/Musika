import Categories from "@/components/Categories"
import ExploreProductItems from "@/components/Explore/ExploreProductItems"
import Header from "@/components/Header"
import variables from "@/utils/variables"

type Props = {
  searchParams: {
    category: string
  }
}

async function ExplorePage({searchParams : { category }}: Props) {

  let url;
  if (category == undefined) {
    url = "http://localhost:8000/api/products/explore/";
  }else{
    url = `http://localhost:8000/api/products/explore/${category}/`;
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


  return (
    <div className="overflow-hidden">
        <Header />
        <Categories name={category} />
        <h1 className="text-2xl font-bold pl-4 pb-2 sm:mx-[10%]">{category==undefined ? "Explore": `Explore: ${category}`}</h1>
        <div className=" sm:mx-[10%] ">
          <ExploreProductItems products={data} />
        </div>
    </div>
  )
}


export default ExplorePage