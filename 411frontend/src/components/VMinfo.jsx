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
import VMinfoModal from './VMinfoModal.jsx';
import Location from './Location.jsx'

const apiLink = 'http://127.0.0.1:8000/api/machines/';

class VMinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            crn: [],
            products: [],
            searchinfo: '',
            findResult: [],
            back: false,
            redirect_popular: false,
            catchError: false
        }

        this.back = this.back.bind(this);
        this.popular_Redirect = this.popular_Redirect.bind(this);
        this.textChange = this.textChange.bind(this);
        this.getvminfo = this.getvminfo.bind(this);
        this.sortByPopularity = this.sortByPopularity.bind(this);
    }

    componentDidMount() {

      // need to change apilink
      fetch('http://localhost:8000/user/token/refresh/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
            // may change
          this.setState({
            username: json.username,
          });
          console.log(json.username);
        });

  }


    back() {

        this.setState({
            back: true
        });
    }
    popular_Redirect() {
        this.setState({
            redirect_popular: true
        });
    }

    // when text change, change the corresponding state
    textChange(event) {

        this.setState({
            searchinfo: event.target.value
        });
        // console.log(this.state.searchinfo);
    }
    getvminfo() {
        console.log(this.state.searchinfo);
        let value = this.state.searchinfo;
        console.log('here before axios call');
        axios.get(apiLink + '?search=' + value).then((response)=>{
            console.log(response.data);
            localStorage.setItem('token', response.token);
            this.setState({
                findResult: response.data
            })
            console.log('here inside axios call');
            console.log(this.state.findResult);
        }).catch((error)=>{
            console.log(this.state.findResult);
            console.log(error);
            this.setState({
                catchError: true
            });
        });
    }
    sortByPopularity() {
      var findResult = this.state.findResult;
      var newfindResult = sortBy(findResult);
      this.setState({
          findResult: newfindResult
      })
      console.log(this.state.findResult);
      function sortBy(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++)
          for (let j = 0; j < n - i - 1; j++)
          // need to change this to popularity
              if (arr[j].vmID > arr[j + 1].vmID) {
                // swap arr[j+1] and arr[i]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }

        return arr;
      }

    }


    // testgetvminfo() {
    //     console.log(this.state.searchinfo);
    //     let value = this.state.searchinfo;
    //     console.log('here before axios call');
    //     axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{
    //         // console.log(response.data);
    //         this.setState({
    //             findResult: response.data
    //         })
    //         console.log('here inside axios call');
    //         // console.log(this.state.findResult);
    //     }).catch((error)=>{
    //         console.log(this.state.findResult);
    //         console.log(error);
    //         this.setState({
    //             catchError: true
    //         });
    //     });
    // }


    render() {
        if (this.state.back) {
            return (
                <Redirect to={{ pathname: '/mainfunction', state: { id: this.state.id } }} />
            )
        } else if (this.state.redirect_popular) {
          return (
            <Redirect to={{ pathname: '/location', state: { id: this.state.id } }} />
            )
        }

        return (
            <div className="container">
                <Button className="form" onClick={this.back} startIcon={<ArrowBackIcon />} variant="contained" color="primary">
                Main Functions
                </Button>
                <Typography variant="h2">
                    Vending Machine Locator
                </Typography>
                <Paper className="paper">
                    <Typography variant="h4">
                       Find a Vending Machine
                    </Typography>
                    <form className="form">
                    <Button
                        className="form"
                        fullWidth
                        onClick={this.popular_Redirect}
                        variant="contained"
                        color="primary"
                    >
                    All
                    </Button>
                        <TextField
                            name="searchinfo"
                            onChange={this.textChange}
                            label="Please enter keywords"
                            fullWidth
                        />

                        <br />
                        <Button
                            className="form"
                            fullWidth
                            onClick={this.getvminfo}
                            variant="contained"
                            color="primary"
                        >
                        Search
                        </Button>
                        <br />
                        <Button
                            className="form"
                            fullWidth
                            onClick={this.sortByPopularity}
                            variant="contained"
                            color="secondary"
                        >
                        Sort by Popularity
                        </Button>
                    </form>
                </Paper>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">BuildingID</TableCell>
                            <TableCell align="left">VMID</TableCell>
                            <TableCell align="left">VMLocation</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Type</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.findResult.map((row) => (
                            <TableRow key={row.vmID}>
                            <TableCell align="left">{row.buildingID}</TableCell>
                            <TableCell align="left">{row.vmID}</TableCell>
                            <TableCell align="left">{row.VMLocation}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            <TableCell align="left" ><VMinfoModal vmId={row.vmID}/></TableCell>
                            </TableRow>
                        ))}


                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }
}

export default (VMinfo);
