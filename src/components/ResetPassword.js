import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import "./Reset.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";

import PasswordIcon from "@mui/icons-material/Password";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const resetHandler = async (e) => {
    e.preventDefault();
    reactLocalStorage.remove("id");
    reactLocalStorage.remove("userId");
    try {
      const res = await axios
        .post(`https://nodepasswordresetflow.onrender.com/api/resetpassword/${id}`, {
          password: password,
          confirmPassword: confirmPassword,
        })
        .catch((err) => {
          alert(err.response.message);
        });
      const data = res.data;
      alert(data.message);
      history.push("/login");
      return data;
    } catch (e) {}
  };

  return (
    <div>
      <Card className="card-container">
        <CardContent className="card-content">
          <form onSubmit={resetHandler} className="form-reset">
            <TextField
              type="password"
              label="Enter new password"
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
            <TextField
              type="password"
              label="Enter confirm password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              variant="filled"
            />

            <Button type="submit">change password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default ResetPassword;
