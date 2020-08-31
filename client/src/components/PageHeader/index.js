import Auth from '../../utils/auth';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//import Container from '@material-ui/core/Container';
//import { positions } from '@material-ui/system';
import MenuIcon from '@material-ui/icons/Menu';
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png'
import { Tooltip } from '@material-ui/core';

//icons 
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { blueGrey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  fixedHeight: {
    height: 240,
  },
}));


const PageHeader = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
      <div>
    <CssBaseline />
    <AppBar position="absolute" >
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
          <div>
            <Link to="/"><img height="65px" src={Logo} alt="project-it"/></Link>
            </div>
            
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
   
    </div>
    
  );

};

export default PageHeader;