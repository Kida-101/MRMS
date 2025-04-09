import React from 'react'
import { House, Percent,} from "lucide-react"

function VacantRoom() {
  return (
    <div>
      <House className='h-8 w-8 ml-6 mt-6'/>
      <h2 className='ml-6 mt-4 text-2xl'>Vacancy Rate</h2>
      <div className='flex gap-1'>
      <h2 className='ml-6 mt-2 text-2xl'>50</h2>{/*From the backend*/}
      <Percent className='mt-3'/>
      </div>
    </div>
  )
}

export default VacantRoom;