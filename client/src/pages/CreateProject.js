import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
//import PageHeader from '../components/PageHeader';
import Container from '@material-ui/core/Container';
//import { positions } from '@material-ui/system';
import Divider from '@material-ui/core/Divider';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function CreateProject() {
  const classes = useStyles();

  const [teammate, setTeammate] = React.useState('');
  
  const handleChange = (event) => {
    setTeammate(event.target.value);
};

  return (
<Container>
    {/*<PageHeader />*/}

    <form className={classes.container} noValidate>
        <FormControl>
    <TextField id="standard-basic" label="Project Name" />
        </FormControl>
  <div>
      <FormControl>
      <TextField
        id="date"
        label="Start Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </FormControl>
      <FormControl>
      <TextField
      id="date"
      label="End Date"
      type="date"
      defaultValue="2017-05-24"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
    </FormControl>
</div>
<Divider />
<div>
        <FormControl>
          <InputLabel id="demo-simple-select-label">teammate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={teammate}
            onChange={handleChange}
          >
            <MenuItem value={10}>Bob</MenuItem>
            <MenuItem value={20}>Sam</MenuItem>
            <MenuItem value={30}>Ana</MenuItem>
          </Select>
        </FormControl>
        
        </div>
    </form>

    </Container>
  );
}