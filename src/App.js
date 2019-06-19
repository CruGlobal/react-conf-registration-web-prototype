import React, { Component } from "react";
// import styled from "@emotion/styled";
import { Route, Switch, withRouter } from "react-router-dom";
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

  reload = () => {
    const current = this.props.history.location.pathname;

    this.props.history.replace(`/reload`);
    setTimeout(() => {
      this.props.history.replace(current);
    });
  };

  componentWillMount() {
    this.reload();
  }

  async componentDidMount() {
    // When the component mounts, check localstorage for a crsToken and set it our redux store
    await this.props.getCrsToken();
    // After the above function runs, set the signin status

    // Then we will use the crsToken we set to get our users profile information
    this.props.setUserProfile(this.props.crsToken);
  }

  render() {
    const { loginState } = this.props;

    return (
      // This is where we do our routing
      // Dependent on the route, we will render the required component

      <Switch>
        <Route path="/reload" component={null} key="reload" />
        <Route exact path="/" component={props => <LandingPage {...props} />} />

        <Route
          path="/help"
          component={(props, history) => (
            <HelpComponent signedIn={loginState} {...props} {...history} />
          )}
        />

        <Route
          path="/eventDashboard"
          component={props => <Dashboard {...props} />}
        />

        <Route
          exact
          path="/register/:confID/page/"
          component={(props, history) => (
            <RegisterPage {...props} {...history} />
          )}
        />

        <Route
          path="/register/:confID/page/:pageID/:regID"
          component={(props, history) => (
            <RegisterPage {...props} {...history} />
          )}
        />

        <Route
          exact
          path="/auth/"
          component={props => <AuthPage {...props} />}
        />

        <Route path="/auth/:id" component={props => <AuthPage {...props} />} />
      </Switch>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
