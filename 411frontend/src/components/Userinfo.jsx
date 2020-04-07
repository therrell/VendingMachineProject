import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
// import Snackbar from '@material-ui/core/Snackbar';
// import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Popper from '@material-ui/core/Popper';
//import Popup from "reactjs-popup";
import "./Mainfunction.jsx"
import "./styles/Login.css"
import AddCRNModal from "./AddCRNModal.jsx"
import AddProductModal from "./AddProductModal.jsx"
import Deletemodal from "./Deletemodal.jsx"
import "./styles/Userinfo.css"


const apiLink = '';
//Once we link the data we can import the crn[], and products[] from mainfunction
const products_1 = ['Ruffles','Fritos Twists Honey BBQ','Peanut M&M','Monster Green','Gold Peak Sweet Tea']
const crn_1 = ['64977','31352','57409','57419','34290'];

function createData(name) {
  return { name };
}

const rows = []
for(var i = 0; i < crn_1.length; i++) {
  rows.push(createData(crn_1[i]))
};

const rows2 = []
for(var i = 0; i < products_1.length; i++) {
  rows2.push(createData(products_1[i]))
};

function deleteCRN(i) {
  // console.log("I'm in delete")
  // rows.splice(0,1)
}

class Userinfo extends Component {
    render(){
        return(
            <div className="container2">
            <br/>
            <br/>
            <Link to="/mainfunction" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
                  >
                  Main Functions
                </Button>
            </Link>
            <br/>
            <br/>
            <Typography variant="h2">
            My Info
            </Typography>
            <Paper className="paper2">
                    <TableContainer component={Paper}>
                     <Table aria-label="simple table">
                     <TableHead>
                        <TableRow>
                          <TableCell align="right">  </TableCell>
                          <TableCell align="center"> <h2> My Courses (CRN's) </h2> </TableCell>
                          <TableCell align="right">  </TableCell>
                        </TableRow>
                      </TableHead>
                       <TableBody>
                         {rows.map((row,i) => (
                           <TableRow key={row.name}>
                           <TableCell align="left">
                          </TableCell>
                             <TableCell align="center" component="th" scope="row">
                             {row.name}
                             </TableCell>
                            <TableCell align="left">
                            <Deletemodal/>
                           </TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                     <br/>
                     <AddCRNModal/>
                     <br/>
                   </TableContainer>

                    <br/>

                        <TableContainer component={Paper}>
                         <Table aria-label="simple table">
                         <TableHead>
                            <TableRow>
                              <TableCell align="right">  </TableCell>
                              <TableCell align="center"> <h2> Products I Like </h2> </TableCell>
                              <TableCell align="right">  </TableCell>
                            </TableRow>
                          </TableHead>
                           <TableBody >
                             {rows2.map((row) => (
                               <TableRow key={row.name}>
                                 <TableCell align="left">
                                 </TableCell>
                                 <TableCell align="center" component="th" scope="row">
                                 {row.name}
                                 </TableCell>
                                 <TableCell align="left">
                                 <Deletemodal/>
                                </TableCell>
                               </TableRow>
                             ))}
                           </TableBody>
                         </Table>
                         <br/>
                         <AddProductModal/>
                         <br/>
                       </TableContainer>
                </Paper>
            </div>
        )
    }
}

export default (Userinfo);
