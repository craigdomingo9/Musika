import CredentialsHeader from '@/components/Credentials/CredentialsHeader'
import SignUpForm from '@/components/Credentials/SignUpForm'



type Props = {
  searchParams: {
    step: number;
  }
}


function BusinessSignup({searchParams: {step}}: Props) {
  return (
    <div className='grid'>
        <CredentialsHeader page={"Signup"} />
        <SignUpForm step={step} />

    </div>
  )
}

export default BusinessSignup