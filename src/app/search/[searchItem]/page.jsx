import Results from '@/app/components/Results';
import { Suspense } from 'react'; // Only import if you use Suspense

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const data = await res.json();
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 && (
        <h1 className='text-center pt-6'>No results found</h1>
      )}
      {/* Only wrap in Suspense if Results uses useSearchParams() */}
      <Suspense fallback={<div>Loading results...</div>}>
        {results && <Results results={results} />}
      </Suspense>
    </div>
  );
}