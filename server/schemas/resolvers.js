const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Project, Task } = require('../models');
const { signToken } = require('../utils/auth');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {

    Query: {
        projects: async () => {
            return await Project.find();
        },
        project: async (parent, {_id}) => {
            return await Project.findById(_id);
        },
        user: async (parent, {_id}) =>{
            return await User.findById(_id);
        },
        tasks: async (parent,{_id}) =>{
            const projectTasks = await Project.findById(_id);
            console.log (projectTasks);
            

        },
        comments: async (parent,{_id}) =>{
            const taskComment = await Task.findById(_id);
            console.log (taskComment);
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
      
            return { token, user };
        },
        updateUser: async () =>{},
        addProject: async (parent, args) =>{


        },
        updateProject: async () =>{},
        addTask: async () =>{},
        updateTask: async () =>{},
        addComment: async () =>{},
        

    }





}
module.exports = resolvers;
