import React, { useEffect } from "react";
import { Redirect } from "react-router";
import APIController from "../../Controllers/apicontroller";
import { userLogin, setProfile } from "../../actions";
import { connect } from "react-redux";

const AuthPage = ({
  setProfile,
  match,
  setcrsToken,
  setUserProfile,
  crsToken
}) => {
  const API = new APIController();

  const setTokenLocalStorage = token => {
    localStorage.setItem("crsToken", token);
  };

  useEffect(() => {
    const getUserProfile = userToken => {
      API.getUser(`${API.BASE_URL}${API.PROFILE_SEARCH}`, userToken)
        .then(res => res.json())
        .then(response => setUserProfile(response));
    };
    if (match.params.id) {
      setTokenLocalStorage(match.params.id);
      setcrsToken(match.params.id);
      getUserProfile(match.params.id);
    } else if (localStorage.getItem("crsToken")) {
      const token = localStorage.getItem("crsToken");
      setcrsToken(token);
      getUserProfile(token);
    } else {
      setcrsToken("");
    }
  }, [API, match.params.id, setProfile, setUserProfile, setcrsToken]);

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
    setcrsToken: crsToken => {
      dispatch(userLogin(crsToken));
    },
    setUserProfile: profile => {
      dispatch(setProfile(profile));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
