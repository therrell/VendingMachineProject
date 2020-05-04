import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import "./Mainfunction.jsx"
import "./styles/Login.css"
import AddCRNModal from "./AddCRNModal.jsx"
import AddProductModal from "./AddProductModal.jsx"
import EditModal from "./EditModal.jsx"
import EditModalProduct from "./EditModalProduct.jsx"
import Deletemodal from "./Deletemodal.jsx"
import "./styles/Userinfo.css"



const apiLink = 'http://127.0.0.1:8000/api/courses/';;
const apiLink_pro = 'http://127.0.0.1:8000/api/products/';;
const apiLink_takes = 'http://127.0.0.1:8000/api/usertakes/';;
const apiLink_likes = 'http://127.0.0.1:8000/api/userlikes/';;


class Userinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crn_info: [],
      product_info: [],
      catchError: false,
      newCRN: '',
      newSubj: '',
      newNum: '',
      newBuildId: '',
      newProName: '',
      newProType: '',
      newPrice: ''
    }

    this.loadProducts = this.loadProducts.bind(this);
    this.loadCRNs = this.loadCRNs.bind(this);
    this.deleteCRN = this.deleteCRN.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addCRN = this.addCRN.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.editCRN = this.editCRN.bind(this);
    this.editProduct = this.editProduct.bind(this);

    this.onChangeCRN = this.onChangeCRN.bind(this);
    this.onChangeCRN_subj = this.onChangeCRN_subj.bind(this);
    this.onChangeCRN_num = this.onChangeCRN_num.bind(this);
    this.onChangeCRN_build = this.onChangeCRN_build.bind(this);

    this.onChangeProduct_name = this.onChangeProduct_name.bind(this);
    this.onChangeProduct_type = this.onChangeProduct_type.bind(this);
    this.onChangeProduct_price = this.onChangeProduct_price.bind(this);

    this.loadProducts()
    this.loadCRNs()
    console.log('test123')
  }

  onChangeCRN(event) {
    console.log('hi')
    this.setState({
      newCRN: event.target.value,
    })
  }
  onChangeCRN_subj(event) {
    console.log('hi1')
    this.setState({
      newSubj: event.target.value,
    })
  }
  onChangeCRN_num(event) {
    console.log('hi2')
    this.setState({
      newNum: event.target.value,
    })
  }
  onChangeCRN_build(event) {
    console.log('hi3')
    this.setState({
      newBuildId: event.target.value
    })
  }

  onChangeProduct_name(event) {
    this.setState({
      newProName: event.target.value,
    })
  }
  onChangeProduct_type(event) {
    this.setState({
      newProType: event.target.value,
    })
  }
  onChangeProduct_price(event) {
    this.setState({
      newPrice: event.target.value,
    })
  }


  deleteCRN(crn) {
    console.log(`Deleting new CRN ${crn}`)
    //CHANGED HERE
    const deleteURL = apiLink_takes + crn + '/'
    // axios.delete(deleteURL).then((response)=>{
    //     this.loadCRNS()
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        //this.loadCRNS()
      });
  }

  deleteProduct(product) {
    console.log(`Deleting new Product ${product}`)
    const deleteURL = apiLink_likes + product + '/'
    // axios.delete(deleteURL).then((response)=>{
    //     this.loadProduct()
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        //this.loadProduct()
      });
  }

  addCRN(crn, subj, num, buildId) {
    console.log(`Adding new CRN ${crn}, ${subj}, ${num}, ${buildId}`)
    const addURL = apiLink
    const takesURL = apiLink_takes
    // axios.post(addURL, {crnID:crn,
    //                     subject:subj,
    //                     number:num,
    //                     buildingID:buildId}).then((response)=>{
    //     this.loadCRNS()
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    const options = {
      crnID: crn,
      subject: subj,
      number: num,
      buildingID: buildId
    };
    fetch(addURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(options)
    })
      .then(res => res.json())
      .then(json => {
      });
      //ADDED HERE
      const options2 = {
        crnID: crn
      };
      fetch(takesURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(options2)
      })
        .then(res => res.json())
        .then(json => {
          //this.loadCRNS()
        });
        //
    this.setState({
      newCRN: '',
      newSubj: '',
      newNum: '',
      newBuildId: ''
    })
  }

  addProduct(proName, proType, price) {
    console.log(`Adding new Product ${proName}, ${proType}, ${price}`)
    const addURL = apiLink_pro;
    const likesURL = apiLink_likes;
    // axios.post(addURL, {productName:proName,
    //                     productType:proType,
    //                     price:price}).then((response)=>{
    //     this.loadProduct()
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    const options = {
      productName: proName,
      productType: proType,
      price: price
    };
    fetch(addURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(options)
    })
      .then(res => res.json())
      .then(json => {
        //this.loadProduct();
      });
      //added here
      const options2 = {
        productName: proName
      };
      fetch(likesURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(options2)
      })
        .then(res => res.json())
        .then(json => {
          //this.loadProduct();
        });
        //
    this.setState({
      newProName: '',
      newProType: '',
      newPrice: ''
    })
  }

  editCRN(crn, subj, num, buildId, old) {
    console.log(`Editing new CRN ${crn}`)
    this.deleteCRN(old);
    this.addCRN(crn, subj, num, buildId);
  }

  editProduct(product) {
    console.log(`Editing new Product ${product}`)
    const deleteURL = apiLink_pro
    // axios.delete(deleteURL).then((response)=>{
    //     this.loadProduct()
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        //this.loadProduct()
      });
  }

  loadProducts() {
    // axios.get(apiLink_pro).then((response)=>{
    //     this.setState({
    //         product_info: response.data
    //     })
    //     console.log(this.state.result);
    // }).catch((error)=>{
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });
    fetch(apiLink_likes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          product_info: json
        });
        console.log(this.product_info);
      });

  }

  loadCRNs() {
    // axios.get(apiLink).then((response)=>{
    //   console.log(response)
    //   console.log(response.data)
    //     this.setState({
    //         crn_info: response.data
    //     })
    // }).catch((error)=>{
    //     console.log('load test')
    //     console.log(error);
    //     this.setState({
    //         catchError: true
    //     });
    // });

    fetch(apiLink_takes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          crn_info: json
        });
      });

  }
  render() {
    return (
      <div className="container2">
        <br />
        <br />
        <Link to="/mainfunction" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Main Functions
                </Button>
        </Link>
        <br />
        <br />
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
                  <TableCell align="right">  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.crn_info.map((row, i) => (
                  <TableRow key={row.crnID}>
                    <TableCell align="left">
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.crnID}
                    </TableCell>
                    <TableCell align="right">
                      <EditModal data={row.crnID} editItem={this.editCRN} deleteItem={this.deleteCRN} newName={this.state.newCRN} newSubj={this.state.newSubj} newNum={this.state.newNum} newBuildId={this.state.newBuildId} handleChange={this.onChangeCRN} handleChange_subj={this.onChangeCRN_subj} handleChange_num={this.onChangeCRN_num} handleChange_build={this.onChangeCRN_build} />
                    </TableCell>
                    <TableCell align="left">
                      <Deletemodal data={row.id} deleteItem={this.deleteCRN} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <AddCRNModal addItem={this.addCRN} newName={this.state.newCRN} newSubj={this.state.newSubj} newNum={this.state.newNum} newBuildId={this.state.newBuildId} handleChange={this.onChangeCRN} handleChange_subj={this.onChangeCRN_subj} handleChange_num={this.onChangeCRN_num} handleChange_build={this.onChangeCRN_build} />
            <br />
          </TableContainer>

          <br />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">  </TableCell>
                  <TableCell align="center"> <h2> Products I Like </h2> </TableCell>
                  <TableCell align="right">  </TableCell>
                  <TableCell align="right">  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {this.state.product_info.map((row, i) => (
                  <TableRow key={row.productName}>
                    <TableCell align="left">
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.productName}
                    </TableCell>
                    <TableCell align="right">
                      <EditModalProduct data={row.productName} addItem={this.addProduct} deleteItem={this.deleteProduct} newProName={this.state.newProName} newProType={this.state.newProType} newPrice={this.state.newPrice} handleChange_proName={this.onChangeProduct_name} handleChange_proType={this.onChangeProduct_type} handleChange_proPrice={this.onChangeProduct_price} />
                    </TableCell>
                    <TableCell align="left">
                      <Deletemodal data={row.id} deleteItem={this.deleteProduct} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <AddProductModal addItem={this.addProduct} newProName={this.state.newProName} newProType={this.state.newProType} newPrice={this.state.newPrice} handleChange_proName={this.onChangeProduct_name} handleChange_proType={this.onChangeProduct_type} handleChange_proPrice={this.onChangeProduct_price} />
            <br />
          </TableContainer>
        </Paper>
      </div>
    )
  }
}

export default (Userinfo);
