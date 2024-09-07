import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <div className='grid h-screen'>
      <Button disabled variant={"ghost"} className='m-auto'>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait...
    </Button>
    </div>
  )
}

export default loading