"use client";
import getBusinessInfo from "@/utils/Business/getBusinessInfo"
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
    <div className="h-16 mx-4 my-3">
        <p className="font-bold text-2xl">{businessInfo?.name}</p>
        <p className="text-xs font-bold opacity-55">Administrator</p>
    </div>
  )
}

export default DashboardBusinessInfo