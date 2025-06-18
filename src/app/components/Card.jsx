import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiThumbsUp, FiStar, FiCalendar, FiPlay } from 'react-icons/fi'

export default function Card({ result }) {
  // Format release date
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA'
    const date = new Date(dateString)
    return date.getFullYear()
  }

  // Format vote average to one decimal place
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A'
  }

  // Format vote count with K notation
  const formatVoteCount = (count) => {
    if (!count) return '0'
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className="m-2 group relative bg-white dark:bg-gray-800 rounded-xl 
            shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out 
            transform hover:-translate-y-2 overflow-hidden border 
            border-gray-200 dark:border-gray-700">
      <Link href={`/movie/${result.id}`} className="block">
        {/* Image Container with Overlay */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path || result.poster_path}`}
            alt={result.title || result.name || 'Movie poster'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-green-500 hover:bg-green-600 rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <FiPlay className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">
              {formatRating(result.vote_average)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
            {result.title || result.name}
          </h3>

          {/* Overview */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
            {result.overview || 'No description available.'}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            {/* Release Date */}
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatDate(result.release_date || result.first_air_date)}
              </span>
            </div>

            {/* Vote Count */}
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <FiThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatVoteCount(result.vote_count)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    </div>
  )
}