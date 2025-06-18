import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center mt-32 min-h-screen bg-gray-100 dark:bg-gray-950'>
        <img className='h-32' src="spinner.svg" alt="Loading..." />
    </div>
  )
}