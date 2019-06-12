import React, { Component } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import styled from "@emotion/styled";

class RegisterPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.confID);
  }

  render() {
    return (
      <div>
        <RegisterNavbar />
        {this.props.match.params.confID}
      </div>
    );
  }
}

export default RegisterPage;
