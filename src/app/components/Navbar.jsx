import React from 'react'
import NavbarItem from './NavbarItem'

export default function Navbar() {
  return (
    <div className='flex dark:bg-green-500 bg-green-100 p-5 lg:text-lg justify-center gap-6'>
        <NavbarItem title="Trending" param="fetchTrending" />
        <NavbarItem title="Top Rated" param="fetchTopRated" />
    </div>
  )
}