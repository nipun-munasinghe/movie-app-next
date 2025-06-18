import React from 'react'
import MenuItem from './MenuItem'
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto '>
        <div className='flex gap-4'>
          <MenuItem title="Home" address="/" Icon={AiFillHome}/>
          <MenuItem title="About" address="/about" Icon={BsInfoCircleFill}/>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeSwitch />
          <Link href={'/'} className='flex gap-1 items-center'>
            {/* Show only on smaller screens (hidden on lg and above) */}
            <span className='text-2xl lg:hidden font-bold bg-green-500 py-1 px-2 rounded-lg'>MR</span>
            
            {/* Show only on larger screens (hidden on smaller screens) */}
            <span className='text-2xl hidden lg:inline font-bold bg-green-500 py-1 px-2 rounded-lg'>Movie</span>
            <span className='text-xl hidden lg:inline'>Radar</span>
          </Link>
        </div>
    </div>
  )
}