import React, { useEffect } from "react";
import { Redirect } from "react-router";
import APIController from "../../Controllers/apicontroller";
import { userLogin } from "../../actions";
import { connect } from "react-redux";

const AuthPage = ({ match, setcrsToken, setUserProfile }) => {
  const API = new APIController();

  const setTokenLocalStorage = token => {
    localStorage.setItem("crsToken", token);
  };

  useEffect(() => {
    if (match.params.id) {
      setTokenLocalStorage(match.params.id);
      setUserProfile(match.params.id);
    } else if (localStorage.getItem("crsToken")) {
      const token = localStorage.getItem("crsToken");
      setUserProfile(token);
    } else {
      setcrsToken("");
    }
  }, [API, match.params.id, setUserProfile, setcrsToken]);

  return (
    <div>
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    crsToken: state.authenticationReducer.crsToken,
    profile: state.authenticationReducer.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: accessToken => {
      dispatch(userLogin(accessToken));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
