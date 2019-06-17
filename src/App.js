import React, { Component } from "react";
// import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPageComponents/LandingPage/LandingPage";
import HelpComponent from "./Components/HelpComponent/HelpComponent";
import AuthPage from "./Components/AuthComponent/AuthPage";
import Dashboard from "./Components/DashboardComponent/Dashboard";
import RegisterPage from "./Components/RegisterComponents/RegisterPage/RegisterPage";

import {
  applicationInit,
  successfulLogin,
  failedLogin,
  userLogin
} from "./actions";

import { connect } from "react-redux";

class App extends Component {
  setSignInStatus = () => {
    if (localStorage.getItem("crsToken")) {
      this.props.successfulLogin();
    } else {
      this.props.failedLogin();
    }
  };

  async componentDidMount() {
    // When the component mounts, check localstorage for a crsToken and set it our redux store
    await this.props.getCrsToken();
    // After the above function runs, set the signin status
    // this.setSignInStatus();
    // Then we will use the crsToken we set to get our users profile information
    this.props.setUserProfile(this.props.crsToken);
    if (this.props.profile.error) {
      console.log("Cool");
    }
  }

  render() {
    const { loginState } = this.props;

    return (
      // This is where we do our routing
      // Dependent on the route, we will render the required component
      <Router>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />

          <Route
            path="/help"
            render={props => <HelpComponent signedIn={loginState} {...props} />}
          />

          <Route
            path="/eventDashboard"
            render={props => <Dashboard {...props} />}
          />

          <Route
            exact
            path="/register/:confID/page/"
            render={props => <RegisterPage {...props} />}
          />

          <Route
            exact
            path="/auth/"
            render={props => <AuthPage {...props} />}
          />

          <Route path="/auth/:id" render={props => <AuthPage {...props} />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    crsToken: state.authenticationReducer.crsToken,
    loginState: state.authenticationReducer.loginState,
    profile: state.authenticationReducer.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: accessToken => {
      dispatch(userLogin(accessToken));
    },
    getCrsToken: () => {
      dispatch(applicationInit());
    },
    successfulLogin: () => {
      dispatch(successfulLogin());
    },

    failedLogin: () => {
      dispatch(failedLogin());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
