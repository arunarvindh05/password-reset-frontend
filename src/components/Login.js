import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Login.css";
import { useHistory } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("https://nodepasswordresetflow.onrender.com/api/login", {
          email: email,
          password: password,
        })
        .catch((err) => alert(err.response.data.message));
      const data = await res.data;
      alert(data.message);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Card className="card">
        <CardContent className="card-login">
          <h3 style={{ color: "blue" }}>Login</h3>
          <form onSubmit={loginHandler} className="login">
            <TextField
              type="email"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="filled"
            />
            <TextField
              type="password"
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="filled"
            />
            <Button type="submit" endIcon={<LoginIcon />}>
              Login
            </Button>
          </form>
          <Button onClick={() => history.push("./forgetpassword")}>
            Forget Password
          </Button>
          ?
          <p>
            Not a member?{" "}
            <Button onClick={() => history.push("/")}>Create Account</Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
