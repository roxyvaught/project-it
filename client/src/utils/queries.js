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
                userName
            }
            comments {
                comment
                createDate
                users {
                    userName
                }
            }
        }
    }
`;