import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BusinessSignupForm from "./BusinessSignUpForm"
import CustomerSignUpForm from "./CustomerSignUpForm"



function SignUpForm() {
  return (
    <div className="flex justify-center">
      <Tabs className="w-[95%] sm:w-[30rem]  grid items-center" defaultValue="business">
        <p className="text-center font-bold text-lg pt-5 pb-2">Sign up as a:</p>
        <TabsList className="grid grid-cols-2 sticky top-16 z-50 mb-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <p className="text-center font-semibold">Customer Account</p>
          <CustomerSignUpForm />
        </TabsContent>
        <TabsContent value="business">
          <BusinessSignupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SignUpForm