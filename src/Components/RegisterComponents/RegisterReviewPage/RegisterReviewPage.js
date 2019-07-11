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
import {
  selectConference,
  GetCurrentRegistrant,
  completeRegistration
} from "../../../actions";
import PaymentMenu from "./Subcomponents/PaymentMenu";
import EvtFormater from "../../../Controllers/formatercontroller";

const FORMATER = new EvtFormater();

const RegisterReviewPage = ({
  history,
  selectedConference,
  currentRegistration,
  crsToken,
  match,
  getSelectedConference,
  getCurrentRegistrant,
  dataChanged,
  CompleteRegistration
}) => {
  document.title = `${
    selectedConference.name
  } - Review Registration | Event Registration Tool`;

  const [showAnswers, changeShowAnswers] = useState(false);
  const [showCosts, changeShowCosts] = useState(false);
  const [completedRegistration, changeCompletedRegistration] = useState(
    currentRegistration
  );

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

  useEffect(() => {
    if (completedRegistration.primaryRegistrantId === "") {
      changeCompletedRegistration(currentRegistration);
    }
    if (
      completedRegistration.primaryRegistrantId !== "" &&
      !completedRegistration.completed
    ) {
      changeCompletedRegistration({
        ...completedRegistration,
        completed: true
      });
    }
  }, [completedRegistration, currentRegistration]);

  const reviewTable = generateReview(
    [].concat.apply(
      [],
      selectedConference.registrationPages.map(curr => {
        return curr.blocks;
      })
    ),
    currentRegistration.registrants[0].answers
  );

  const CreateAnswerTable = table => {
    let count = 0;
    return table.map(item => {
      count += 1;
      if (!item) {
        return null;
      }
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

  const CreateUserRow = currentRegistration => {
    return currentRegistration.registrants.map(registrant => {
      return (
        <Row key={registrant.id}>
          <ShowCell>
            {showAnswers ? (
              <FontAwesomeIcon
                onClick={() => changeShowAnswers(false)}
                icon={faMinusSquare}
                size="sm"
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => changeShowAnswers(true)}
                icon={faPlusSquare}
                size="sm"
              />
            )}
          </ShowCell>
          <Cell>
            {registrant.firstName} {registrant.lastName}
          </Cell>
          {selectedConference.registrantTypes.length > 1 ? (
            <TypeCell>
              {selectedConference.registrantTypes
                .filter(type => type.id === registrant.registrantTypeId)
                .map(chosenType => chosenType.name)}
            </TypeCell>
          ) : null}
          {!currentRegistration.completed ? (
            <EditCell>
              <Link
                to={`/register/${selectedConference.id}/page/${
                  selectedConference.registrationPages[0].id
                }/${currentRegistration.primaryRegistrantId}`}
              >
                <EditButton>Edit</EditButton>
              </Link>
            </EditCell>
          ) : null}
        </Row>
      );
    });
  };

  const CreateUserCostRow = currentRegistration => {
    return currentRegistration.registrants.map(registrant => {
      return (
        <Row key={registrant.id}>
          <ShowCell>
            {showCosts ? (
              <FontAwesomeIcon
                onClick={() => changeShowCosts(false)}
                icon={faMinusSquare}
                size="sm"
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => changeShowCosts(true)}
                icon={faPlusSquare}
                size="sm"
              />
            )}
          </ShowCell>
          <Cell>
            {registrant.firstName} {registrant.lastName}
          </Cell>

          {!showCosts ? (
            <CostCell>
              $
              {registrant.calculatedTotalDue ||
              registrant.calculatedTotalDue === 0
                ? registrant.calculatedTotalDue.toFixed(2)
                : null}
            </CostCell>
          ) : null}
        </Row>
      );
    });
  };

  return (
    <PageContainer>
      <RegisterNavbar conference={selectedConference} history={history} />
      <ReviewSection>
        {currentRegistration.completed ? (
          <RegistrationCheckContainer>
            <RegistrationCheckTitle>You are registered!</RegistrationCheckTitle>

            <RegistrationCheckContent>
              Keep this information for your records.
            </RegistrationCheckContent>
            <DetailContainer>
              <TitleContainer>
                <WelcomeTitle>{selectedConference.name}</WelcomeTitle>
              </TitleContainer>
              <DescriptionText>
                {selectedConference.description}
              </DescriptionText>

              <DetailTitle>Event Dates</DetailTitle>

              <DescriptionText>
                {FORMATER.dateFormater(
                  selectedConference.eventStartTime,
                  selectedConference.eventTimezone,
                  "MMM D, YYYY h:mma z"
                )}{" "}
                -{" "}
                {FORMATER.dateFormater(
                  selectedConference.eventEndTime,
                  selectedConference.eventTimezone,
                  "MMM D, YYYY h:mma z"
                )}
              </DescriptionText>

              {!selectedConference.locationAddress &&
              !selectedConference.locationName &&
              !selectedConference.locationCity &&
              !selectedConference.locationState &&
              !selectedConference.locationZipCode ? null : (
                <>
                  <DetailTitle>Event Location</DetailTitle>

                  <DescriptionText>
                    {selectedConference.locationName} <br />
                    {selectedConference.locationAddress} <br />
                    {selectedConference.locationCity},
                    {selectedConference.locationState}{" "}
                    {selectedConference.locationZipCode}
                  </DescriptionText>
                </>
              )}
              <DetailTitle>Contact Info</DetailTitle>
              <DescriptionText>
                {selectedConference.contactPersonName}
                <br />
                <EmailText
                  href={`mailto:${selectedConference.contactPersonEmail}`}
                >
                  {selectedConference.contactPersonEmail}
                </EmailText>
              </DescriptionText>
            </DetailContainer>
          </RegistrationCheckContainer>
        ) : (
          <RegistrationCheckContainer>
            <RegistrationCheckTitle>
              Your registration is not complete...
            </RegistrationCheckTitle>
            <br />
            <RegistrationCheckContent>
              Almost done. Please review your registation details below and
              click Confirm if correct. That's it!
            </RegistrationCheckContent>
          </RegistrationCheckContainer>
        )}
      </ReviewSection>
      <ReviewSection>
        <TitleContainer>
          <WelcomeTitle>Registration Review</WelcomeTitle>
        </TitleContainer>
        <Table>
          <Thead>
            <RegistrantRow>
              <Chead>Registrant</Chead>
              {selectedConference.registrantTypes.length > 1 ? (
                <TypeHead>Type</TypeHead>
              ) : null}
            </RegistrantRow>
            {currentRegistration ? CreateUserRow(currentRegistration) : null}
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
                <TotalHead>Total</TotalHead>
              </RegistrantRow>

              {currentRegistration
                ? CreateUserCostRow(currentRegistration)
                : null}
            </Thead>
            <Tbody>
              {showCosts ? (
                <>
                  {CreateCostTable(
                    findCosts(
                      selectedConference,
                      currentRegistration,
                      reviewTable
                    )
                  )}
                </>
              ) : null}
              <Row>
                <TotalTitle>Total: </TotalTitle>
                <TotalCell>
                  {currentRegistration.calculatedTotalDue ||
                  currentRegistration.calculatedTotalDue === 0
                    ? "$" + currentRegistration.calculatedTotalDue.toFixed(2)
                    : null}
                </TotalCell>
              </Row>
            </Tbody>
          </Table>
          {currentRegistration.calculatedTotalDue > 0 ? (
            <>
              <TitleContainer>
                <WelcomeTitle>Payment</WelcomeTitle>
              </TitleContainer>
              <PaymentMenu total={currentRegistration.calculatedTotalDue} />{" "}
            </>
          ) : null}
          {/* This is temporary, will make sure that we cannot submit a completed registration for conferences that cost money */}
          {currentRegistration.completed ? (
            <ButtonContainer>
              <PrintButton onClick={() => window.print()}>
                Print this page
              </PrintButton>
            </ButtonContainer>
          ) : currentRegistration.calculatedTotalDue === 0 ? (
            <ButtonContainer>
              <ConfirmButton
                onClick={() => {
                  CompleteRegistration(
                    localStorage.getItem("crsToken"),
                    completedRegistration.id,
                    selectedConference.id,
                    completedRegistration
                  );
                }}
              >
                Confirm
              </ConfirmButton>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <ConfirmButton>Confirm</ConfirmButton>
            </ButtonContainer>
          )}
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
    },
    CompleteRegistration: (authToken, regID, confID, current) => {
      dispatch(completeRegistration(authToken, regID, confID, current));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReviewPage);

const generateReview = (questions, answers) => {
  return questions.map(question => {
    const foundAnswer = answers.find(answer => answer.blockId === question.id);
    if (foundAnswer) {
      switch (question.type) {
        case "addressQuestion":
        case "nameQuestion":
          return {
            id: question.id,
            q: question.title,
            a: Object.values(foundAnswer.value),
            type: question.type,
            cost: foundAnswer.amount
          };
        case "checkboxQuestion":
          return {
            id: question.id,
            q: question.title,
            a: Object.keys(foundAnswer.value),
            type: question.type,
            cost: foundAnswer.amount
          };
        default:
          return {
            id: question.id,
            q: question.title,
            a: foundAnswer.value,
            type: question.type,
            cost: foundAnswer.amount
          };
      }
    }
    return null;
  });
};

const CreateCostTable = table => {
  let count = 0;
  return table.map(current => {
    count++;
    return (
      <Row key={"row-" + count}>
        <CostTitle>{"> " + current.item}</CostTitle>
        <CostCell>{"$" + current.cost.toFixed(2)}</CostCell>
      </Row>
    );
  });
};

const findCosts = (conference, registrant, review) => {
  const base = conference.registrantTypes.find(curr => {
    return curr.id === registrant.registrants[0].registrantTypeId;
  }).cost;

  const receipt = [{ item: "Registration", cost: base }];

  review.forEach(curr => {
    if (!curr) {
      return null;
    }
    if (curr.cost !== 0) {
      receipt.push({ item: curr.q, cost: curr.cost });
    }
  });

  return receipt;
};

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

const DetailContainer = styled.div`
  min-height: 20px;
  background: #fafde8;
  border-radius: 0;
  border: 0;
  padding: 19px;
  margin-bottom: 20px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
`;

const DetailTitle = styled.h2`
  font-size: 14px;
  color: #333;
  font-weight: 700;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  font-family: sans-serif;
  color: #333333;
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

const EmailText = styled.a`
  color: #337ab7;
  text-decoration: none;
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
  margin-top: 20px;
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

const PrintButton = styled.button`
  background: #3494c7;
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  border-color: #2f84cd;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  :hover {
    background-color: #337ab7;
    border-color: #2969a0;
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

const TotalHead = styled(Chead)`
  margin-right: 40px;
`;

const TypeHead = styled(Chead)`
  margin: 0 auto;
`;

const Row = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const CostTitle = styled(Cell)`
  font-weight: 700;
  padding-left: 5%;
`;

const TotalTitle = styled(Cell)`
  font-weight: 700;
  margin-left: 70%;

  border-top: 2px solid #ddd;
`;

const AnswerCell = styled(Cell)`
  margin-left: 30px;
  display: flex;
  font-size: 14px;
`;

const TotalCell = styled(AnswerCell)`
  margin-left: auto;
  display: flex;
  font-size: 14px;

  border-top: 2px solid #ddd;
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

  height: 1em;
`;

const ShowCell = styled(Cell)`
  width: 10px;
  margin-right: 10px;
`;

const EditCell = styled(Cell)`
  width: 100px;
  margin-left: auto;
`;

const CostCell = styled(Cell)`
  text-align: right;
  padding-right: 6.5%;
`;

const TypeCell = styled(Cell)`
  margin-left: 70px;
`;
