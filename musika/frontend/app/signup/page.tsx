import CredentialsHeader from '@/components/Credentials/CredentialsHeader'
import SignUpForm from '@/components/Credentials/SignUpForm'
import React from 'react'

function BusinessSignup() {
  return (
    <div className='grid'>
        <CredentialsHeader page={"Signup"} />
        <SignUpForm />

    </div>
  )
}

export default BusinessSignup