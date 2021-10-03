
import * as React from "react"
import PropTypes from "prop-types"
import Header from "../components/header"
import Footer from "../components/footer"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config }　from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
