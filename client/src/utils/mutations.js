import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!,
        $description: String!,
        $startDate: String!,
        $endDate: String!,
        $status: Status,
        $owner: ID!
        ) 
        {
            addProject(
            name: $name
            description: $description
            startDate: $startDate
            endDate: $endDate
            status: $status
            owner: $owner    
            ) {
                _id
                name
                description
                startDate
                endDate
                status
                owner
            }
        }
`;
