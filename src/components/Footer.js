import { Link } from "gatsby"
import React from "react"
import tmdb from "../styles/images/tmdb.svg"
import twitter from "../styles/images/icons8-twitter.svg"
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 py-8 flex flex-wrap justify-evenly">
        <Link to="/">
          <p className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white rounded shadow-md uppercase">
            Grand Show {new Date().getFullYear()}
          </p>
        </Link>
        <a
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white rounded shadow-md"
          href="https://www.yassermahmoud.com"
          target="_blank"
          rel="noreferrer"
        >
          Built by{" "}
          <span className="text-gray-300 underline ml-1"> Yasser Mahmoud</span>
        </a>
        <a
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white rounded shadow-md "
          href="https://twitter.com/YasserM43067634?s=09"
          target="_blank"
          rel="noreferrer"
        >
          Support me
          <img src={twitter} alt="The Movie Database" className="ml-2 w-8" />
        </a>

        <a
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white rounded shadow-md "
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          Powered by{" "}
          <img src={tmdb} alt="The Movie Database" className="ml-2 w-40" />
        </a>
      </footer>
    </>
  )
}

export default Footer
