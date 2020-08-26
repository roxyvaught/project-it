import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        comments: [],
        //cartOpen: false,
        tasks: [],
        projects: [],
        currentProject: ''

        // comment out this line in case we wish to keep track of the task as well
//      ,currentTask: ''
    });

    // rem this line out when going to production
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
}

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };