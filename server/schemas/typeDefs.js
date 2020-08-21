const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
  }

  type enum {
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }

  type Comment {
    _id: ID
    comment: String
    createDate: String
    user: User
  }

  type Task {
    _id: ID
    name: String
    description: String
    createDate: String
    endDate: String
    status: enum
    users: [User]
    comments: [Comment]
  }

  type Project {
    _id: ID
    name: String
    description: String
    startDate: String
    endDate: String
    status: enum
    tasks:[Task]
    owner: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    projects:[Project]
    project(_id: ID!):Project
    user: User
    tasks(project: ID): [Task]
    comments(task: ID): [Comment]
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    updateUser(userName: String,  email: String, password: String): User
    addProject(name: String!, description:String!, startDate:String!, endDate:String!, status:enum, owner ): Project
    updateProject : 
    addTask
    updateTask
    addComment
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
