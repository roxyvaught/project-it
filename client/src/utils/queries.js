import gql from 'graphql-tag';

// export const QUERY_ALL_PROJECTS = gql`
//     projects {
//         _id
//         name
//         description
//         startDate
//         endDate
//         status
//         tasks [
//             _id
//             name
//             description
//             createDate
//             endDate
//             status
//             users [
//                 _id
//                 username
//                 email
//             ]
//             comments [
//                 _id
//                 comment
//                 createDate
//                 user
//             ]
//         ]
//         owner
//     }
// `;

// export const QUERY_PROJECTS = gql`
//     query getProject($project: ID) {
//         projects(_id: $project) {
//             _id
//             name
//             description
//             startDate
//             endDate
//             status
//             tasks {
//                 _id
//                 name
//                 description
//                 createDate
//                 endDate
//                 status
//                 users {
//                     _id
//                     username
//                     email
//                 }
//                 comments {
//                     _id
//                     comment
//                     createDate
//                     user
//                 }
//             }
//             user
//         }
//     }
// `;

export const QUERY_PROJECTS = gql`
    query getProjects($owner: String!) {
        projectsByOwner(owner: $owner) {
            _id
            name
        }
    }
`;

export const QUERY_PROJECTSBYOWNER = gql`
    query projectsByOwner($owner: String) {
        projectsByOwner(owner: $owner) {
            _id
            name
            description
            startDate
            endDate
            status
            tasks { 
                _id
                name
                description
                startDate
                endDate
                status
                comments {
                    _id
                    comment
                    createDate
                    user {
                        _id
                        username
                        email
                    }
                }
                users {
                    _id
                    username
                    email
                }
            }
            owner
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