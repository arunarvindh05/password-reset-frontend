import Signup from "./components/Signup";
import Login from "./components/Login";
import { ForgetPassword, OTP } from "./components/ForgetPassword";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route exact path="/OTP">
          <OTP />
        </Route>
        <Route exact path="/resetpassword/:id">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
