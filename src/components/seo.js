
import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo( props ) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            lang
            siteUrl
            locale
            fbappid
          }
        }
      }
    `
  )

  const title = props.pagetitle
    ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title
  const description = props.pagedesc || data.site.siteMetadata.desctiption
  const url = props.pagepath
      ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
      : data.site.siteMetadata.siteUrl

  const imgurl = props.pageimg
      ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
      : props.blogimg || `${data.site.siteMetadata.siteUrl}/thumb.jpg`

  const imgw = props.pageimgw || 1280
  const imgh = props.pageimgh || 640
  
  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description}></meta>

      <link rel="canoniacl" href={url} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="og:app_id" content={data.site.siteMetadata.fbappid} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image.width" content={imgw} />
      <meta property="og:image.height" content={imgh} />
      
      <meta property="twitter:card" content="summary_large_image" />

    </Helmet>
  )
}

export default Seo


