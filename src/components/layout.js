import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900">{children}</main>
      <hr className="border-t border-gray-600" />
      <Footer />
    </>
  )
}

export default Layout
