import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle: title
        siteDesc: description
        titleTemplate
        author
        twitterUsername
        image
        siteUrl
      }
    }
  }
`
const Seo = ({ title, description, article }) => {
  const { site } = useStaticQuery(query)
  const { siteTitle, siteDesc, siteUrl, image, twitterUsername } =
    site.siteMetadata
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | ${siteTitle}`}>
      <meta name="description" content={description || siteDesc} />
      <meta name="image" content={image} />
      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
    </Helmet>
  )
}

export default Seo
