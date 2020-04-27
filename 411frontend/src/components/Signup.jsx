import React, {Component} from 'react';
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
import "./styles/Login.css"


const apiLink = '';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
            email:'',
            name:'',
            redirect: false,
            id: undefined,
            catchError: false
        }
        this.submit = this.submit.bind(this);
        this.textChange = this.textChange.bind(this);
        // this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        // this.handleEnter = this.handleEnter.bind(this);
    }

    // try to call the api to get users result
    submit(){
        const options = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2,
            email: this.state.email,
            name: this.state.name,
        }
        axios.post(apiLink, options).then((response)=>{
            this.setState({
                id: response.data.id,
                redirect: true
            })
        }).catch((error)=>{
            this.setState({
                catchError: true
            });
        });
    }
    // when text change, change the corresponding state
    textChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }





    render(){
        if (this.state.redirect){
            return (
                <Redirect to= {{ pathname: '/mainfunction', state: { id: this.state.id } }} />
            )
        }
        const {classes} = this.props;
        return(
            <div className="container">
                <Typography variant="h2">
                Vending Machine Locator
                </Typography>
                <Paper className="paper">

                    <Typography  variant="h4">
                        Please Sign Up
                    </Typography>
                    <form className="form">
                        <TextField
                            name="username"
                            onChange={this.textChange}
                            label="Username"
                            fullWidth

                            />
                        <TextField
                            name="password1"
                            type="password1"
                            onChange={this.textChange}
                            label="Password"
                            fullWidth

                            />
                        <TextField
                                name="password2"
                                type="password2"
                                onChange={this.textChange}
                                label="Please type the password again"
                                fullWidth

                            />
                        <TextField
                                name="name"
                                type="name"
                                onChange={this.textChange}
                                label=" Name"
                                fullWidth

                              />
                              <TextField
                                  name="email"
                                  type="email"
                                  onChange={this.textChange}
                                  label="Email"
                                  fullWidth

                                  />
                        <Link to="/mainfunction" style={{ textDecoration: 'none' }}>
                        <Button
                            className="form"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                            >
                            Sign Up an account
                        </Button>
                        </Link>

                        <Typography className="form">
                            Don't have an account yet?
                        </Typography>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button
                                className="form"
                                fullWidth
                                variant="contained"
                                color="primary"
                                >
                                Back to Login
                            </Button>
                        </Link>
                    </form>
                </Paper>


            </div>
        )
    }
}

export default (Signup);
