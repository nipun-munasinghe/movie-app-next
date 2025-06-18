'use client'

import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function NavbarItem({title, param }) {
    const searchParams = useSearchParams();
    const genre = searchParams.get('genre');
  return (
    <div>
        <Link className={`font-semibold hover:text-green-500 dark:hover:text-black transition-all duration-300
                ${genre === param ? 'underline underline-offset-8 decoration-4 decoration-green-500 dark:decoration-black rounded-lg' : ''}`} 
            href={`/?genre=${param}`}>{title}
        </Link>
    </div>
  )
}