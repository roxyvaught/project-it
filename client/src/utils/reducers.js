  
import {
    UPDATE_PROJECT,
//  UPDATE_USER,
    UPDATE_TASK,
    ADD_COMMENT,
    ADD_TASK,
    ADD_PROJECT,
    UPDATE_CURRENT_PROJECT
} from './actions';
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch(action.type) {
        // if an action type of `UPDATE_USER`, return a new state object with an updated users array
        // case UPDATE_USER:
        //     return {
        //         ...state,
        //         users: [...action.users],
        //     };
        // if an action type of `UPDATE_PROJECT`, return a new state object with an updated projects array
        case UPDATE_PROJECT:
            return {
                ...state,
                projects: [...action.projects],
            };
        // if an action type of `UPDATE_TASK`, return a new state object with an updated tasks array
        case UPDATE_TASK:
            return {
                ...state,
                tasks: [...action.tasks],
            };
        // if we have a list of projects and `ADD_PROJECT` comes through, return a new state object with the new project added to the array
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...action.projects],
            };
           
        // if action type of `ADD_TASK`, return a new state object with the new task added to the tasks array
        case ADD_TASK:
            return {
                ...state,
                tasks: [...action.tasks],
            };
        // if action type of `ADD_COMMENT`, return a new state object with the new comment added to the comments array
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...action.comments],
            };
        case UPDATE_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: [...action.currentProject]
            };
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};