const graphql = require('../utils/graphql')

const query = graphql`
  query repoDetail($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
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
`

module.exports = {
  repoDetail: query
}
