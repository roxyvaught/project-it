import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../Header';

// Generate Team Data
function createData(id, name, project) {
  return { id, name, project };
}

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