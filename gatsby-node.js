const path = require('path')
const _ = require('lodash')

const wrapper = promise =>
  promise
    .then(result => {
      if (result.errors) {
        throw result.errors
      }
      return { result, error: null }
    })
    .catch(error => ({ error, result: null }))

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  let slug
  // Search for MDX filenodes
  if (node.internal.type === 'Mdx') {
    // If the frontmatter has a "slug", use it
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }
    // If not derive a slug from the "title" in the frontmatter
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = require.resolve('./src/templates/project.js')

  const { error, result } = await wrapper(
    graphql(`
      {
        projects: allMdx {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `)
  )

  if (!error) {
    const projectPosts = result.data.projects.edges

    projectPosts.forEach((edge, index) => {
      const next = index === 0 ? null : projectPosts[index - 1].node
      const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1].node

      createPage({
        path: edge.node.fields.slug,
        component: projectTemplate,
        context: {
          slug: edge.node.fields.slug,
          // Pass the current directory of the project as regex in context so that the GraphQL query can filter by it
          absolutePathRegex: `/^${path.dirname(edge.node.fileAbsolutePath)}/`,
          prev,
          next,
        },
      })
    })
    return
  }

  console.log(error)
}
