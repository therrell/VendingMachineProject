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

const apiLink = 'https://api.themoviedb.org/3/search/movie?api_key=d2291366f947bf3494364f2693d190af&language=en-US&query=';

class VMinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            crn: [],
            products: [],
            searchinfo: '',
            result: [],
            back: false,
            catchError: false
        }

        this.back = this.back.bind(this);
        this.textChange = this.textChange.bind(this);
        this.getvminfo = this.getvminfo.bind(this);
    }


    back() {

        this.setState({
            back: true
        });
    }

    // when text change, change the corresponding state
    textChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(this.state.searchinfo);
    }
    getvminfo() {
        let value = this.state.searchinfo;
        axios.get(apiLink +  value.toLowerCase()).then((response)=>{
            this.setState({
                result: response.data.results
            })
            console.log(this.state.result);
        }).catch((error)=>{
            console.log(error);
            this.setState({
                catchError: true
            });
        });

    }





    render() {
        if (this.state.back) {
            return (
                <Redirect to={{ pathname: '/mainfunction', state: { id: this.state.id } }} />
            )
        } 
        // const { classes } = this.props;
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

                        


                        

                    </form>
                </Paper>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Popularity</TableCell>
                            <TableCell align="left">release_date</TableCell>
                            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.result.map((row) => (
                            <TableRow key={row.name}>
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="left">{row.popularity}</TableCell>
                            <TableCell align="left">{row.release_date}</TableCell>
                            {/* <TableCell align="right">{row.protein}</TableCell> */}
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