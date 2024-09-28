"use client";
import { Button } from "@/components/ui/button";
import getBusinessInfo from "@/utils/Business/getBusinessInfo"
import Link from "next/link";
import { useEffect, useState } from "react"

function DashboardBusinessInfo() {
    const [businessInfo, setBusinessInfo] = useState<BusinessDetails>()
    
    useEffect(() => {
        
        async function loadBusiness(){
            const business_data = await getBusinessInfo();
            setBusinessInfo(business_data);
        }
        loadBusiness()
    },[])


  return (
    <div className="h-20 sm:h-16 mx-4 my-3 grid grid-cols-[75%_25%] sm:flex sm:justify-between">
        <div>

          <p className="font-bold text-2xl">{businessInfo?.name}</p>
          <p className="text-xs font-bold opacity-55">Administrator</p>
        </div>
        <div>
            <Link href={`/b/${businessInfo?.code}/`}>
                <Button className="text-xs" variant={"outline"}>View Store</Button>
            </Link>
        </div>
      </div>
  )
}

export default DashboardBusinessInfo