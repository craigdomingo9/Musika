"use client";
import ProfileContent from "@/components/Profile/ProfileContent"
import ProfileHeader from "@/components/Profile/ProfileHeader"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";




function Profile() {

  const [profile, setProfile] = useState<Profile>()

  useEffect(() => {

    async function getProfile(){
      const email = Cookies.get("email");
      const url = `http://localhost:8000/api/profiles/${email}`

      try {
        const response = await fetch(url,{
          method: "GET",
        });
        const _profile = (await response.json());

      setProfile(_profile)
      } catch (error: any) {
        console.log(error);
      }
    }
    getProfile()
  },[])
  




  return (
    <div className="w-full overflow-x-hidden">
      <ProfileHeader />
      <ProfileContent profile={profile} />
    </div>
  )
}

export default Profile