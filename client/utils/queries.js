import gql from 'graphql-tag';

export const QUERY_ALL_PROJECTS = gql`
    projects {
        _id
        name
        description
        startDate
        endDate
        status
        tasks [
            _id
            name
            description
            createDate
            endDate
            status
            users [
                _id
                userName
                email
            ]
            comments [
                _id
                comment
                createDate
                user
            ]
        ]
        owner
    }
`;

export const QUERY_PROJECT = gql`
    query getProject($project: ID) {
        projects(_id: $project) {
            _id
            name
            description
            startDate
            endDate
            status
            tasks [
                _id
                name
                description
                createDate
                endDate
                status
                users [
                    _id
                    userName
                    email
                ]
                comments [
                    _id
                    comment
                    createDate
                    user
                ]
            ]
            user
        }
    }
`;

export const QUERY_USER = gql`
    {
        user {
            _id
            userName
            email
        }
    }
`;

