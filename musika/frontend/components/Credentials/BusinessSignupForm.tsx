"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import BusinessSignUpLocationForm from "./BusinessSignUpLocationForm";
import BusinessSignUpCreateBusinessForm from "./BusinessSignUpCreateBusinessForm";
import BusinessSignUpCredentialsForm from "./BusinessSignUpCredentialsForm";




type Props = {
    step: number;
}


function BusinessSignupForm({step}: Props) {
    const router = useRouter();

    const lastStep = 3;
    const [currentStep, setcurrentStep] = useState<number>(1)

    const email = Cookies.get("business_email");
    const location_is_setup = Cookies.get("location_is_setup");


    useEffect(() => {
        if (step) {
            setcurrentStep(step);
            if (!email && step > 1) {
                router.push("/signup?step=1")
            }
            if (email && !location_is_setup && step == 1) {
                router.push("/signup?step=2")
            }
            if (location_is_setup) {
                router.push("/signup?step=3")
            }
        } else {
            router.push("/signup?step=1")
        }
    },[step])



    

  return (
    <div>
        <p className="text-center text-sm font-semibold">Step {currentStep} / {lastStep}</p>
           <div className="bg-white py-8 mt-2 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-center text-sm font-semibold">Business Account</p>
                {currentStep == 1 && (
                    <BusinessSignUpCreateBusinessForm />
                )}
                {currentStep == 2 && (
                    <BusinessSignUpLocationForm />
                )}
                {currentStep == 3 && (
                    <BusinessSignUpCredentialsForm />
                )}
           </div>
        
        
    </div>
  )
}

export default BusinessSignupForm