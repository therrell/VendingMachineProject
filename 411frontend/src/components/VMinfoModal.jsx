


import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import "./styles/mainfunction.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Modal from '@material-ui/core/Modal';
const apiLink = 'http://127.0.0.1:8000/api/includesinfo/';

class VMinfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            crn: [],
            products: [],
            searchinfo: '',
            findResult: [],
            detailInfo: [],
            back: false,
            open:false,
            catchError: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getDetailVMinfo = this.getDetailVMinfo.bind(this);

    }
     handleOpen() {
      this.setState({
        open: true
    });
          this.getDetailVMinfo();


        };

         handleClose  ()  {
          this.setState({
            open: false
        });
        };




   getDetailVMinfo(){
   console.log(this.props.vmId);
          axios.get(apiLink, {params: {vmid: this.props.vmId}}).then((response)=>{

            this.setState({
                detailInfo: response.data
            })
            console.log(this.state.detailInfo);

          }).catch((error)=>{

              console.log(error);

          });
      }

    render() {


        return (
          <div onLoad={this.getDetailVMinfo}>
                  <Button type="button"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpen}>
                    More
                </Button>

                  <Modal
                    open={this.state.open}
                    onClose={this.handleClose}

                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >

          <div className="Modal" component={Paper}>
          <Paper className="paper">
                 <h2 id="simple-modal-title" align="center">Detail Product Info</h2>
                  <TableContainer component={Paper} >
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

                      {this.state.detailInfo.map((row) => (
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

          <br></br>

                  <Button type="button"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClose}
                    startIcon={<CloseIcon />}>
                    Close
                      </Button>

                      </Paper>

                </div>

                  </Modal>
                </div>

        )
    }
}
VMinfoModal.defaultProps = {
  vmId: undefined
}
export default (VMinfoModal);
