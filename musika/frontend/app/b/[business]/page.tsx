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
    const business_data = (await response.json()) as BusinessDetails;

    const business_description : Business = {
      code: business_data.code,
      name: business_data.name,
      description: business_data.description,
      categories: business_data.categories,
      logo: business_data.logo,
      cover_photo: business_data.cover_photo,
      phone_number: business_data.phone_number,
      email: business_data.email,
      created_at: business_data.created_at,
      location: business_data.location as BusinessLocation[],
    }

    const business_products : Product[] = business_data.products;

    

  return (
    <div className="sm:mx-[15%]">
      <BusinessHeader name={business_data.name} />
      <BusinessDetails details={business_description} />
      <BusinessMainContent business={business} business_locations={business_description.location} />
    </div>
  )
}

export default page