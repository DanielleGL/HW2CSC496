import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'

const BlogPost = ({ data }) => {
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <p>{data.mdx.frontmatter.date}</p>
            <MDXRenderer>
                {data.mdx.body}
            </MDXRenderer>
        </Layout>
    )
}
//remember to add in your id or it wont work
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`

export default BlogPost