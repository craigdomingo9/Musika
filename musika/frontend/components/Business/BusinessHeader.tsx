import Link from "next/link"

type Props = {
    name: string
}

function BusinessHeader({name}: Props) {
  return (
    <header className="w-full grid sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="px-2 relative py-6 flex justify-center">
            <Link href={"/"} className="flex absolute left-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                </svg>
                <p className="font-bold opacity-80 text-sm m-auto">Home</p>
            </Link>
            <p className="font-bold">{name}</p>
        </div>
    </header>
  )
}

export default BusinessHeader