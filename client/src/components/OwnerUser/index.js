import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";
import ProjectSelect from '../ProjectSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { useMutation } from '@apollo/react-hooks';

import { ADD_OWNERUSER } from "../../utils/mutations.js";
import { QUERY_OWNERUSER } from '../../utils/queries';

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
  
const OwnerUser = () => {
    
    const [ownerUser, setOwnerUser] = useState('');
    
const [characterCount, setCharacterCount] = useState(0);
  
    const [addOwnerUser] = useMutation(ADD_OWNERUSER, {
        update(cache, { data: { addOwnerUser } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { ownerusers } = cache.readQuery({ query: QUERY_OWNERUSER });
            cache.writeQuery({
              query: QUERY_OWNERUSER,
              data: { ownerusers: [addOwnerUser, ...ownerusers] }
            });
          } catch (e) {
            console.error(e);
          };
      
          // update me object's cache, appending new thought to the end of the array
          //const { me } = cache.readQuery({ query: QUERY_ME });
          //cache.writeQuery({
           // query: QUERY_ME,
            //data: { me: { ...me, ownerusers: [...me.ownerusers, addOwnerUser] } }
          //});
        }
      });

      const handleChange = event => {
        if (event.target.value.length <= 280) {
          setOwnerUser(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
      const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add thought to database
          await addOwnerUser({
            variables: { ownerUser }
          });
      
          // clear form value
          setOwnerUser('');
        } catch (e) {
          console.error(e);
        }
      };
  
    const classes = useStyles();
    //const [teammate, setTeammate] = React.useState('');
    
    //const handleChange = (event) => {
      //setTeammate(event.target.value);
  //};
    return (
        
<GridContainer>
<GridItem xs={12} sm={12} md={8}>
  <Card>
      <FormControl onSubmit={handleFormSubmit}>
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
            value={ownerUser}
            onChange={handleChange}
          />
          <FormHelperText>Enter Your Teammate's Username</FormHelperText>
        </GridItem>
        {/*} <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Email address"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem> */}
      </GridContainer>
    </CardBody>
    <CardFooter>
      <Button color="success">
          Add User
          </Button>
    </CardFooter>
    </FormControl>
  </Card>
</GridItem>
</GridContainer>
);
}

export default OwnerUser;