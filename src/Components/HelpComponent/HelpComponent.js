import React from "react";
import styled from "@emotion/styled";
import Navbar from "../LandingPageComponents/Navbar/Navbar";
import Footer from "../LandingPageComponents/Footer/Footer";
import { Redirect } from "react-router";

const HelpComponent = ({ signedIn }) => {
  document.title = "Help | Event Registration Tool";

  return (
    <>
      {signedIn ? (
        <>
          <Navbar />
          <Container>
            <HelpTitle>Help</HelpTitle>
            <p>
              For questions/suggestions regarding the Event Registration Tool,
              please email{" "}
              <SupportLink href="mailto:support@eventregistrationtool.com">
                support@eventregistrationtool.com{" "}
              </SupportLink>{" "}
            </p>
          </Container>
          <Footer />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )}
    </>
  );
};

export default HelpComponent;

const HelpTitle = styled.h3`
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  width: 1170px;
  margin: 0 auto;
`;

const SupportLink = styled.a`
  color: #337ab7;
`;
