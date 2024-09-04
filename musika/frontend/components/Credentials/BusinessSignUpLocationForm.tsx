"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input"
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { cities } from "@/utils/extras";


const BusinessLocationFormSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(15),
  city: z.string().min(3),
})



function BusinessSignUpLocationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof BusinessLocationFormSchema>>({
    resolver: zodResolver(BusinessLocationFormSchema),
    defaultValues: {
      name: "Joina City",
      address: "Julius Nyerere and Jason Moyo Ave.",
      city: "Harare",
    },
  })



  async function onSubmit(values: z.infer<typeof BusinessLocationFormSchema>) {
    
    try {
      const code = Cookies.get("business_code");
      const url = `http://localhost:8000/api/business/locations/create/b=${code}`;

      const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
      });


      if (!response.ok) {
          const errorData = await response.json();
          toast({
              variant: "destructive",
              description: errorData.detail,
              duration: 1500,
          })
          throw new Error(errorData.detail || 'Setting up Location Failed');
      }

      const responseData = await response.json();
      
      if(response.ok){
          toast({
              variant: "success",
              description: responseData.detail,
              duration: 3000,
          })
          router.push("signup?step=3");

          Cookies.set("location_is_setup","true",{ expires: 1 })
      }
    } catch (error: any) {
        console.error('Error:', error.message);
    }
  }


  return (
    <div>
      <p className="text-center font-bold text-sm py-4 underline underline-offset-2">Set up your business location</p>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Joina City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="text-sm" placeholder="Julius Nyerere and Jason Moyo Ave." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
              <Select defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose your city" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
          Next
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default BusinessSignUpLocationForm