import React, {Component} from 'react';
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
import Deletemodal from "./Deletemodal.jsx"
import "./styles/Userinfo.css"



const apiLink = 'http://127.0.0.1:8000/api/courses/';;
//Once we link the data we can import the crn[], and products[] from mainfunction
// const products_1 = ['Ruffles','Fritos Twists Honey BBQ','Peanut M&M','Monster Green','Gold Peak Sweet Tea']
// const crn_1 = ['64977','31352','57409','57419','34290'];
//
// function createData(name) {
//   return { name };
// }
// const rows = []
// for(var i = 0; i < crn_1.length; i++) {
//   rows.push(createData(crn_1[i]))
// };
// const rows2 = []
// for(var i = 0; i < products_1.length; i++) {
//   rows2.push(createData(products_1[i]))
// };

class Userinfo extends Component {
  constructor(props) {
    super(props)
      this.state = {
        crn_info : [],
        product_info : [],
        catchError: false,
        newCRN: '',
        newSubj: '',
        newNum: '',
        newBuildId: ''
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

      this.onChangeProduct = this.onChangeProduct.bind(this);

      //this.loadProducts()
      this.loadCRNs()
      console.log('test123')
  }

  onChangeCRN(event) {
    // console.log(`received input ${JSON.stringify(newName)}`)
    console.log('hi')
    this.setState({
      newCRN: event.target.value,
    })
  }
  onChangeCRN_subj(event) {
    // console.log(`received input ${JSON.stringify(newName)}`)
    console.log('hi1')
    this.setState({
      newSubj: event.target.value,
    })
  }
  onChangeCRN_num(event) {
    // console.log(`received input ${JSON.stringify(newName)}`)
    console.log('hi2')
    this.setState({
      newNum: event.target.value,
    })
  }
  onChangeCRN_build(event) {
    // console.log(`received input ${JSON.stringify(newName)}`)
    console.log('hi3')
    this.setState({
      newBuildId: event.target.value
    })
  }


  onChangeProduct(event){
    this.setState({
      newProduct: event.target.value
    })
  }

  deleteCRN(crn) {
    console.log(`123Deleting new CRN ${crn}`)
    const deleteURL = apiLink + crn + '/'
    axios.delete(deleteURL).then((response)=>{
        this.loadCRNS()
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
  }

  deleteProduct(product) {
    console.log(`Deleting new Product ${product}`)
    const deleteURL = '___SPECIAL_DELETE_URL_FROM_BACKEND___' + product
    axios.delete(deleteURL).then((response)=>{
        this.loadProduct()
        console.log(this.state.result);
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
  }

  addCRN(crn, subj, num, buildId) {
    console.log(`Adding new CRN ${crn}, ${subj}, ${num}, ${buildId}`)
    const addURL = apiLink
    axios.post(addURL, {crnID:crn,
                        subject:subj,
                        number:num,
                        buildingID:buildId}).then((response)=>{
        this.loadCRNS()
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
    this.setState({newCRN: '',
                  newSubj: '',
                  newNum: '',
                  newBuildId: ''})
  }

  addProduct(product) {
    console.log(`Adding new Product ${product}`)
    const addURL = '___SPECIAL_ADD_URL_FROM_BACKEND___' + product
    axios.post(addURL).then((response)=>{
        this.loadProduct()
        console.log(this.state.result);
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
    this.setState({newProduct: ''})
  }

  editCRN(crn) {
    console.log(`Editing new CRN ${crn}`)
    const deleteURL = apiLink
    axios.delete(deleteURL).then((response)=>{
        this.loadCRNS()
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
  }

  editProduct(product) {
    console.log(`Editing new Product ${product}`)
    const deleteURL = '___SPECIAL_EDIT_URL_FROM_BACKEND___' + product
    axios.delete(deleteURL).then((response)=>{
        this.loadProduct()
        console.log(this.state.result);
    }).catch((error)=>{
        console.log(error);
        this.setState({
            catchError: true
        });
    });
  }

  loadProducts() {
      axios.get(apiLink).then((response)=>{
          this.setState({
              product_info: response.data.results
          })
          console.log(this.state.result);
      }).catch((error)=>{
          console.log(error);
          this.setState({
              catchError: true
          });
      });
  }

  loadCRNs() {
      axios.get(apiLink).then((response)=>{
        console.log(response)
        console.log(response.data)
          this.setState({
              crn_info: response.data
          })
      }).catch((error)=>{
          console.log('load test')
          console.log(error);
          this.setState({
              catchError: true
          });
      });

  }
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
                          <TableCell align="right">  </TableCell>
                        </TableRow>
                      </TableHead>
                       <TableBody>
                         {this.state.crn_info.map((row,i) => (
                           <TableRow key={row.crnID}>
                           <TableCell align="left">
                          </TableCell>
                             <TableCell align="center" component="th" scope="row">
                             {row.crnID}
                             </TableCell>
                             <TableCell align="right">
                             <EditModal data={row.crnID} addItem={this.addCRN} editItem={this.editCRN} newName={this.state.newCRN} newSubj={this.state.newSubj} newNum={this.state.newNum} newBuildId={this.state.newBuildId} handleChange={this.onChangeCRN} handleChange_subj={this.onChangeCRN_subj} handleChange_num={this.onChangeCRN_num} handleChange_build={this.onChangeCRN_build}/>
                             </TableCell>
                            <TableCell align="left">
                            <Deletemodal data={row.crnID} deleteItem={this.deleteCRN} />
                           </TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                     <br/>
                     <AddCRNModal addItem={this.addCRN} newName={this.state.newCRN} newSubj={this.state.newSubj} newNum={this.state.newNum} newBuildId={this.state.newBuildId} handleChange={this.onChangeCRN} handleChange_subj={this.onChangeCRN_subj} handleChange_num={this.onChangeCRN_num} handleChange_build={this.onChangeCRN_build}/>
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
                              <TableCell align="right">  </TableCell>
                            </TableRow>
                          </TableHead>
                           <TableBody >
                             {this.state.product_info.map((row) => (
                               <TableRow key={row.name}>
                                 <TableCell align="left">
                                 </TableCell>
                                 <TableCell align="center" component="th" scope="row">
                                 {row.title}
                                 </TableCell>
                                 <TableCell align="right">
                                 <EditModal data={row.title} editItem={this.editProduct} addItem={this.addProduct} newName={this.state.newProduct} handleChange={this.onChangeProduct}/>
                                 </TableCell>
                                 <TableCell align="left">
                                 <Deletemodal data={row.title} deleteItem={this.deleteProduct}/>
                                </TableCell>
                               </TableRow>
                             ))}
                           </TableBody>
                         </Table>
                         <br/>
                         <AddProductModal addItem={this.addProduct} newName={this.state.newProduct} handleChange={this.onChangeProduct}/>
                         <br/>
                       </TableContainer>
                </Paper>
            </div>
        )
    }
}

export default (Userinfo);
