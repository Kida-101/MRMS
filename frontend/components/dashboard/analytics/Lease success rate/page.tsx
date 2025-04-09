import React from 'react'
import {ChartSpline, Percent,} from "lucide-react"

function LeaseConversion() {
  return (
    <div>
      <ChartSpline className='h-8 w-8 ml-6 mt-6'/>
      <h2 className='ml-6 mt-4 text-2xl'>Lease Conversion Rate</h2>
      <div className='flex gap-1'>
      <h2 className='ml-6 mt-2 text-2xl'>36.2</h2>{/*From the backend*/}
      <Percent className='mt-3'/>
      </div>
    </div>
  )
}

export default LeaseConversion;
