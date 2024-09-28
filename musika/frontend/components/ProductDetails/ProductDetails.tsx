"use client"
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState, useRef } from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import ProductDetailsButtons from "./ProductDetailsButtons";

type Props = {
    product: Product,
}

function ProductDetails({product}: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const base_url = "http://localhost:8000";

    useEffect(() => {
        if (!api) {
            return
          }
        
          setCurrent(api.selectedScrollSnap() + 1)
        
          api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
          })
          
          if (containerRef.current) {
            containerRef.current.scrollTop;
          }
      }, [api])

  return (
    <div ref={containerRef} className="sm:mt-5 sm:grid sm:grid-cols-[50%_50%] max-w-full">
        <div className="relative">
            <Carousel setApi={setApi} opts={{align: "start",loop: true,}}>
                <CarouselContent className="h-[22rem]">
                {product && product.images.map((image) => (
                    <CarouselItem key={image.id}>
                        <Image 
                            className="min-h-full object-fill min-w-full h-full" 
                            src={`${base_url}${image.image}`} 
                            height={1000} 
                            width={1000} 
                            alt={image.alt ? image.alt : `${product.name} Image`} 
                            priority 
                        />
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>

            <div className={cn("absolute flex bottom-2 right-1/2", product.images.length == 1 && "hidden")}>
                {product.images.map((_,id) => (
                    <Circle key={id} className={cn("text-amber-700 w-[0.85rem]",id == (current-1) && "fill-amber-700 opacity-70")} />
                ))}
            </div>
        </div>

        <div>
        
            <div className="flex justify-between w-full px-2 pt-4">
                <h1 className="font-bold text-xl">{product?.name}</h1>
                <div className="flex px-2">
                <p className={cn("font-bold text-xl",product?.on_sale && "line-through txt-color opacity-70")}>{product?.price}</p>
                <p className={cn("font-bold text-xl pl-2",!product?.on_sale && "hidden")}>{product?.sale_price}</p>
                </div>
            </div>


            <div className="w-full px-2">
                <p className="opacity-70 text-sm">{product?.description}</p>
            </div>

            <Link href={`/b/${product.business.code}`}>
                <div className="w-full flex px-2 py-5 justify-between">
                    <div className="flex">
                        {product.business?.logo ? (
                            <Image className="rounded-full" src={`${base_url}${product.business?.logo}`} width={50} height={50} alt="Business Logo" />
                        ) :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>
                        }
                        <p className="m-auto pl-3 font-bold opacity-85">{product.business.name}</p>
                    </div>
                    
                    <div className="my-auto pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                
                </div>
            </Link>

            <Link href={{
            pathname: "/catalog",
            query: {
              id: product.catalog.id
            }
            }}>
                <div className="w-full flex px-2 py-5 justify-between ">
                    <div className="flex w-full">
                        <Button variant={"outline"} className="m-auto w-full py-3 pl-2 font-bold opacity-85">View more from {product.catalog.name}</Button>
                    </div>
                </div>
            </Link>
            <ProductDetailsButtons />
        </div>
        
    </div>
  )
}

export default ProductDetails