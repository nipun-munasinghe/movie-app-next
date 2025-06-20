import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center mt-32 min-h-screen bg-gray-100 dark:bg-gray-950'>
      <Image
        src="/spinner.svg"
        alt="Loading..."
        width={128}
        height={128}
        className="h-32"
      />
    </div>
  )
}