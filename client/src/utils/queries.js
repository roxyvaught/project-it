import gql from 'graphql-tag';

export const QUERY_ALL_PROJECTS = gql`
{
    projects {
        _id
        projname
        description
        startDate
        endDate
        status
        owner
      }
  }`;

export const QUERY_PROJECT = gql`
    query getProject($_id: ID) {
        projects(_id: $_id) {
            _id
            projname
            description
            startDate
            endDate
            status
            owner
        }
    }
`;

export const QUERY_USERS = gql`
    {
        user {
            _id
            username
            email
        }
    }
`;

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_TASKS_BY_PROJECT = gql`

  query tasks($ownerProject: String!){ 
    tasks(ownerProject: $ownerProject) {
      _id
      name
      description
      startDate
      endDate
      status
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query comments($ownerTask: String!) {
    comments(ownerTask: $ownerTask) {
      _id
      comment
    }
  }
`;






