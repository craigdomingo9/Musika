import CredentialsHeader from "@/components/Credentials/CredentialsHeader";
import LoginForm from "@/components/Credentials/LoginForm";


function BusinessLogin() {
  return (
    <div>
        <CredentialsHeader page={"Login"} />
        <div>
            <LoginForm />
        </div>
    </div>
  )
}

export default BusinessLogin