"use client";

import useBagStore from "@/stores/BagStore";
import { Button } from "../ui/button";



function CheckoutButton() {
    const totalPrice = useBagStore((state) => state.getTotalPrice())
  return (
    <div className="p-2 z-50 grid fixed w-[100vw] h-[10vh] bottom-14">
        <Button className="w-full h-full bg-color-btn text-lg">Checkout ${totalPrice}</Button>
    </div>
  )
}

export default CheckoutButton