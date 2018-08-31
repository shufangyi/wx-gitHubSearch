const graphql = require('../utils/graphql')

const query = graphql`
  query searchUserDetail($login: String!) {
    user(login: $login) {
      id
      avatarUrl
      name
      organizations(first: 3) {
        nodes {
          ... on Organization {
            avatarUrl
          }
        }
        totalCount
      }
      bio
      company
      location
      createdAt
      email
      followers() {
        totalCount
      }
      following() {
        totalCount
      }
      repositories(first: 5, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          ... on Repository {
            name
          }
        }
      }
    }
  }
`

module.exports = {
  serachUserDetail: query
}
