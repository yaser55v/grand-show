import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { graphql, useStaticQuery } from "gatsby"

import SwiperCore, {
  Pagination,
  EffectFade,
  Parallax,
  Autoplay,
} from "swiper/core"

SwiperCore.use([Pagination, EffectFade, Parallax, Autoplay])
const Home = () => {
  const data = useStaticQuery(query)
  const movies = data.allTmdbMoviePopular.nodes
  return (
    <>
      <div className="mx-auto w-full ">
        <div className="">
          <div className="">
            <Swiper
              slidesPerView={1}
              spaceBetween={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1200}
              parallax={true}
              effect={"fade"}
              className="mySwiper flex"
              style={{ height: "40rem" }}
            >
              {movies.map(movie => {
                const {
                  id,
                  title,
                  backdrop_path: { original },
                  overview,
                  poster_path: { w780 },
                } = movie
                return (
                  <SwiperSlide key={id}>
                    <div className="w-full h-full">
                      <img
                        className="w-full shadow-lg h-full"
                        src={original}
                        alt={title}
                      />
                    </div>
                    <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-60  opacity-100 sm:flex flex-wrap justify-evenly items-center">
                      <div className="px-4 py-8 mx-auto  md:px-24 lg:px-20 lg:py-20">
                        <div className="grid gap-2 lg:gap-20 lg:grid-cols-2 items-center justify-items-center lg:justify-items-end">
                          <div className="lg:pr-10">
                            <h4
                              className="mb-8 title text-2xl sm:text-3xl md:text-5xl font-bold leading-none text-white text-center sm:text-left"
                              data-swiper-parallax="700"
                            >
                              {title}
                            </h4>
                            <p
                              className="mb-6 text-white hidden lg:block text-xl text-left"
                              data-swiper-parallax="-400"
                            >
                              {overview}
                            </p>
                          </div>
                          <div>
                            <img
                              src={w780}
                              alt={title}
                              className="object-contain h-96 sm:h-30 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
const query = graphql`
  {
    allTmdbMoviePopular(limit: 5) {
      nodes {
        id
        title
        backdrop_path {
          original
        }
        overview
        poster_path {
          w780
        }
      }
    }
  }
`
