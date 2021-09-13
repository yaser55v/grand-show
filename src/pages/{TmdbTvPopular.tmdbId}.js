import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { CircularProgressbar } from "react-circular-progressbar"
import ModalVideo from "react-modal-video"
import "../../node_modules/react-modal-video/css/modal-video.min.css"
import {
  API_KEY,
  tvUrl,
  backdrop_url,
  poster_url,
  logo_url,
} from "../utils/fetchTmdb"
import errImg from "../styles/images/avater.png"
import errLogo from "../styles/images/errLogo.svg"
import noPoster from "../styles/images/noposter.png"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Autoplay } from "swiper/core"
import Layout from "../components/layout"
import Seo from "../components/seo"
SwiperCore.use([Navigation, Autoplay])

const TvPopularTemplate = ({ data }) => {
  const { tmdbId } = data.tmdbTvPopular
  const [details, setDetails] = useState("")
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    const url = `${tvUrl}${tmdbId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,similar,credits`
    const fetchTmdb = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        setDetails(json)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchTmdb()
  }, [tmdbId])
  const {
    name,
    backdrop_path,
    original_language,
    first_air_date,
    overview,
    poster_path,
    genres = [],
    videos = [],
    networks = [],
    credits: { cast = [] } = [],
    similar: { results = [] } = [],
    vote_average,
  } = details

  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <Layout>
      <Seo title={name} />
      <div className="relative animate-lazy">
        {backdrop_path && (
          <img
            src={backdrop_url + backdrop_path}
            className="absolute inset-0 object-cover w-full h-full"
            alt={name}
          />
        )}
        <div className="relative bg-gradient-to-r from-gray-900 via-blue-500   bg-opacity-80">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-xl md:text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  {name}
                </h2>
                <ul className="flex pb-3">
                  {genres.map(genre => (
                    <li
                      className="mr-2 border border-green-400 text-sm md:text-lg bg-blue-900 text-green-400 px-2 rounded"
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center">
                  <CircularProgressbar
                    value={vote_average}
                    minValue={0}
                    maxValue={10}
                    text={`${vote_average}`}
                    strokeWidth={12}
                    background={true}
                    backgroundPadding={6}
                    className="w-16"
                    styles={{
                      path: {
                        stroke: `${
                          vote_average > 5
                            ? `rgba(0,255, 240, ${vote_average / 10})`
                            : "#ff7c7c"
                        }`,
                      },
                      trail: {
                        stroke: `rgba(0,255, 240, 0.2)`,
                      },
                      text: {
                        fill: `rgba(0,255, 240, 1)`,
                        fontSize: "1.7rem",
                      },
                      background: {
                        fill: "rgba(0, 45, 43, 0.67)",
                      },
                    }}
                  />
                  <p className="mx-2 border border-green-400 text-xs md:text-lg bg-blue-900 text-green-400 px-2 rounded uppercase">
                    {original_language}
                  </p>

                  <p className="mx-2 border border-green-400 text-xs md:text-lg bg-blue-900 text-green-400 px-2 rounded">
                    {first_air_date}
                  </p>
                </div>
                <div className="max-w-xl my-8">
                  <p className="text-base text-gray-300 md:text-lg ">
                    {overview && isReadMore
                      ? overview && overview.slice(0, 100)
                      : overview}
                    <button
                      onClick={toggleReadMore}
                      onKeyDown={toggleReadMore}
                      className="text-bold text-green-400 cursor-pointer"
                    >
                      {isReadMore ? "...Read more" : " Show less"}
                    </button>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  {videos.results && videos.results ? (
                    <React.Fragment>
                      <ModalVideo
                        channel="youtube"
                        autoplay
                        isOpen={isOpen}
                        videoId={videos.results[0]?.key}
                        onClose={() => setOpen(false)}
                      />

                      <button
                        className=" flex items-center text-lg text-green-400 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => setOpen(true)}
                      >
                        <svg
                          style={{ background: "rgba(0, 45, 43, 0.67)" }}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 rounded-full mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="rgba(0,255, 240, 0.7)"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        View Trailer
                      </button>
                    </React.Fragment>
                  ) : null}
                  {networks.slice(0, 1).map(pro => {
                    return (
                      <div key={pro.id} className="mx-2 w-56 hidden md:flex">
                        <img
                          src={
                            pro.logo_path ? logo_url + pro.logo_path : errLogo
                          }
                          className="w-24"
                          alt={pro.name}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              {poster_path && (
                <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                  <div className="rounded  p-7 sm:p-10">
                    <img src={poster_url + poster_path} alt={name} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex">
              <Swiper
                slidesPerView={3}
                navigation={true}
                spaceBetween={80}
                freeMode={true}
                width={500}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                className="mySwiper"
              >
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {cast.map((cat, idx) => {
                    return (
                      <SwiperSlide key={idx} className="">
                        <div className="group relative w-32 flex flex-wrap items-center justify-center">
                          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-36 lg:aspect-none">
                            <img
                              src={
                                cat.profile_path
                                  ? logo_url + cat.profile_path
                                  : errImg
                              }
                              alt={cat.name}
                              className="w-full h-full object-center object-fill lg:w-full lg:h-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-base text-gray-100">
                                <p>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {cat.name}
                                </p>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* Fetch Similar */}
      <div className="animate-lazy bg-gray-100">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl pb-12 font-extrabold tracking-tight text-gray-900">
            Similar Results
          </h2>
          <Swiper
            slidesPerView={2}
            navigation={true}
            spaceBetween={20}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1500}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
            }}
            className="mySwiper"
          >
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {results.map(result => {
                const { id, name, vote_average, poster_path } = result
                return (
                  <SwiperSlide key={id} className="">
                    <div className="group relative">
                      <div className="w-full h-full bg-gray-200 shadow-xl aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                        <img
                          src={
                            poster_path ? backdrop_url + poster_path : noPoster
                          }
                          alt={name}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full animate-lazy"
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <h3 className="text-sm text-gray-800 text-center uppercase truncate">
                          {name}
                        </h3>
                        <h3 className="text-sm text-gray-800 font-bold text-center">
                          {vote_average}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </div>
          </Swiper>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query getOneTv($tmdbId: String) {
    tmdbTvPopular(tmdbId: { eq: $tmdbId }) {
      tmdbId
    }
  }
`
export default TvPopularTemplate
