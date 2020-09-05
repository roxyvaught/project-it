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
  const classes = useStyles();
  const [teammate, setTeammate] = React.useState('');
  
  const handleChange = (event) => {
    setTeammate(event.target.value);
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
                    id="project"
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
                    defaultValue="2017-05-24"
                    className={classes.textField}
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
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </GridItem>
              </GridContainer>
              <div>&nbsp;&nbsp;</div>
              <GridContainer>
              <GridItem>
          <InputLabel id="select">Assign Teammate</InputLabel>
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
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="success">Add Your Project</Button>
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
