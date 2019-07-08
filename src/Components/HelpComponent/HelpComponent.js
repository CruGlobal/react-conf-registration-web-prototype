import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Navbar from "../LandingPageComponents/Navbar/Navbar";
import Footer from "../LandingPageComponents/Footer/Footer";

const HelpComponent = ({ signedIn, history }) => {
  useEffect(() => {
    document.title = "Help | Event Registration Tool";
  }, []);

  useEffect(() => {
    if (!signedIn) {
      history.push("/");
    }
  }, [history, signedIn]);

  return (
    <>
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
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const SupportLink = styled.a`
  color: #337ab7;
`;
