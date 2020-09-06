import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../utils/GlobalState';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ADD_PROJECT } from '../utils/mutations';
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';

import { UPDATE_PROJECTS } from '../utils/actions';
import PageHeader from '../components/PageHeader'
import TextField from '@material-ui/core/TextField';
import Team from '../components/Team';
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
  const [addProject, ] = useMutation(ADD_PROJECT);
      
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


  const classes = useStyles();

  // initialize the variables in state
  const [formState, setFormState] = React.useState({
    projname: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "NOT_ASSIGNED"
  });
  

  const handleFormSubmit = async event => {

    //event.preventDefault();
    try {
      const mutationResponse = await addProject({ variables: {
        projname: formState.projname,
        description: formState.description,
        startDate: formState.startDate,
        endDate: formState.endDate,
        status: formState.status,
        owner: userid
      }})
      const data = mutationResponse.data;
      //console.log(data);

        // store the data in the globalstate object
        dispatch({
          type: UPDATE_PROJECTS,
          projects: data.addProject
        });

        // save the project to indexedDB
        // data.addProject.forEach((project) => {
           idbPromise('projects', 'put', data.addProject);
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
              <h4 className={classes.cardTitleWhite}>Add Your Project</h4>
              <p className={classes.cardCategoryWhite}>Start organizing your next adventure</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12}>
                  <CustomInput
                  
                    labelText="Project Name"
                    id="projname"
                    value={formState.projname}
                    defaultValue={formState.projname}
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
                    id="startDate"
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
                  id="endDate"
                  label="End Date"
                  type="date"
                  defaultValue={formState.endDate}
                  className={classes.textField}
                  onChange={(e) => handleChange1(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </GridItem>
              </GridContainer>
              <div>&nbsp;&nbsp;</div>
            </CardBody>
            <CardFooter>
              <Button component={Link} to="/" color="success" onClick={() => handleFormSubmit(userid)}>Add Your Project</Button>
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
