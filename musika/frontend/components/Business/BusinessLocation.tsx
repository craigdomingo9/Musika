import { Button } from "../ui/button"


type Props = {
    business_locations: BusinessLocation[]
}

function BusinessLocation({business_locations}: Props) {

    return (
        <div className="mx-2">
            <div>
                <p className="font-bold text-lg pb-4">Visit Our Store{business_locations.length >= 1 && "s"}</p>
                <div className="w-full grid grid-cols-2 h-40">
                    {business_locations?.map((business_location) => (
                        <Button variant={"outline"} key={business_location.id} className="flex flex-col m-auto h-full min-w-full max-w-full">
                            <p className="font-bold text-lg opacity-75">{business_location.name}</p>
                            <p className="text-xs">{business_location.address}</p>
                            <p className="text-xs">{business_location.city}</p>
                            <Button className="mt-4">See Location</Button>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BusinessLocation