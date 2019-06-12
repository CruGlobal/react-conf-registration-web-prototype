import React from "react";
import styled from "@emotion/styled";

const RegisterFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>
        © {currentYear} | Created with Event Registration Tool, powerred by{" "}
        <a
          href="https://www.cru.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cru
        </a>
      </p>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 582px;
  padding: 15px;
  margin: 0 auto;
  font-size: 14px;
  > p a {
    color: #337ab7;
    :hover {
      color: #23527c;
    }
  }
`;

export default RegisterFooter;
