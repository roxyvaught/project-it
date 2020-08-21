import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from '../Header';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  projectContext: {
    flex: 1,
  },
});

export default function Projects() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header>Latest Project</Header>
      <Typography component="p" variant="h5">
        Housing Development
      </Typography>
      <Typography color="textSecondary" className={classes.projectContext}>
        Last worked on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Project Details
        </Link>
      </div>
    </React.Fragment>
  );
}