import Link from "next/link"

function ProfileHeader() {
  return (
    <header className="w-full grid sticky top-0 z-50 sm:w-[40rem] md:w-[43rem] lg:w-[45rem] xl:w-[55rem] sm:mx-auto bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-center my-4 w-full">
            <Link href={"/"} className="my-auto">
                <h1 className="font-bold align-middle text-slate-600 my-auto">Musika</h1>
            </Link>
        </div>
    </header>
  )
}

export default ProfileHeader