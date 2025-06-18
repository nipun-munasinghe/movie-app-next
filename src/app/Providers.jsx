'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

export default function Providers({children}) {
  return (
    <ThemeProvider defaultTheme='system' attribute='class'>
        <div className='text-gray-950 dark:text-gray-100 dark:bg-gray-950 min-h-screen select-none transition-colors duration-300'>
            {children}
        </div>
    </ThemeProvider>
  )
}