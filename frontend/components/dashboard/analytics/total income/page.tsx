import React from 'react'
import {DollarSign, Wallet} from "lucide-react"

function TotalIncome() {
  return (
    <div>
      <Wallet className="h-8 w-8 ml-6 mt-6" />
      <h2 className='ml-6 mt-4 text-2xl'>Total Income</h2>
      <div className='flex gap-1'>
      <DollarSign className='ml-6 mt-3' />
      <h2 className='mt-2 text-2xl'>2500</h2>
      </div>
    </div>
  )
}

export default TotalIncome;
