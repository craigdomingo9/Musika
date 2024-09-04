"use client";
import { useEffect, useState } from "react";
import ProfileEditCreateForm from "./ProfileEditCreateForm"
import Cookies from "js-cookie";



function ProfileEditCreateFormRenderer() {

    const [profile, setProfile] = useState<Profile | undefined>(undefined)
    const [profileNotFound, setProfileNotFound] = useState<boolean>(false)
    const [email, setEmail] = useState<string | undefined>(" ")


    useEffect(() => {
        const _email = Cookies.get("email");
        
        setEmail(_email);

        async function getProfile(){
          const email = Cookies.get("email");
          const url = `http://localhost:8000/api/profiles/${email}`
    
          try {
            const response = await fetch(url,{
              method: "GET",
            });
            const _profile = (await response.json());

            if (response.ok && !profile){
                setProfile(_profile);
                console.log("set");
            }

            if (!response.ok) {
                setProfileNotFound(true);
            }
            
          } catch (error: any) {
            // console.log(error);
          }
        }
        getProfile()
    })

  return (
    <>
        {profile && <ProfileEditCreateForm profile={profile} editProfile={true} />}
        {profileNotFound && <ProfileEditCreateForm profile={undefined} editProfile={false} />}
    </>
  )
}

export default ProfileEditCreateFormRenderer