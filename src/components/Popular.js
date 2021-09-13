import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
const Popular = () => {
  const data = useStaticQuery(query)
  const popularMovies = data.allTmdbMoviePopular.nodes

  return (
    <div id="popular" className="animate-lazy">
      <div className="w-full mx-auto py-8 px-4 sm:py-8 sm:px-6  lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {popularMovies.map(popular => (
            <div key={popular.id} className="group relative my-4">
              <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                <img
                  src={popular.poster_path.w780}
                  alt={popular.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full animate-lazy"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-200">
                    <Link to={`/${popular.tmdbId}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {popular.title}
                    </Link>
                  </h3>
                </div>
                <h3 className="text-sm text-gray-200 font-bold text-center">
                  {popular.vote_average}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Popular
const query = graphql`
  {
    allTmdbMoviePopular {
      nodes {
        id
        tmdbId
        title
        vote_average
        poster_path {
          w780
        }
      }
    }
  }
`
