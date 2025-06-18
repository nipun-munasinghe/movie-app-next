import Link from 'next/link'
import React from 'react'

export default function MenuItem({title, address, Icon}) {
  return (
    <div>
      <Link href={address} className='hover:text-green-500' >
        <Icon className='text-2xl sm:hidden' />
        <span className='uppercase hidden sm:inline text-sm'>{title}</span>
      </Link>
    </div>
  )
}
