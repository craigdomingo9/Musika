"use client";
import useBagStore from "@/stores/BagStore"
import ProductInBag from "./ProductInBag";
import { Button } from "../ui/button";
import CheckoutButton from "./CheckoutButton";



function ProductsInBag() {

  const products = useBagStore((state) => state.items);
  const clearBag = useBagStore((state) => state.resetBag);
  const bagWeight = useBagStore((state) => state.getTotalItems()) > 0;

  return (
    <div className="p-2">
      <div className="grid">
        <div className="flex justify-between">
          <div className="flex place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 my-auto mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h1 className="text-3xl font-semibold">Your Bag:</h1>
          </div>
          <div className="flex">
              {bagWeight && (
                <>
                  <CheckoutButton />
                  <Button variant={"outline"} onClick={clearBag}>Clear</Button>
                </>
                )}
          </div>
        </div>
        <p className="text-sm font-semibold">Review the items in your bag and checkout when ready</p>
        
      </div>
      <div className="grid grid-cols-1 last:mb-28 min-h-[40vh]">
        {bagWeight ? products.map((product) => (
          <ProductInBag key={product.id} product={product} />
        )):(
          <div className="h-full grid place-items-center text-sm">
            <p>You don't have any products in your Bag.</p>
          </div>
        )}
        
      </div>
      
      
    </div>
  )
}

export default ProductsInBag