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

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RegisteringContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    };
  }

  componentDidMount() {
    const { conference } = this.props;
    if (conference.name) {
      document.title = `${
        conference.name
      } - Register | Event Registration Tool`;
    }
  }

  componentWillReceiveProps() {
    this.setState({
      hasLoaded: true
    });
  }

  filterCurrentRegistrant(currentData) {
    const data = currentData.registrants.filter(
      registrant => registrant.id === this.props.match.params.regID
    );

    return data;
  }

  renderAnswerBlocks = (blocks, currentData) => {
    const currentUser = this.filterCurrentRegistrant(currentData);

    const answerValue = currentUser[0].answers.filter(
      answer => answer.blockId === blocks.id
    );

    switch (blocks.type) {
      case "nameQuestion":
        return (
          <NameQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "emailQuestion":
        return (
          <EmailQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );

      case "addressQuestion":
        return (
          <AddressQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "campusQuestion":
        return (
          <CampusQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "checkboxQuestion":
        return (
          <CheckboxQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "dateQuestion":
        return (
          <DateQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "genderQuestion":
        return (
          <GenderQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "numberQuestion":
        return (
          <NumberQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "phoneQuestion":
        return (
          <PhoneQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "radioQuestion":
        return (
          <RadioQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "selectQuestion":
        return (
          <SelectQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "textareaQuestion":
        return (
          <TextAreaQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "textQuestion":
        return (
          <TextQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      case "yearInSchoolQuestion":
        return (
          <YearQuestion
            key={blocks.id}
            blockData={blocks}
            answer={answerValue[0]}
            currentUser={currentUser}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { pageData, match, currentData, history, conference } = this.props;

    return match.params.pageID === pageData.id ? (
      <div>
        <TitleContainer>
          <WelcomeTitle>{pageData.title}</WelcomeTitle>
        </TitleContainer>
        {this.state.hasLoaded ? (
          <>
            {pageData.blocks.map(answerBlock =>
              this.renderAnswerBlocks(answerBlock, currentData)
            )}
            <ButtonContainer>
              <BackButton
                history={history}
                match={match}
                conference={conference}
              />
              <ContinueButton
                match={match}
                conference={conference}
                history={history}
              />
            </ButtonContainer>
          </>
        ) : (
          <LoadingContainer>
            {" "}
            <h3>Loading...</h3>
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </LoadingContainer>
        )}
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  > h3 {
    margin-right: 10px;
  }
`;
