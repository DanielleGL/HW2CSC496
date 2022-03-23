import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'


//start of https://blog.devgenius.io/gatsby-js-render-data-from-wordpress-and-rest-api-70297e267caa

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    query {
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)




    const postTemplate = path.resolve(`./src/templates/post.js`)
    result.data.allWordpressPost.edges.forEach(edge => {
        createPage({
            path: edge.node.slug,
            component: slash(postTemplate),
            context: {
                id: edge.node.id,
            },
        })
    })
}


const axios = require("axios")
const get = endpoint => axios.get(`https://pokeapi.co/api/v2${endpoint}`)
const getPokemonData = names =>
    Promise.all(
        names.map(async name => {
            const { data: pokemon } = await get(`/pokemon/${name}`)
            return { ...pokemon }
        })
    )
exports.createPages = async ({ actions: { createPage } }) => {
    const allPokemon = await getPokemonData(["mew", "ditto", "squirtle"])
    createPage({
        path: `/pokemon`,
        component: require.resolve("./src/templates/all-pokemon.js"),
        context: { allPokemon },
    })
}

//end

const BlogPage = ({ data }) => {
    return (
        <Layout pageTitle="My Blog Posts">
            {
                data.allMdx.nodes.map(node => (
                    <article key={node.id}>
                        <h2>
                            <Link to={`/blog/${node.slug}`}>
                                {node.frontmatter.title}
                            </Link>
                        </h2>
                        <p>Posted: {node.frontmatter.date}</p>
                    </article>
                ))
            }
        </Layout>
    )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`

export default BlogPage