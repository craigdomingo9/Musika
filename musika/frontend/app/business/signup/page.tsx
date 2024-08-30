import BusinessSignupForm from '@/components/Credentials/BusinessSignupForm'
import CredentialsHeader from '@/components/Credentials/CredentialsHeader'
import React from 'react'

function BusinessSignup() {
  return (
    <div className='grid'>
        <CredentialsHeader page={"Signup"} />
        <BusinessSignupForm />

    </div>
  )
}

export default BusinessSignup