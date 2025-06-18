import React from 'react'
import MenuItem from './MenuItem'
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import Link from 'next/link';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto '>
        <div className='flex gap-4'>
          <MenuItem title="Home" address="/" Icon={AiFillHome}/>
          <MenuItem title="About" address="/about" Icon={BsInfoCircleFill}/>
        </div>
        <Link href={'/'} className='flex gap-1 items-center'>
          <span className='text-2xl font-bold bg-green-500 py-1 px-2 rounded-lg'>Movie</span>
          <span className='text-xl hidden sm:inline'>Radar</span>
        </Link>
    </div>
  )
}