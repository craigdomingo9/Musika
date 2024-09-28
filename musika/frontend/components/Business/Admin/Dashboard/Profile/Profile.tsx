"use client";
import getBusinessInfo from "@/utils/Business/getBusinessInfo";
import { useEffect, useState } from "react";
import ProfileEditForm from "./ProfileEditForm";



function Profile() {
  const [businessInfo, setBusinessInfo] = useState<BusinessDetails>()
    
    useEffect(() => {
        
        async function loadBusiness(){
            const business_data = await getBusinessInfo();
            setBusinessInfo(business_data);
        }
        loadBusiness()
    },[])

    // console.log(businessInfo)
  return (
    <div className="mx-2 sm:max-w-[30rem] sm:mx-auto">
      {businessInfo && (
        <ProfileEditForm business={businessInfo} />
      )}
    </div>
  )
}


export default Profile