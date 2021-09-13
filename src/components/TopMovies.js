import React from "react"
import { graphql, useStaticQuery } from "gatsby"
const TopMovies = () => {
  const data = useStaticQuery(query)
  const topMovies = data.allTmdbMovieTopRated.nodes
  return (
    <div className="animate-lazy">
      <div className="w-full mx-auto py-8 px-4 sm:py-8 sm:px-6  lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {topMovies.map(topm => {
            const {
              id,
              title,
              vote_average,
              poster_path: { w780 },
            } = topm
            return (
              <div key={id} className="group relative my-4">
                <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                  <img
                    src={w780}
                    alt={title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full animate-lazy"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-200">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {title}
                    </h3>
                  </div>
                  <h3 className="text-sm text-gray-200 font-bold text-center">
                    {vote_average}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TopMovies
const query = graphql`
  {
    allTmdbMovieTopRated(limit: 20) {
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
