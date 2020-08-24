const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
  }

  enum Status {
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
    status: Status
    users: [User]
    comments: [Comment]
  }

  type Project {
    _id: ID
    name: String
    description: String
    startDate: String
    endDate: String
    status: Status
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
    addProject(name: String!, description:String!, startDate:String!, endDate:String!, status:Status, owner: User): Project
    updateProject (name: String, description:String, startDate:String, endDate:String, status:Status, owner: User): Project
    addTask(_id: ID!,name:String!, description: String!,startDate:String!, endDate:String!,user:ID!, status: Status): Status
    updateTask(_id: ID,name:String, description: String,startDate:String, endDate:String,user:ID, status: Status):Status
    addComment(_id:ID,comment:String!): Comment
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
