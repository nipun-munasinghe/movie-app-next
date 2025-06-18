import Image from 'next/image'
import React from 'react'
import { FiStar, FiCalendar, FiClock, FiUsers, FiGlobe, FiDollarSign, FiAward, FiPlay, FiBookmark, FiShare2 } from 'react-icons/fi'

export default async function page({ params }) {
    const movieId = params.id;
    
    // Fetch movie details with credits in a single request using append_to_response
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&append_to_response=credits`);
    
    if (!res.ok) {
        throw new Error('Failed to fetch movie data');
    }
    
    const movie = await res.json();
    const cast = movie.credits?.cast || [];
    const crew = movie.credits?.crew || [];

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return 'TBA'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A'
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(amount)
    }

    const formatRating = (rating) => {
        return rating ? rating.toFixed(1) : 'N/A'
    }

    const formatVoteCount = (count) => {
        if (!count) return '0'
        return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(count)
    }

    // Get director from crew
    const director = crew.find(person => person.job === 'Director');
    
    // Get main cast (limit to 8 for display)
    const mainCast = cast.slice(0, 8);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Backdrop */}
            <div className="relative h-[70vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title || movie.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <div className="flex flex-col lg:flex-row items-end gap-8">
                            {/* Poster */}
                            <div className="flex-shrink-0">
                                <div className="relative group">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`}
                                        alt={movie.title || movie.name}
                                        width={300}
                                        height={450}
                                        className="rounded-xl shadow-2xl border-4 border-white/20"
                                    />
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-xl">
                                        <div className="bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-lg transition-colors duration-200">
                                            <FiPlay className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Movie Info */}
                            <div className="flex-1 text-white space-y-6">
                                <div>
                                    <h1 className="text-4xl lg:text-6xl font-bold mb-2">
                                        {movie.title || movie.name}
                                    </h1>
                                    {movie.tagline && (
                                        <p className="text-xl lg:text-2xl text-gray-300 italic">
                                            "{movie.tagline}"
                                        </p>
                                    )}
                                    {director && (
                                        <p className="text-xl text-gray-300 mt-2">
                                            Directed by {director.name}
                                        </p>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-lg">
                                    <div className="flex items-center space-x-2">
                                        <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="font-semibold">{formatRating(movie.vote_average)}</span>
                                        <span className="text-gray-300">({formatVoteCount(movie.vote_count)} votes)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiCalendar className="w-5 h-5" />
                                        <span>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiClock className="w-5 h-5" />
                                        <span>{formatRuntime(movie.runtime)}</span>
                                    </div>
                                </div>

                                {/* Genres */}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-3 py-1 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-medium"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200">
                                        <FiPlay className="w-5 h-5" />
                                        <span>Watch Trailer</span>
                                    </button>
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200">
                                        <FiBookmark className="w-5 h-5" />
                                        <span>Add to List</span>
                                    </button>
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200">
                                        <FiShare2 className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Overview
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {movie.overview || 'No overview available.'}
                            </p>
                        </div>

                        {/* Cast Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Cast
                            </h2>
                            {mainCast.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {mainCast.map((actor) => (
                                        <div key={actor.id} className="text-center group cursor-pointer hover:transform hover:scale-105 transition-all duration-200">
                                            <div className="relative mb-3 overflow-hidden rounded-lg">
                                                <Image
                                                    src={actor.profile_path 
                                                        ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` 
                                                        : 'https://via.placeholder.com/150x225/e5e7eb/6b7280?text=No+Image'
                                                    }
                                                    alt={actor.name}
                                                    width={150}
                                                    height={225}
                                                    className="shadow-md group-hover:shadow-xl transition-shadow duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                                {actor.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                                                {actor.character}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    No cast information available.
                                </p>
                            )}
                        </div>

                        {/* Crew Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Key Crew
                            </h2>
                            {crew.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {crew
                                        .filter(person => ['Director', 'Producer', 'Executive Producer', 'Screenplay', 'Writer', 'Director of Photography', 'Original Music Composer', 'Cinematography', 'Composer'].includes(person.job))
                                        .slice(0, 9)
                                        .map((person, index) => (
                                            <div key={`${person.id}-${index}`} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                                    {person.name}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">
                                                    {person.job}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    No crew information available.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Movie Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FiCalendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Release Date</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {formatDate(movie.release_date || movie.first_air_date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiClock className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Runtime</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {formatRuntime(movie.runtime)}
                                        </p>
                                    </div>
                                </div>

                                {movie.budget > 0 && (
                                    <div className="flex items-start space-x-3">
                                        <FiDollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(movie.budget)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {movie.revenue > 0 && (
                                    <div className="flex items-start space-x-3">
                                        <FiAward className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {formatCurrency(movie.revenue)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {movie.production_countries && movie.production_countries.length > 0 && (
                                    <div className="flex items-start space-x-3">
                                        <FiGlobe className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {movie.production_countries.map(country => country.name).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <FiUsers className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Popularity</p>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {Math.round(movie.popularity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Production Companies */}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Production
                                </h3>
                                <div className="space-y-2">
                                    {movie.production_companies.map((company) => (
                                        <p key={company.id} className="text-gray-700 dark:text-gray-300">
                                            {company.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}