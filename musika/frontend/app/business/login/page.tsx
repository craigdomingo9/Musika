import BusinessLoginForm from "@/components/Credentials/BusinessLoginForm"
import CredentialsHeader from "@/components/Credentials/CredentialsHeader"

function BusinessLogin() {
  return (
    <div>
        <CredentialsHeader page={"Login"} />
        <div>
            <BusinessLoginForm />
        </div>
    </div>
  )
}

export default BusinessLogin