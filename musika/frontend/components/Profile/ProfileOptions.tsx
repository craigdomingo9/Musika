import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"


function ProfileOptions() {
    const router = useRouter()
  return (
    <div className="sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto">
        <Button variant="outline" className="w-full text-start" onClick={() => router.push("profile?edit=1")}>
            <p>Edit Profile</p>
            <ChevronRight className="h-4 w-4" />
        </Button>
    </div>
  )
}

export default ProfileOptions