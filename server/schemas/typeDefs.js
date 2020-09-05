const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  enum Status {
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }
  type Comment {
    _id: ID
    comment: String
    user: String
    ownerTask: String
  }
  type Task {
    _id: ID
    name: String
    description: String
    startDate: String
    endDate: String
    status: String
    percentDone: Int
    criticalPath: Boolean 
    ownerUser: String
    ownerProject: String
  }
  type Project {
    _id: ID
    projname: String
    description: String
    startDate: String
    endDate: String
    status: String
    owner: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    projects:[Project]
    project(_id: ID!):Project
    projectsByOwner(owner: String): [Project]
    user (_id:ID!): User
    users: [User]
    tasks(ownerProject: ID!): [Task]
    comments(ownerTask: String!): [Comment]
    projectByUser(owner:ID!):[Project]
    myTeam(owner:ID):String
    }
  type Mutation {
    addUser(username: String!, email: String!, password: String!):  Auth,
    addProject(projname: String!, description:String!, startDate:String!, endDate:String!, status:String, owner: String!): Project
    updateProject (_id: ID!, projname: String, description:String, startDate:String, endDate:String, status:String, owner: String): Project
    addTask(name:String!, description: String!,startDate:String!, endDate:String!,owner:ID!, status: String,percentDone:Int, criticalPath:Boolean,ownerUser:String!, ownerProject:String!): Task
    updateTask(_id: ID!, name:String, description: String, startDate:String, endDate:String, owner:ID, status: String, percentDone:Int, criticalPath:Boolean, ownerUser:String, ownerProject:String):Task
    addComment(comment:String!, user: String!, ownerTask:String!): Comment
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
