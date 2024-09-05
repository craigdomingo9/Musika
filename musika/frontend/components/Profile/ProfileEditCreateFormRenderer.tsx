"use client";
import { useEffect, useState } from "react";
import getProfile from "@/utils/getProfile";
import ProfileEditCreateForm from "./ProfileEditCreateForm"



function ProfileEditCreateFormRenderer() {

  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const [profileNotFound, setProfileNotFound] = useState<boolean>(false)
  

  useEffect(() => {
      const loadProfile = async () => {
          try {
              const [_profileNotFound,profile_] = await getProfile<Profile>();
              setProfileNotFound(_profileNotFound);
              setProfile(profile_);
          }
          catch (err) {
              // setError(err instanceof Error ? err.message : 'Unknown error');
          }
      }
      loadProfile()

  },[])

  return (
    <>
        {profile && <ProfileEditCreateForm profile={profile} editProfile={true} />}
        {profileNotFound && <ProfileEditCreateForm profile={undefined} editProfile={false} />}
    </>
  )
}

export default ProfileEditCreateFormRenderer