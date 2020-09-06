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
    mutation addProject($projname: String!, $description: String!, $startDate: String!, $endDate: String!,$status: String,$owner:String!) {
        addProject(
            projname: $projname,
            description: $description,
            startDate: $startDate,
            endDate: $endDate,
            status: $status,
            owner: $owner)
            { 
            _id
            }
        
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject($_id:ID!,$projname: String, $description: String, $startDate: String, $endDate: String,$status: String,$owner:String) {
        updateProject(
            _id:$_id,
            projname: $projname,
            description: $description,
            startDate: $startDate,
            endDate: $endDate,
            status: $status,
            owner: $owner)
            { 
            _id
            }
        
    }
`;

export const ADD_TASK = gql`
    mutation addTask($name: String!, $description: String!, $startDate: String!, $endDate: String!,$status: String, $percentDone:Int, $criticalPath: Boolean, $owner:String!) {
        addTask(
            name: $name,
            description: $description,
            startDate: $startDate,
            endDate: $endDate,
            status: $status,
            percentDone: $percentDone,
            criticalPath: $criticalPath,
            owner: $owner)
            {
            _id
            }
        
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask($name: String!, $description: String!, $startDate: String!, $endDate: String!,$status: String, $percentDone:Int, $criticalPath: Boolean, $owner:String!) {
        updateTask(
            name: $name,
            description: $description,
            startDate: $startDate,
            endDate: $endDate,
            status: $status,
            percentDone: $percentDone,
            criticalPath: $criticalPath,
            owner: $owner)
            {
            _id
            }
        
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($comment:String!, $user: String!, $ownerTask:String!) {
        updateComment(
            comment: $comment,
            user: $user,
            ownerTask: $ownerTask)
            {
            _id
            }
        
    }
`;

export const ADD_OWNERUSER = gql`
    mutation addOwnerUser($ownerUser: String!) {
        addOwnerUser(
            owneruser: $owneruser)
            {
            _id
        }
    }
`;