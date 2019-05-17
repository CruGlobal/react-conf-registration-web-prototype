import React, { FunctionComponent, useEffect } from "react";
import { Redirect } from "react-router";
import APIController from "../../Controllers/apicontroller";

type Props = {
  setCrsToken: any;
  match: any;
  setProfile: any;
};

const AuthPage: FunctionComponent<Props> = ({
  setCrsToken,
  setProfile,
  match
}) => {
  const API = new APIController();

  const setTokenLocalStorage = (token: string) => {
    localStorage.setItem("crsToken", token);
  };

  useEffect(() => {
    const getUserProfile = (userToken: any) => {
      API.getUser(`${API.BASE_URL}${API.PROFILE_SEARCH}`, userToken)
        .then(res => res.json())
        .then(response => setProfile(response));
    };

    if (match.params.id) {
      setCrsToken(match.params.id);
      setTokenLocalStorage(match.params.id);
      getUserProfile(match.params.id);
    } else if (localStorage.getItem("crsToken")) {
      const token = localStorage.getItem("crsToken");
      setCrsToken(token);
      getUserProfile(token);
    } else {
      setCrsToken("");
    }
  }, [API, match.params.id, setCrsToken, setProfile]);

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

export default AuthPage;
