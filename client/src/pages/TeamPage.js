import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import PageHeader from '../components/PageHeader';
import ProjectSelect from '../components/ProjectSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Team from '../components/Team';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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

export default function UserProfile() {
  const classes = useStyles();
  //const [teammate, setTeammate] = React.useState('');
  
  //const handleChange = (event) => {
    //setTeammate(event.target.value);
//};
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
              <h4 className={classes.cardTitleWhite}>Teammates</h4>
              <p className={classes.cardCategoryWhite}>Build Your Team</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <ProjectSelect />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                   <FormHelperText>Enter Your Teammate's Username</FormHelperText>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            
              {/*<GridContainer>
              <GridItem>
          <InputLabel id="select">teammate</InputLabel>
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
          </Select>
     
                </GridItem>
              </GridContainer>*/}
            </CardBody>
            <CardFooter>
              <Button color="success">Add User</Button>
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
