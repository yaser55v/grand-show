require("dotenv").config({
  path: ".env",
})

module.exports = {
  siteMetadata: {
    title: `Grand Show`,
    description: `Gatsby & Tailwind project with data from TMDB - https://www.themoviedb.org/`,
    titleTemplate: `%s | Grand Show`,
    author: `Yasser Mahmoud`,
    twitterUsername: `@YasserM43067634`,
    image: `/grandShow1.jpg`,
    siteUrl: `https://grand-show.netlify.app`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-tmdb",
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        endpoints: [
          {
            url: `movie/popular`,
            countLimit: 20,
          },
          {
            url: `movie/top_rated`,
            countLimit: 20,
          },
          {
            url: `tv/popular`,
            countLimit: 20,
          },
          {
            url: `tv/top_rated`,
            countLimit: 20,
          },
        ],
      },
    },
  ],
}
