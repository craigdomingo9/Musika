import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import OnSaleProducts from "@/components/OnSaleProducts";

export default function Home() {
  return (
    <>
      <Header />
      <div className="sm:mx-[12%]">

        <Categories name={""} />
        <OnSaleProducts />
        <FeaturedProducts />
      </div>
    </>
  );
}
