import BackButton from "../BackButton"


type Props = {
  catalog_name : string
}

function CatalogHeader({catalog_name} : Props) {

  return (
    <header className="w-full min-h-16 grid sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="px-2 sm:pl-0 relative py-6 flex justify-center">
        <div className="absolute left-2">
          <BackButton />
        </div>
        <p className="font-semibold">{catalog_name}</p>
      </div>
    </header>
  )
}

export default CatalogHeader