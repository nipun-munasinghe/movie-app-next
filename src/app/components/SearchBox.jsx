'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { ImSearch } from "react-icons/im";

export default function SearchBox() {
    const [search, setSearch] = React.useState('');
    const router = useRouter();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    };

  return (
    <form className='flex justify-between px-5 max-w-6xl mx-auto' onSubmit={handleOnSubmit}>
        <input type="text" placeholder='Search keywords...' className='w-full h-14 rounded-md outline-none bg-transparent flex-1'
            value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <button className='text-green-500 disabled:text-gray-500' disabled={search === ''}>Search</button>
    </form>
  )
}