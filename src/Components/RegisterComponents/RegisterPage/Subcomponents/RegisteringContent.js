import React from "react";
import styled from "@emotion/styled";
import AddressQuestion from "../../QuestionsComponents/addressQuestion";
import CampusQuestion from "../../QuestionsComponents/campusQuestion";
import CheckboxQuestion from "../../QuestionsComponents/checkboxQuestion";
import DateQuestion from "../../QuestionsComponents/dateQuestion";
import EmailQuestion from "../../QuestionsComponents/emailQuestion";
import GenderQuestion from "../../QuestionsComponents/genderQuestion";
import NameQuestion from "../../QuestionsComponents/nameQuestion";
import PhoneQuestion from "../../QuestionsComponents/PhoneQuestion";
import RadioQuestion from "../../QuestionsComponents/radioQuestion";
import SelectQuestion from "../../QuestionsComponents/selectQuestion";
import TextAreaQuestion from "../../QuestionsComponents/textAreaQuestion";
import TextQuestion from "../../QuestionsComponents/textQuestion";
import YearQuestion from "../../QuestionsComponents/yearQuestion";

const RegisteringContent = () => {
  return (
    <div>
      <AddressQuestion />
      <CampusQuestion />
      <CheckboxQuestion />
      <DateQuestion />
      <EmailQuestion />
      <GenderQuestion />
      <NameQuestion />
      <PhoneQuestion />
      <RadioQuestion />
      <SelectQuestion />
      <TextAreaQuestion />
      <TextQuestion />
      <YearQuestion />
    </div>
  );
};

export default RegisteringContent;
