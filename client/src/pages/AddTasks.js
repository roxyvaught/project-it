import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PageHeader from '../components/PageHeader'
import TextField from '@material-ui/core/TextField';
import Team from '../components/Team';
import ProjectSelect from '../components/ProjectSelect';
import Slider from '../components/Slider'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// add task imports

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TASK } from '../utils/mutations';

import { UPDATE_TASK } from '../utils/actions';
import { idbPromise } from "../utils/helpers";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function CreateProject() {
  const [addTask, ] = useMutation(ADD_TASK);
      
  const [, dispatch] = useStoreContext();

 // get the userID
 function getUserID() {
  if (Auth.loggedIn()) {
    const token = Auth.getToken();
    const user = Auth.getProfile(token);
    console.log(user.data._id);
    return user.data._id;
  }
}
const userid = getUserID();     

  // initialize the variables in state
  const [formState, setFormState] = React.useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "NOT_ASSIGNED",
    percentDone: "",
    criticalPath: ""
  });

  
  const handleFormSubmit = async event => {

    //event.preventDefault();
    try {
      const mutationResponse = await addTask({ variables: {
        name: formState.name,
        description: formState.description,
        startDate: formState.startDate,

        endDate: formState.endDate,
        status: formState.status,
        percentDone: formState.percentDone,
        criticalPath: formState.criticalPath,
        owner: userid
      }})
      const data = mutationResponse.data;
      //console.log(data);

        // store the data in the globalstate object
        dispatch({
          type: UPDATE_TASK,
          tasks: data.addTask
        });

        // save the project to indexedDB
        // data.addProject.forEach((project) => {
           idbPromise('tasks', 'put', data.addTask);
        // });
 
    } catch (e) {
      console.log(e);
    }
  };

  // track the form fields
  const handleChange1 = (e) => {
    const key = e.target.id;
    const val = e.target.value;
    const newState = {...formState};
    newState[key] = val;
    setFormState(newState);
  };

  const classes = useStyles();
  const [teammate, setTeammate] = React.useState('');
  
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setTeammate(event.target.value);
    setState({ ...state, [event.target.name]: event.target.checked });
};


  return (
    
    <div>
      <PageHeader />
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;&nbsp;</div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Add Your Task</h4>
              <p className={classes.cardCategoryWhite}>Start Adding Tasks to Your Project</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <ProjectSelect />
              <GridItem xs={12}>
                  <CustomInput
                    labelText="Task Name"
                    id="name"
                    value={formState.name}
                    defaultValue={formState.name}
                    inputProps={{
                      onChange: (e) => handleChange1(e)
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <CustomInput
                  
                    labelText="Description"
                    id="description"
                    value={formState.description}
                    defaultValue={formState.description}
                    inputProps={{
                      onChange: (e) => handleChange1(e)
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue={formState.startDate}
                    className={classes.textField}
                    onChange={(e) => handleChange1(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  defaultValue={formState.startDate}
                  className={classes.textField}
                  onChange={(e) => handleChange1(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </GridItem>
              </GridContainer>
              <div>&nbsp;&nbsp;</div>
              <GridContainer>
              <GridItem>
          {/*<InputLabel id="select">Assign Teammate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            value={teammate}
            onChange={handleChange}
          >
            <MenuItem value={10}>Mishka</MenuItem>
            <MenuItem value={20}>Sam</MenuItem>
            <MenuItem value={30}>Ana</MenuItem>
                </Select> */}
          
        <Slider />

          <FormControlLabel
        control={<Checkbox checked={state.checkedA} 
        onChange={handleChange} 
        name="checkedA" />}
        label="On Critical Path"
        inputProps={{
          onChange: (e) => handleChange1(e)
        }}
      />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            <Button component={Link} to="/" color="success" onClick={() => handleFormSubmit(userid)}>
              Add Task
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            
            <CardBody profile>
              <Team />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
