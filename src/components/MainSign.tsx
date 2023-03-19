import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
import SignOTP from "../pages/SignOTP";
import SignUp from "../pages/SignUp";
import SignUpInfo from "../pages/SignUpInfo";
import Successful from "../pages/Successful";
import Example from "./Example";

const MainSign: React.FC<any> = () => {
  return (
    <>
      <IonReactRouter>
        <Switch>
          {/* <Route exact={true} path="/" render={() => this.state.isLoggedIn ? <Home /> : <SignIn />} /> */}

          <Route exact={true} path="/home" component={Home} />
          <Route exact={true} path="/signin" component={SignIn} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/signup-info" component={SignUpInfo} />
          <Route exact={true} path="/sign-otp" component={SignOTP} />
          <Route
            exact={true}
            path="/forgot-password"
            component={ForgotPassword}
          />
          <Route
            exact={true}
            path="/reset-password"
            component={ResetPassword}
          />
          <Route exact={true} path="/successful" component={Successful} />
          <Route exact={true} path="/example" component={Example} />
          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/signin" />}
            // render={() => <Redirect to="/home" />}
          />
          {/* <Route component={NotFound} /> */}
          <Route  render={() => <Redirect to="/signin" />} />
        </Switch>
      </IonReactRouter>
    </>
  );
};

export default MainSign;
