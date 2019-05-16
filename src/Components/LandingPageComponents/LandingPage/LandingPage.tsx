import React, { FunctionComponent } from "react";
import Navbar from "../Navbar/Navbar";
import LandingJumbotron from "../LandingJumbotron/LandingJumbotron";
import LandingEventContainer from "../LandingEventContainer/LandingEventContainer";
import Footer from "../Footer/Footer";

type Props = {
  signedIn: any;
  signout: any;
  setConferences: any;
  setIsLoading: any;
  conferences: any;
  isLoading: any;
  userProfile: any;
};

const LandingPage: FunctionComponent<Props> = ({
  signedIn,
  signout,
  setConferences,
  setIsLoading,
  conferences,
  isLoading,
  userProfile
}) => {
  return (
    <>
      <Navbar
        name={userProfile.firstName}
        signedIn={signedIn}
        signout={signout}
      />
      <LandingJumbotron
        setConferences={setConferences}
        setIsLoading={setIsLoading}
      />
      <LandingEventContainer conferences={conferences} isLoading={isLoading} />
      <Footer />
    </>
  );
};

export default LandingPage;
