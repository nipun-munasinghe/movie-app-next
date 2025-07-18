import React from 'react'
import Results from './components/Results';

const API_KEY = process.env.API_KEY;

export default async function page({ searchParams }) {
  const genre = searchParams?.genre || 'fetchTrending'
  const res = await new Promise((resolve) => {
    setTimeout(async () => {
      const response = fetch(`https://api.themoviedb.org/3/${
                        genre === 'fetchTopRated' ? 'movie/top_rated' : 'trending/all/week'}?api_key=${API_KEY}&language=en-US&page=1`,
                        {next: { revalidate: 10000 } }
                       );
                       resolve(response);
    }, 2000);
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  const results = data.results;

  return (
    <div>
      <Results results={results}></Results>
    </div>
  )
}