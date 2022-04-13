import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToHome: false,
      loading: false,
    };
    // bind
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  handleChange = (email) => (event) => {
    this.setState({ error: "" });
    this.setState({ [email]: event.target.value });
  };
  clickSubmit = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    console.log(user);
    //get the route from backend
    fetch("https:localhost:5000/api.smartsheet.com/users/{userId}/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        if (data.message) {
          this.setState({ error: data.message, loading: false });
        } else {
          //authenticate the user and redirect  to home
          this.authenticate(data, () => {
            this.setState({ redirectToHome: true });
          });
        }
      });
  };
  render() {
    const {
      email,
      password,
      // error,
      redirectToHome,
      // loading
    } = this.state;
    if (redirectToHome) {
      return (
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      );
    }
    const stylePaper = { padding: 20, margin: "40px auto", width: "350px" };
    const avatarStyle = { background: "blue" };
    const styleForm = { padding: 10 };
    const btnStyle = { padding: 10 };
    const styleTypo = { padding: 20 };
    return (
      <Grid>
        <Paper elevation={10} style={stylePaper} >
          <Grid container  justifyContent="center">
          <Grid  align="center" justifyContent="center">
            <Avatar style={avatarStyle}>P</Avatar>
            <h2>SIGN IN</h2>
          </Grid>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            onChange={this.handleChange("email")}
            value={email}
            style={styleForm}
            fullWidth
            required
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            onChange={this.handleChange("password")}
            value={password}
            name="password"
            variant="outlined"
            style={styleForm}
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember Me"
          />
          <Button
            variant="contained"
            color="primary"
            style={btnStyle}
            type="button"
            onClick={this.clickSubmit}
            fullWidth
          >
            SIGN IN
          </Button>
          <Typography align="center" style={styleTypo}>
            <Link href="#">Forgot Password</Link>
          </Typography>

            </Grid>
    
        </Paper>
      </Grid>
    );
  }
}
export default Login;
