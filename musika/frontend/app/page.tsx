import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import OnSaleProducts from "@/components/OnSaleProducts";

export default function Home() {
  return (
    <>
      <Header />
      <Categories name={""} />
      <OnSaleProducts />
      <FeaturedProducts />
      <NavigationBar />
    </>
  );
}
