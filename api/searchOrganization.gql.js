const graphql = require('../utils/graphql')

const query = graphql`
  query searchOrganizationDetail($login: String!) {
    organization(login: $login) {
      id
      isVerified
      name
      avatarUrl
      description
      email
      location
      members(first: 5) {
        nodes {
          ... on User {
            avatarUrl
            name
            login
          }
        }
      }
    }
  }
`

module.exports = {
  searchOrganizationDetail: query
}
