import BusinessDetails from "@/components/Business/BusinessDetails";
import BusinessHeader from "@/components/Business/BusinessHeader";
import BusinessMainContent from "@/components/Business/BusinessMainContent";
import variables from "@/utils/variables";

type Props = {
  params: {
    business: string;
  }
}

async function page({params: {business}}: Props) {
    const url = `http://localhost:8000/api/business/${business}`

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json"
        },
        next:{
            revalidate: variables.caching.business,
        }
    }
    const response = await fetch(url,options);

    const business_description = (await response.json()) as Business;


    
  return (
    <div className="sm:mx-[15%]">
      <BusinessHeader name={business_description.name} />
      <BusinessDetails details={business_description} />
      <BusinessMainContent business={business} business_locations={business_description.location} />
    </div>
  )
}

export default page