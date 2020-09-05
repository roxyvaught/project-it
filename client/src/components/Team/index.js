import React, { useEffect, useState }  from 'react';
//import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
//import { QUERY_TASKS_BY_PROJECT } from '../../utils/queries';
import { QUERY_USERS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../Header';
/*function  Buildteam () {
  const { loading, data } = useQuery(QUERY_TASKS_BY_PROJECT, {variables: {ownerProject: userid}});
  console.log (data);
}*/
// Generate Team Data
function createData(id, name, project) {
  return { id, name, project };
}
// query projects use current user id.  Store in array.  Query tasks according to each project store in array.  Query user
// 
/*const rows = [
  createData(0, 'Adam Sandler', 'Coffee'),
  createData(1, 'Gabriel Iglesias', 'Notebooks'),
  createData(2,'Trevor Noah', 'Cell Improvement'),
  createData(3, 'Joey Diaz', 'Housing Site'),
  createData(4, 'Tom Segura', 'Coffee'),
];*/
//newstuff
const rows =[];
function BuildUsers(userdata, rows){
  console.log (userdata);
  let i=0;
  for (i=0;i<userdata.length;i++){
    rows.push("createData("+ i , ",'" + userdata[i].username,",'" + userdata[i].email,"')")
  }
  return rows;
  console.log(rows)
}
//end
function preventDefault(event) {
  event.preventDefault();
}
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function Team() {
  const [state, dispatch] = useStoreContext();
  const [currentProject, setCurrentProject] = useState({});
  //console.log(state.currentProject)
  const  data  = useQuery(QUERY_USERS);
  //const whatami = data.data;
  //BuildUsers(data,rows);
  const classes = useStyles();
  // use JSX to print out the names of the users
  function displayNames(data) {
    if (data) {
      console.log(data);
      return data.users.map(user => (
        <TableRow key={user._id}>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
      ))
    }
    else {
     console.log('There is nothing in data');
    }
  };
  return (
    <React.Fragment>
      <Header>My Team</Header>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell> Project(s) Assigned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell >{row.project}</TableCell>
            </TableRow>
          ))}
          {/* display the names of users in the database */}
          {displayNames(data.data)}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}