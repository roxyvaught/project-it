import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_TASKS_BY_PROJECT } from '../../utils/queries';
import { QUERY_USER } from '../../utils/queries';
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
const rows = [
  createData(0, 'Adam Sandler', 'Coffee'),
  createData(1, 'Gabriel Iglesias', 'Notebooks'),
  createData(2,'Trevor Noah', 'Cell Improvement'),
  createData(3, 'Joey Diaz', 'Housing Site'),
  createData(4, 'Tom Segura', 'Coffee'),
];

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
  console.log(state);
  const classes = useStyles();
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
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See More Teammates
        </Link>
      </div>
    </React.Fragment>
  );
}