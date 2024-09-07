"use client";
import ProfileEditCreateFormRenderer from "@/components/Profile/ProfileEditCreateFormRenderer";
import ProfileHeader from "@/components/Profile/ProfileHeader"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



type Props = {
  searchParams: {
    edit: number | undefined;
  }
}

function Profile({searchParams: {edit}}: Props) {

  const [editProfile, setEditProfile] = useState<boolean>(false)

  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(" ")

 

    useEffect(() => {
        const _token = Cookies.get("token");

        setToken(_token);

        if (!token) {
            toast({
              variant: "warning",
              description: "Please log in to access your profile",
              duration: 3000,
            })
            router.push("/login")
        }

        

        if (edit && token) {
          setEditProfile(true)
        }


    },[token])

    function editProfilefn(){
      setEditProfile(!editProfile)
      if (!editProfile) {
          router.push("/profile?edit=1")
      }else{
          router.push("/profile")
      }
    }

    
  return (
    <div className="w-full overflow-x-hidden relative min-h">

      <ProfileHeader />

      <div className="flex justify-center pt-2 [&>Button]:w-[95%] sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto">
        <Button variant="outline" className="text-start " onClick={() => editProfilefn()}>
            <p>Edit Profile</p>
            {editProfile ? (
                <ChevronDown className="h-4 w-4" />
            ):(
                <ChevronRight className="h-4 w-4" />
            )}
        </Button>
      </div>


      {editProfile && (
        <ProfileEditCreateFormRenderer />
      )}
    </div>
  )
}

export default Profile