import Auth from '../../utils/auth';
import React , { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { idbPromise } from '../../utils/helpers';
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_PROJECTS } from '../../utils/queries';
import { UPDATE_PROJECTS } from '../../utils/actions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { mainListItems } from '../ListItems';
//import { secondaryListItems } from '../ListItems';
import Chart from '../Chart';
import Projects from '../LatestProject';
import Team from '../Team';
/*import { Link } from 'react-router-dom';*/
import Logo from '../../assets/images/Logo.png'
import { Tooltip } from '@material-ui/core';

//icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { blueGrey } from '@material-ui/core/colors';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    padding: '0 8px',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const [state, dispatch] = useStoreContext();
  const [currentProject, setCurrentProject] = useState({});
  const { id } = useParams();
  const { projects } = state;

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

  

  //console.log(data);

  useEffect (() => {
    if (projects.length) {
      setCurrentProject(projects.find(project => project._id === id));
    }
    // if there is data to be stored
    else if (data) {
      // store the data in the globalstate object
      dispatch({
        type: UPDATE_PROJECTS,
        projects: data.projectsByOwner
      });

      // take each project and save it to indexedDB
      data.projectsByOwner.forEach((project) => {
        idbPromise('projects', 'put', project);
      });
      //console.log(data);
    } else if (!loading) {
      // if it isn't loading, we are offline and need to get projects from indexedDB
      console.log('no internet found, so using local database');
      idbPromise('projects', 'get').then((projects) => {
        // get the information from the local indexedDB and set the global state for offline browsing
        dispatch({
          type: UPDATE_PROJECTS,
          projects: projects
        });
      });
    }
  }, [projects, data, loading, dispatch]);

  function changeProject(e) {
    e.persist();
    const projectId = e.target.offsetParent.id;
    console.log(projectId);

  }

  // Display a list of the Projects
  function showProjects(projects) {
    if (projects) {
      //console.log(projects);
      if (projects.projectsByOwner.length === 0) {
        return (
          <ListItem>
            <ListItemText>
              You must create a project
            </ListItemText>
          </ListItem>
        )
      }
      else {
        return projects.projectsByOwner.map(project => (
          <ListItem button key={project._id} id={project._id} onClick={changeProject} >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText 
              id={project._id}
              primary={project.projname} 
            />
          </ListItem>
        
        ))
    }}
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            
            <img height="65px" src={Logo} alt="project-it"/>
          </Typography>
          {Auth.loggedIn() ? (
            <>
            <Tooltip title="Logout" interactive><IconButton href="/" onClick={logout}><ExitToAppIcon fontSize="large" style={{ color: blueGrey[50] }} ></ExitToAppIcon></IconButton></Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Login" interactive><IconButton href="/login"><FaceIcon fontSize="large" style={{ color: blueGrey[50] }} ></FaceIcon></IconButton></Tooltip>
          <Tooltip title="Sign Up" interactive><IconButton href="/signup"><PersonAddIcon fontSize="large" style={{ color: blueGrey[50] }} ></PersonAddIcon></IconButton></Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      <List>
        <div>
          <ListSubheader inset>Current Projects</ListSubheader>

            {showProjects(data)}
                
        </div>    
      </List>
      
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={4}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Projects */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Projects />
              </Paper>
            </Grid>
            {/* Team */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Team />
              </Paper>
            </Grid>
          </Grid>
       
        </Container>
      </main>
    </div>
  );
}