import Link from 'next/link';

type Props = {
    page: string
}

function CredentialsHeader({page}: Props) {
  return (
    <header className="w-full grid sticky top-0 z-50 bg-white border-b border-slate-200 mb-2">
        <div className="flex justify-center m-4 sm:mx-[10%] md:mx-[12%] lg:mx-[22%]">
          <h1 className="font-bold align-middle text-slate-600 my-auto">
              <Link href={"/"} className="my-auto">Musika&nbsp;</Link>
              &gt; {page}
          </h1>
        </div>
    </header>
  )
}

export default CredentialsHeader