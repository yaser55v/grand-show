import React from "react"
import Home from "../components/Home"
import Layout from "../components/layout"
import List from "../components/List"
import Seo from "../components/seo"

const index = () => {
  return (
    <Layout>
      <Seo title="Grand Show" />
      <Home />
      <List />
    </Layout>
  )
}

export default index
