const graphql = require('../utils/graphql')

const query = graphql`
  query searchGitHubRepo(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      type: REPOSITORY
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      nodes {
        ... on Repository {
          name
          nameWithOwner
          projectsUrl
          createdAt
          updatedAt
          description
          forkCount
          licenseInfo {
            name
          }
          owner {
            avatarUrl
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      repositoryCount
    }
  }
`

module.exports = {
  serachRepo: query
}
