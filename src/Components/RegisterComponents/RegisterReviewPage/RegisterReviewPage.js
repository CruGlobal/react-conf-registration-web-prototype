import React, { useEffect, useState } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import BackgroundImg from "../../../img/rough_diagonal.png";
import { Link } from "react-router-dom";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { selectConference, GetCurrentRegistrant } from "../../../actions";

const RegisterReviewPage = ({
  LoginState,
  history,
  selectedConference,
  currentRegistration,
  crsToken,
  match,
  getSelectedConference,
  getCurrentRegistrant,
  dataChanged
}) => {
  document.title = `${
    selectedConference.name
  } - Review Registration | Event Registration Tool`;

  const [showAnswers, changeShowAnswers] = useState(false);
  const [showCosts, changeShowCosts] = useState(false);

  //if not logged in, history.push them to / to the homepage
  useEffect(() => {
    if (crsToken && dataChanged) {
      getSelectedConference(crsToken, match.params.confID);
      getCurrentRegistrant(crsToken, match.params.confID);
    }
  }, [
    crsToken,
    dataChanged,
    getCurrentRegistrant,
    getSelectedConference,
    match.params.confID
  ]);

  const generateReview = (questions, answers) => {
    return questions.map(question => {
      const foundAnswer = answers.find(
        answer => answer.blockId === question.id
      );
      if (foundAnswer) {
        switch (question.type) {
          case "addressQuestion":
          case "nameQuestion":
            return {
              id: question.id,
              q: question.title,
              a: Object.values(foundAnswer.value),
              type: question.type
            };
          case "checkboxQuestion":
            return {
              id: question.id,
              q: question.title,
              a: Object.keys(foundAnswer.value),
              type: question.type
            };
          default:
            return {
              id: question.id,
              q: question.title,
              a: foundAnswer.value,
              type: question.type
            };
        }
      }
      return null;
    });
  };

  const reviewTable = generateReview(
    [].concat.apply(
      [],
      selectedConference.registrationPages.map(curr => {
        return curr.blocks;
      })
    ),
    currentRegistration.registrants[0].answers
  );

  const CreateCostTable = table => {
    let count = 0;
    return table.map(item => {
      count++;
      return (
        <Row key={"row-" + count}>
          <CellTitle>> Registartion</CellTitle>
          <CostCell>{"$" + item.toFixed(2)}</CostCell>
        </Row>
      );
    });
  };

  const CreateAnswerTable = table => {
    let count = 0;
    return table.map(item => {
      count += 1;

      if (item.a instanceof Object) {
        switch (item.type) {
          case "nameQuestion":
            return (
              <Row key={item.id}>
                <CellTitle>{item.q}</CellTitle>
                <NameCell>
                  {item.a.map(answer => {
                    return answer ? (
                      <p key={"a" + answer}>{answer} &nbsp;</p>
                    ) : null;
                  })}
                </NameCell>
              </Row>
            );
          case "addressQuestion":
            return (
              <Row key={item.id}>
                <CellTitle>{item.q}</CellTitle>
                <AddressCell>
                  {item.a.map(answer => {
                    return answer ? (
                      <AddressContent key={"a" + answer}>
                        {answer}
                      </AddressContent>
                    ) : null;
                  })}
                </AddressCell>
              </Row>
            );
          default:
            return (
              <Row key={item.id}>
                <CellTitle>{item.q}</CellTitle>
                <AnswerCell>{item.a}</AnswerCell>
              </Row>
            );
        }
      }
      return (
        <Row key={item ? item.id : count}>
          <CellTitle>{item ? item.q : null}</CellTitle>
          <AnswerCell>{item ? item.a : null}</AnswerCell>
        </Row>
      );
    });
  };

  return (
    <PageContainer>
      <RegisterNavbar conference={selectedConference} history={history} />
      <ReviewSection>
        <RegistrationCheckContainer>
          <RegistrationCheckTitle>
            Your registration is not complete...
          </RegistrationCheckTitle>
          <br />
          <RegistrationCheckContent>
            Almost done. Please review your registation details below and click
            Confirm if correct. That's it!
          </RegistrationCheckContent>
        </RegistrationCheckContainer>
      </ReviewSection>
      <ReviewSection>
        <TitleContainer>
          <WelcomeTitle>Registration Review</WelcomeTitle>
        </TitleContainer>
        <Table>
          <Thead>
            <RegistrantRow>
              <Chead>Registrant</Chead>
            </RegistrantRow>
            {currentRegistration
              ? currentRegistration.registrants.map(registrant => {
                  return (
                    <Row key={registrant.id}>
                      <ShowCell>
                        {showAnswers ? (
                          <FontAwesomeIcon
                            onClick={() => changeShowAnswers(false)}
                            icon={faMinusSquare}
                            size='sm'
                          />
                        ) : (
                          <FontAwesomeIcon
                            onClick={() => changeShowAnswers(true)}
                            icon={faPlusSquare}
                            size='sm'
                          />
                        )}
                      </ShowCell>
                      <Cell>
                        {registrant.firstName} {registrant.lastName}
                      </Cell>
                      <EditCell>
                        <Link
                          to={`/register/${selectedConference.id}/page/${
                            selectedConference.registrationPages[0].id
                          }/${currentRegistration.primaryRegistrantId}`}
                        >
                          <EditButton>Edit</EditButton>
                        </Link>
                      </EditCell>
                    </Row>
                  );
                })
              : null}
          </Thead>
          {showAnswers ? <Tbody>{CreateAnswerTable(reviewTable)}</Tbody> : null}
        </Table>
        <section>
          <TitleContainer>
            <WelcomeTitle>Summary</WelcomeTitle>
          </TitleContainer>
          <p>A breakdown of the costs associated with your registration.</p>
          <Table>
            <Thead>
              <RegistrantRow>
                <Chead>Registrant</Chead>
              </RegistrantRow>
              {currentRegistration
                ? currentRegistration.registrants.map(registrant => {
                    return (
                      <Row key={registrant.id}>
                        <ShowCell>
                          {showCosts ? (
                            <FontAwesomeIcon
                              onClick={() => changeShowCosts(false)}
                              icon={faMinusSquare}
                              size='sm'
                            />
                          ) : (
                            <FontAwesomeIcon
                              onClick={() => changeShowCosts(true)}
                              icon={faPlusSquare}
                              size='sm'
                            />
                          )}
                        </ShowCell>
                        <Cell>
                          {registrant.firstName} {registrant.lastName}
                        </Cell>
                      </Row>
                    );
                  })
                : null}
            </Thead>
            {showCosts ? (
              <Tbody>
                {CreateCostTable([currentRegistration.calculatedTotalDue])}
              </Tbody>
            ) : null}
          </Table>
          <ButtonContainer>
            <ConfirmButton>Confirm</ConfirmButton>
          </ButtonContainer>
        </section>
      </ReviewSection>
      <RegisterFooter />
    </PageContainer>
  );
};

const mapStateToProps = state => {
  return {
    LoginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration,
    crsToken: state.authenticationReducer.crsToken,
    dataChanged: state.conferenceReducer.dataChanged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedConference: (authToken, confID) => {
      dispatch(selectConference(authToken, confID));
    },
    getCurrentRegistrant: (authToken, confID) => {
      dispatch(GetCurrentRegistrant(authToken, confID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReviewPage);

const ReviewSection = styled.div`
  margin: 20px auto;
  background: #fff;
  width: 612px;
  padding: 15px;
`;

const RegistrationCheckContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;

const PageContainer = styled.div`
  background: url(${BackgroundImg}) #e7e8e6;
  min-width: 100%;
  min-height: 100%;
`;

const WelcomeTitle = styled.h2`
  color: #00a651;
  font-size: 28px;
  margin-top: 5px;
`;

const RegistrationCheckTitle = styled.h3`
  color: #333333;
  font-size: 24px;
  font-family: sans-serif;
  margin: 20px 0 10px;
`;

const RegistrationCheckContent = styled.p`
  font-size: 14px;
  font-family: sans-serif;
  color: #333333;
  margin: 0px 0px 10px;
`;
const TitleContainer = styled.div`
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 4px;
  margin-bottom: 22px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background: #00a651;
  width: 118px;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-color: #4cae4c;
  color: #fff;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-family: sans-serif;
  :hover {
    color: #fff;
    background-color: #449d44;
    border-color: #398439;
  }
`;

const EditButton = styled.button`
  margin-left: auto;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
  color: #333;
  border: 1px solid transparent;
  border-color: #ccc;
  background-color: #fff;
  :hover {
    background-color: #e6e5e5;
    border-color: #adadad;
  }
`;

const Table = styled.table`
  width: 582px;
  font-family: sans-serif;
  font-size: 14px;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Chead = styled.th`
  padding: 8px;
`;

const Row = styled.tr`
  display: flex;
  flex-direction: row;
`;

const RegistrantRow = styled(Row)`
  border-bottom: 2px solid #ddd;
`;

const Cell = styled.td`
  font-family: sans-serif;
  width: 100%;
  padding: 8px;
  color: #333333;
`;

const CellTitle = styled(Cell)`
  font-weight: 700;
`;

const AnswerCell = styled(Cell)`
  margin-left: auto;
  display: flex;
  font-size: 14px;
`;

const AddressCell = styled(AnswerCell)`
  display: flex;
  flex-direction: column;
`;

const AddressContent = styled.p`
  margin: 0;
`;

const NameCell = styled(AnswerCell)`
  display: flex;
  flex-direction: row;
`;

const ShowCell = styled(Cell)`
  width: 10px;
  margin-right: 10px;
`;

const EditCell = styled(Cell)`
  width: 100px;
  margin-left: auto;
`;

const CostCell = styled(Cell)``;
