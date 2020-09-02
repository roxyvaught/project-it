const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Project, Task } = require('../models');
const { signToken } = require('../utils/auth');
//const { findOneAndUpdate } = require('../models/User');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {

    Query: {
        projects: async () => {
            return await Project.find();
        },
        project: async (parent, {_id}) => {
            return await Project.findById(_id);
        },
        projectsByOwner: async (parent, args) => await Project.find(args),
        user: async (parent, {_id}) =>{
            return await User.findById(_id);
        },
        users: async () => {
            return await User.find();
        },
        tasks: async (parent,{_id}) =>{
            const projectTasks = await Project.findById(_id);
            return projectTasks.tasks;
        },
        comments: async (parent,args) =>{
            const taskComment = await Task.findById(_id);
            return taskComment.comments;
        },
        helloWorld: () => {
            return 'Hello World!';
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log(user);
            console.log(token);
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
        addProject: async (parent, args) =>{
            return await Project.create(args)

        },
        updateProject: async (parent, args, context) =>{
            
            if (context.name){
                const updateProjName = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {name:context.name}
                )
                return updateProjName;
            }; 
            if (context.description){
                const updateProjDesc = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {description:context.description}
                )
                return updateProjDesc;
            };
            if (context.startDate){
                const updateProjSDate = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {startDate:context.startDate}
                )
                return updateProjSDate;
            };
            if (context.endDate){
                const updateProjEDate = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {endDate:context.endDate}
                )
                return updateProjEDate;
            };
            if (context.status){
                const updateProjStatus = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {status:context.status}
                )
                return updateProjStatus;
            };
            if (context.owner){
                const updateProjOwner = await Project.findOneAndUpdate(
                    {_id: context.id},
                    {owner:context.owner}
                )
                return updateProjOwner;
            };
        },
        addTask: async (parent, args) =>{
            const projId = args.id;
            const newTask = await Task.create({name: args.name},
                {description: args.description},
                {startDate: args.startDate},
                {endDate: args.endDate}, 
                {status: args.status},
                {owner: args.owner}
                );
            const updatedProj = await Project.findOneAndUpdate(
                {_id:projId},
                { $push: { tasks: {newTask } } },
            )
            return updatedProj;
        },
        updateTask: async (parent, args,context) =>{
            if (context.name){
                const updateTaskName = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {name:context.name}
                )
                return updatedTaskName;
            }; 
            if (context.description){
                const updateTaskDesc = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {description:context.description}
                )
                return updateTaskDesc;
            };
            if (context.startDate){
                const updateTaskSDate = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {startDate:context.startDate}
                )
                return updateTaskSDate;
            };
            if (context.endDate){
                const updateTaskEDate = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {endDate:context.endDate}
                )
                return updateTaskEDate;
            };
            if (context.status){
                const updateTaskStatus = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {status:context.status}
                )
                return updateTaskStatus;
            };
            if (context.owner){
                const updateTaskOwner = await Task.findOneAndUpdate(
                    {_id: context.id},
                    {owner:context.owner}
                )
                return updateTaskOwner;
            }
        },
        addComment: async (parent, args) =>{
            const taskId = args.id;
            const newComment = await Comment.create({comment: args.comment},
                {user: args.user}
                );
            const updatedTask = await Task.findOneAndUpdate(
                {_id:taskId},
                { $push: { comments: {newComment} } },
            );
            return updatedTask;
        }
    }
}
module.exports = resolvers;
