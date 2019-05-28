import React, { Component } from "react";
// import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPageComponents/LandingPage/LandingPage";
import HelpComponent from "./Components/HelpComponent/HelpComponent";
import AuthPage from "./Components/AuthComponent/AuthPage";

import {
  applicationInit,
  successfulLogin,
  failedLogin,
  userLogin
} from "./actions";
import { connect } from "react-redux";

class App extends Component {
  checkLocalAuth = () => {
    const token = localStorage.getItem("crsToken");
    if (token) {
      this.props.getCrsToken();
    } else {
      this.props.getCrsToken();
    }
  };

  setSignInStatus = () => {
    if (localStorage.getItem("crsToken")) {
      this.props.successfulLogin();
    } else {
      this.props.failedLogin();
    }
  };

  async componentDidMount() {
    await this.checkLocalAuth();
    this.setSignInStatus();
    this.props.setUserProfile(this.props.crsToken);
  }

  render() {
    const { loginState } = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />

          <Route
            path="/help"
            render={props => <HelpComponent signedIn={loginState} {...props} />}
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
