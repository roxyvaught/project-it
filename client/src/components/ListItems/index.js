
import Auth from '../../utils/auth';
import React, { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { idbPromise } from '../../utils/helpers';
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_PROJECTS } from '../../utils/queries';
import { UPDATE_PROJECTS } from '../../utils/actions';

function SecondaryListItems() {

  const [state, dispatch] = useStoreContext();

  const { currentProjects } = state;


  function getUserID() {
    if (Auth.loggedIn()) {
      const token = Auth.getToken();
      const user = Auth.getProfile(token);
      //console.log(user.data._id);
      return user.data._id
    }  
  }
  const userid = getUserID();
 
  const { loading, data } = useQuery(QUERY_PROJECTS, {variables: {owner: userid}});

  console.log(data);

  useEffect (() => {
    if (data) {
     
      dispatch({
        type: UPDATE_PROJECTS,
        projects: data.projectsByOwner
      });

      data.projectsByOwner.forEach((project) => {
        idbPromise('projects', 'put', project);
      });
    } else if (!loading) {
      console.log('no internet found, so using local database');
      idbPromise('projects', 'get').then((projects) => {
        dispatch({
          type: UPDATE_PROJECTS,
          projects: projects
        });
      });
    }
  }, [data, loading, dispatch]);

  // How do you get the state lengths or apply to the state
  function showProjects(projects) {
     if (!currentProjects) {
      return state.products;
    }
    return state.projects(projects => projects.category._id === currentProjects);
    //return state.projects.filter(projects => projects.category._id === currentProjects);
  } 

return (
      <div>
    <ListSubheader inset>Current Projects</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      {showProjects(data)}
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Coffee Machines" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Housing Site" />
    </ListItem>
  </div>
  );
}

export default SecondaryListItems;