import React, { Component } from "react";
import styled from "@emotion/styled";
import BackButton from "./BackButton";
import ContinueButton from "./ContinueButton";
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
import NumberQuestion from "../../QuestionsComponents/NumberQuestion";
import _ from "lodash";

class RegisteringContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterCurrentRegistrant(currentData) {
    const data = _.filter(
      currentData.registrants,
      registrant => registrant.id === currentData.primaryRegistrantId
    );
    return data;
  }

  renderAnswerBlocks = (blocks, currentData) => {
    const currentUser = this.filterCurrentRegistrant(currentData);

    const answerValue = _.filter(
      currentUser[0].answers,
      answer => answer.blockId === blocks.id
    );
    switch (blocks.type) {
      case "nameQuestion":
        return (
          <NameQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "emailQuestion":
        return (
          <EmailQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "addressQuestion":
        return (
          <AddressQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "campusQuestion":
        return (
          <CampusQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "checkboxQuestion":
        return (
          <CheckboxQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "dateQuestion":
        return (
          <DateQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "genderQuestion":
        return (
          <GenderQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "numberQuestion":
        return (
          <NumberQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "phoneQuestion":
        return (
          <PhoneQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "radioQuestion":
        return (
          <RadioQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "selectQuestion":
        return (
          <SelectQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "textareaQuestion":
        return (
          <TextAreaQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "textQuestion":
        return (
          <TextQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      case "yearInSchoolQuestion":
        return (
          <YearQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { pageData, match, currentData, history } = this.props;

    return match.params.pageID === pageData.id ? (
      <div>
        <TitleContainer>
          <WelcomeTitle>{pageData.title}</WelcomeTitle>
        </TitleContainer>
        {_.map(pageData.blocks, answerBlock =>
          this.renderAnswerBlocks(answerBlock, currentData)
        )}

        <ButtonContainer>
          <BackButton history={history} />
          <ContinueButton
            match={match}
            currentData={currentData}
            history={history}
          />
        </ButtonContainer>
      </div>
    ) : null;
  }
}

export default RegisteringContent;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const WelcomeTitle = styled.h2`
  color: #00a651;
  font-size: 28px;
  margin-top: 5px;
`;

const TitleContainer = styled.div`
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 4px;
  margin-bottom: 22px;
`;
