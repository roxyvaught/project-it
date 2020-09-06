import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
// add task imports
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TASK } from '../../utils/mutations';
import { UPDATE_TASK } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));


function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};



const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider() {
  const [addTask, ] = useMutation(ADD_TASK);
  
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

  const [, dispatch] = useStoreContext();
  // initialize the variables in state
  const [formState, setFormState] = React.useState({
    percentDone: ""
  });

  
  const handleFormSubmit = async event => {

    //event.preventDefault();
    try {
      const mutationResponse = await addTask({ variables: {
        percentDone: formState.percentDone,
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
  return (
    <div className={classes.root}>
     
      <div className={classes.margin} />
      <Typography gutterBottom>Percent Complete</Typography>
      <PrettoSlider 
      id="percentComplete"
      inputProps={{
        onChange: (e) => handleChange1(e)
      }}
      valueLabelDisplay="auto" 
      aria-label="pretto slider" 
      defaultValue={20} />
    </div>
  );
}
