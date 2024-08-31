import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import OnSaleProducts from "@/components/OnSaleProducts";

export default function Home() {
  return (
    <>
      <Header />
      <div className="sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] mx-auto">

        <Categories name={""} />
        <OnSaleProducts />
        <FeaturedProducts />
      </div>
    </>
  );
}
