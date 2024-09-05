"use client";
import useBagStore from "@/stores/BagStore";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";



function CheckoutButton() {
    const totalPrice = useBagStore((state) => state.getTotalPrice())
    const [Price, setPrice] = useState(0);

    useEffect(() => {
      setPrice(totalPrice);
    },[totalPrice])

  return (
      <Button className="bg-color-btn fixed sm:sticky bottom-20 left-2 sm:z-0 h-16 sm:h-10 z-50 w-[96.5vw] sm:w-32 sm:mx-2" >Checkout ${Price}</Button>
  )
}

export default CheckoutButton