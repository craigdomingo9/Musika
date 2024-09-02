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
    <div className="p-2 z-50 grid fixed w-[96.5vw] sm:w-[10vw] sm:right-32 h-[10vh] bottom-14">
        <Button disabled className="w-full h-full bg-color-btn text-lg">Checkout ${Price}</Button>
    </div>
  )
}

export default CheckoutButton