import React, { useEffect } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import BackgroundImg from "../../../img/rough_diagonal.png";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { selectConference, GetCurrentRegistrant } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

const RegisterReviewPage = ({
  LoginState,
  history,
  selectedConference,
  currentRegistration,
  crsToken,
  match,
  getSelectedConference,
  getCurrentRegistrant
}) => {
  //if not logged in, history.push them to / to the homepage
  useEffect(() => {
    if (crsToken) {
      getSelectedConference(crsToken, match.params.confID);
      getCurrentRegistrant(crsToken, match.params.confID);
    }
  }, [
    LoginState,
    crsToken,
    getCurrentRegistrant,
    getSelectedConference,
    history,
    match.params.confID
  ]);

  //I want to only run this when it's finished loading from the API
  const reviewTable = componentDidMount(
    selectedConference.registrationPages[0].blocks,
    currentRegistration.registrants[0].answers
  );

  const registrants = ["Cole Gibbs"];

  return (
    <PageContainer>
      <RegisterNavbar conference={selectedConference} history={history} />
      <ReviewSection>
        <TitleContainer>
          <WelcomeTitle>Registration Review</WelcomeTitle>
        </TitleContainer>
        <Table>
          <Thead>
            <Row>
              <Chead>Registrant</Chead>
            </Row>
          </Thead>
          <Tbody>
            {registrants.map(currRegistrant => {
              return currRegistrant ? (
                <>
                  <Row>
                    <Cell1>
                      <Icon icon={faPlusSquare} size='xs' />
                    </Cell1>
                    <CellR>{currRegistrant}</CellR>
                    <Cell3 />
                    <Cell4 />
                  </Row>
                  {reviewTable.map(item => {
                    return item && item.id ? (
                      <Row key={"r-" + item.id}>
                        <Cell1 />
                        <Cell2 key={"c-q-" + item.id}>{item.q}</Cell2>
                        <Cell3 key={"c-a-" + item.id}>
                          {typeof item.a === "object"
                            ? JSON.stringify(item.a)
                            : item.a}
                        </Cell3>
                        <Cell4 />
                      </Row>
                    ) : null;
                  })}
                </>
              ) : null;
            })}
          </Tbody>
        </Table>
        <TitleContainer>
          <WelcomeTitle>Summary</WelcomeTitle>
        </TitleContainer>
        <div>A breakdown of the costs associated with your registration.</div>
        <ButtonContainer>
          <ConfirmButton>Confirm</ConfirmButton>
        </ButtonContainer>
      </ReviewSection>
      <RegisterFooter />
    </PageContainer>
  );
};

const generateReview = (questions, answers) => {
  return questions.map(question => {
    const temp = answers.find(answer => answer.blockId === question.id);
    if (temp) {
      return {
        q: question.title,
        a: temp.value,
        id: temp.blockId
      };
    }
    return null;
  });
};

const mapStateToProps = state => {
  return {
    LoginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration,
    crsToken: state.authenticationReducer.crsToken
  };
};

const componentDidMount = (q, a) => {
  const reviewTable = generateReview(q, a);
  console.log(reviewTable);
  return reviewTable;
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

const Table = styled.div``;

const Thead = styled.div``;

const Tbody = styled.div``;

const Chead = styled.div`
  font-size: 14px;
  font-weight: bold;

  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 4px;
  padding-left: 10%;
  padding-right: 10%;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 14px;
  padding: 8px;
`;

const Cell1 = styled.div`
  width: 10%;
`;

const Cell2 = styled.div`
  width: 40%;
  font-weight: bold;
`;

const CellR = styled.div`
  width: 40%;
`;

const Cell3 = styled.div`
  width: 30%;
  word-wrap: break-word;
`;

const Cell4 = styled.div`
  width: 20%;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  color: #000;
`;
