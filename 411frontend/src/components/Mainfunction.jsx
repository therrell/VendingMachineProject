import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import "./styles/mainfunction.css"


const apiLink = '';

class Mainfunction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            crn: [],
            products: [],
            redirect_user: false,
            redirect_vm: false,
            signout: false,
            catchError: false
        }

        this.signout = this.signout.bind(this);
        this.user_Redirect = this.user_Redirect.bind(this);
        this.vm_Redirect = this.vm_Redirect.bind(this);
    }


    signout() {
        localStorage.removeItem('token');
        this.setState({
            signout: true
        });
    }

    user_Redirect() {
        this.setState({
            redirect_user: true
        });
    }

    vm_Redirect() {
        this.setState({
            redirect_vm: true
        });
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



    render() {
        if (this.state.signout) {
            return (
                <Redirect to="/" />
            )
        } else if (this.state.redirect_user) {
            return (
                <Redirect to={{ pathname: '/userinfo', state: { id: this.state.id } }} />
            )
        } else if (this.state.redirect_vm) {
            return (
                <Redirect to={{ pathname: '/vminfo', state: { id: this.state.id } }} />
            )
        }
        // const { classes } = this.props;
        return (
            <div className="container">
                <Button
                    className="form"
                    onClick={this.signout}
                    variant="contained"
                    color="secondary"
                >
                    Sign Out
                </Button>
                <Typography variant="h2">
                    Vending Machine Locator
                </Typography>
                <Paper className="paper">

                    <Typography variant="h4">
                        Main Functions
                    </Typography>
                    <form className="form">

                        <Button
                            className="form"
                            fullWidth
                            onClick={this.user_Redirect}
                            variant="contained"
                            color="primary"
                        >
                            My INFO
                            </Button>

                        <br />


                        <Button
                            className="form"
                            fullWidth
                            variant="contained"
                            onClick={this.vm_Redirect}
                            color="primary"
                        >
                            Find a Vending Machine
                            </Button>

                    </form>
                </Paper>


            </div>
        )
    }
}

export default (Mainfunction);
