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


const apiLink = 'http://127.0.0.1:8000/api/users/';;

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            id: undefined,
            logged_in: localStorage.getItem('token') ? true : false,
            catchError: false
        }
        this.submit = this.submit.bind(this);
        this.textChange = this.textChange.bind(this);

    }

    componentDidMount() {
    if (this.state.logged_in) {
      // need to change apilink
      fetch('http://localhost:8000/user/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
            // may change
          this.setState({ username: json.username });
        });
    }
  }

  submit(e){
    e.preventDefault();
    const options = {
            username: this.state.username,
            password: this.state.password,
        }
    // need to change apilink
    fetch('http://localhost:8000/user/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          // may change
          username: json.username,
          id: json.id,
          redirect: true
        });
      });
  }

    // try to call the api to get users result
    // submit(e){
    //   e.preventDefault();
    //     const options = {
    //         username: this.state.username,
    //         password: this.state.password,
    //     }
    //     console.log(`Adding user ${this.state.username}, ${this.state.password}`)
    //     axios.post(apiLink, options).then((response)=>{
    //         this.setState({
    //             id: response.data.id,
    //             redirect: true
    //         })
    //     }).catch((error)=>{
    //         this.setState({
    //             catchError: true
    //         });
    //     });
    // }
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
                            name="password"
                            type="password"
                            onChange={this.textChange}
                            label="Password"
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
