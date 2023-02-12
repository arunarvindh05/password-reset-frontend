import React, { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import "./ForgetPassword.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

export function ForgetPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();

    const res = await axios
      .post(
        "https://nodepasswordresetflow.onrender.com/api/forgetpassword",

        {
          email: email,
        }
      )
      .catch((err) => {
        alert(err.response.message);
      });

    const data = await res.data;

    reactLocalStorage.set("id", true);
    reactLocalStorage.get("id", true);
    reactLocalStorage.get("userId", true);
    reactLocalStorage.set("userId", true);
    reactLocalStorage.setObject("id", { _id: data.OTP._id });
    reactLocalStorage.setObject("userId", { _id: data._id });
    history.push("/OTP");
    return data;
  };

  return (
    <div>
      <Card className="card-forget">
        <CardContent className="card-forgetPassword">
          <form onSubmit={forgetPasswordHandler} className="forgetpassword">
            <TextField
              type="email"
              label=" enter your registered email"
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

            <Button type="submit">send Otp</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function OTP() {
  const [otp, setOtp] = useState("");

  const history = useHistory();

  const sendingRequest = async () => {
    reactLocalStorage.get("id", true);
    reactLocalStorage.get("userId", true);
    const res = await axios
      .post(
        `https://nodepasswordresetflow.onrender.com/api/otpverfication/${
          reactLocalStorage.getObject("id")._id
        }`,
        {
          otp: otp,
        }
      )
      .catch((err) => {
        alert(err.response.message);
      });

    const data = await res.data;
    alert(data.message);
    return data;
  };

  const otpHandler = async (e) => {
    e.preventDefault();
    await sendingRequest();
    history.push(`/resetpassword/${reactLocalStorage.getObject("userId")._id}`);
  };

  return (
    <div>
      <Card className="card-otp">
        <CardContent className="card-otpverify">
          <form onSubmit={otpHandler} className="form-otpverify">
            <TextField
              type="number"
              label="enter the OTP"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />

            <Button type="submit">verify otp</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
