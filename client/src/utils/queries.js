import gql from 'graphql-tag';

export const QUERY_ALL_PROJECTS = gql`
    projects {
        _id
        name
        description
        startDate
        endDate
        status
        tasks {
            name
            description
            startDate
            endDate
            status
            users {
                username
            }
            comments {
                comment
                createDate
                users {
                    username
                }
            }
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;