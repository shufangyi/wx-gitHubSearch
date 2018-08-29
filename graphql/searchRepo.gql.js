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
          url
          createdAt
          updatedAt
          description
          forkCount
          stargazers(first: 1) {
            totalCount
          }
          primaryLanguage {
            name
            color
          }
          licenseInfo {
            name
          }
          repositoryTopics(first: 5) {
            nodes {
              ... on RepositoryTopic {
                url
                topic {
                  name
                }
              }
            }
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
