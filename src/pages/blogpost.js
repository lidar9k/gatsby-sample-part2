import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import { faChevronLeft, faChevronRight, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"

const options = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node, children) => (
            <h2>
                <FontAwesomeIcon icon={faCheckSquare} />
                {children}
            </h2>
        ),
        [BLOCKS.EMBEDDED_ASSET]: node => (
            <GatsbyImage
              image={node.data.target.gatsbyImageData}
              alt={
                node.data.target.description
                  ? node.data.target.description
                  : node.data.target.title
              }
            />
        ),
    },
    renderText: text => {
        return text.split("\n").reduce((children, textSegment, index) => {
          return [...children, index > 0 && <br key={index} />, textSegment]
        }, [])
      },
}

const BlogPost = ({ data }) => (
    <Layout>
        <div>
            <div className="eyecatch">
                <figure>
                    <GatsbyImage 
                        image={data.contentfulBlogPost.eyecatch.gatsbyImageData} 
                    alt={data.contentfulBlogPost.eyecatch.description} 
                    />
                </figure>
            </div>
            <article className="content">
                <div className="container">
                <h1 className="bar">
                    {data.contentfulBlogPost.title}
                </h1>
                <aside className="info">
                    <time dateTime={data.contentfulBlogPost.publishDate}>
                        <FontAwesomeIcon icon={faClock} />
                        {data.contentfulBlogPost.publishDateJP}
                    </time>
                    <div className="cat">
                    <FontAwesomeIcon icon={faFolderOpen} />
                    <ul>
                        {data.contentfulBlogPost.category.map(cat => (
                            <li className={cat.categorySlug} key={cat.id}>
                                {cat.category}
                            </li>
                        ))}
                    </ul>
                    </div>
                </aside>
                <div className="postbody">
                    {renderRichText(data.contentfulBlogPost.content, options)}
                </div>
                <ul className="postlink">
                    <li className="prev">
                    <a href="base-blogpost.html" rel="prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                        <span>前の記事</span>
                    </a>
                    </li>
                    <li className="next">
                    <a href="base-blogpost.html" rel="next">
                    <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                    </li>
                </ul>
            </div>
        </article>
    </div>

    </Layout>
)

export default BlogPost

export const query = graphql`
query {
        contentfulBlogPost {
            title
            publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
            publishDate
            category {
                category
                categorySlug
                id
            }
            eyecatch {
                gatsbyImageData
                description
            }
            content {
                raw
                references {
                    ... on ContentfulAsset {
                      contentful_id
                      __typename
                      gatsbyImageData(layout: FULL_WIDTH)
                      title
                      description
                    } 
                }
            }
        }
    }
`