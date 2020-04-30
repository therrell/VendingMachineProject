import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.default,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
}));


export default function VMinfoModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    getDetailVMinfo();
  };

  const handleClose = () => {
    setOpen(false);
  };


  let result = [];
  //need to change apiLink
  const apiLink = 'http://127.0.0.1:8000/api/includes/';
  const getDetailVMinfo= () =>{

          axios.get(apiLink, {params: {vmid: props.data}}).then((response)=>{

              result = response.data;

          }).catch((error)=>{
              // console.log(this.state.findResult);
              console.log(error);

          });
      }

  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title" align="center"></h2>
      <TableContainer component={Paper}>
          <Table >
              <TableHead>
              <TableRow>
                  <TableCell align="left">VMID</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Product Type</TableCell>
                  <TableCell align="left">Product Price</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              // may change line 88 - 92 according to the schema
                {result.map((row) => (
                    <TableRow key={row.vmID}>
                    <TableCell align="left">{row.vmID}</TableCell>
                    <TableCell align="left">{row.productName}</TableCell>
                    <TableCell align="left">{row.productType}</TableCell>
                    <TableCell align="left">{row.productPrice}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
          </Table>
      </TableContainer>



      <Button type="button"
      variant="outlined"
      color="primary"
      onClick={handleClose}
      startIcon={<CloseIcon />}>
      Close
      </Button>

    </div>
  );

  return (
    <div>
      <Button type="button"
       variant="outlined"
       color="primary"
       onClick={handleOpen}>
        More
      </Button>
      <Modal
        open={open}
        onClose={handleClose}

        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

      {body}
      </Modal>
    </div>
  );
}
