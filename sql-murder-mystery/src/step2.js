import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Timer from './timer';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

class Step2 extends React.Component{
  constructor (props) {
    super(props);
    this.state = {clickGo: false, q1Correct: false, q2Correct: false, q3Correct: false, q4Correct: false, q5Correct: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleCorrectChoice = this.handleCorrectChoice.bind(this)
  }

  handleClick() {
		this.setState({clickGo: true});
	}

  handleCorrectChoice(e) {
    switch(e.target.value) {
      case 'correct1':
        this.setState({q1Correct: true})
        break;
      case 'correct2':
        this.setState({q2Correct: true})
        break;
      case 'correct3':
        this.setState({q3Correct: true})
        break;
      case 'correct4':
        this.setState({q4Correct: true})
        break; 
      case 'correct5':
        this.setState({q5Correct: true})
        break; 
      default:
        break;
    };
  }

  render(){

    const question1 = <p className="helper-text"><b>Question 1: </b>What is a honey pot?</p>;
    const questionAnswers1 = [
      <Card.Text className="answer-text"> The active screening of network and system activity for unauthorized access <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> An attack on information assets in which attack agent gains or attempts to gain entry into a network or system in order to disrupt or cause other harm <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> A series of steps or processes used by an attacker, in a logical sequence, to launch attack against a target system or network<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> A decoy system designed to lure potential attackers away from critical systems and encourage attacks against themselves<br></br><br></br></Card.Text>
    ];

    const questionHeaders1 = new Map();
		questionHeaders1['A'] = 'Incorrect';
		questionHeaders1['B'] = 'Incorrect';
		questionHeaders1['C'] = 'Incorrect';
		questionHeaders1['D'] = 'Correct';

    const questionResponses1 = new Map();
    questionResponses1['A'] = 'No :( This is intrusion detection.';
    questionResponses1['B'] = 'Nope, that\'s an intrusion!';
    questionResponses1['C'] = 'No, that sounds like an attack protocol';
    questionResponses1['D'] = 'Hmmm... that sounds kind of like this exercise...';

    const question2 = <p className="helper-text" style={{marginTop: 16}}><b>Question 2: </b>this is a test question!</p>;
    const questionAnswers2 = [
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>
    ];

    const questionHeaders2 = new Map();
		questionHeaders2['A'] = 'Incorrect';
		questionHeaders2['B'] = 'Correct';
		questionHeaders2['C'] = 'Incorrect';
		questionHeaders2['D'] = 'Incorrect';

    const questionResponses2 = new Map();
    questionResponses2['A'] = 'test';
    questionResponses2['B'] = 'test';
    questionResponses2['C'] = 'test';
    questionResponses2['D'] = 'test';

    const question3 = <p className="helper-text" style={{marginTop: 16}}><b>Question 3:</b> True or false, a honey net is a collection of honey pots connecting several honey pot systems on a subnet? </p>;
    const questionAnswers3 = [
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>
    ];

    const questionHeaders3 = new Map();
		questionHeaders3['A'] = 'Correct';
		questionHeaders3['B'] = 'Incorrect';

    const questionResponses3 = new Map();
    questionResponses3['A'] = 'test';
    questionResponses3['B'] = 'test';

    let surpriseResponse, questionSetup1 = null;
    if(this.state.clickGo) {
      surpriseResponse = <div><p style={{marginTop: 16}}>Surprise! In the spirit of Dr. Jones' quizzes, you're being timed! You'll have 3 minutes to answer 5 questions pertaining to what we've learned this semester in CSE 4471.</p> <div className="helper-text"> <Timer/> </div></div>;
      questionSetup1 =
        <Container>
          <Row className="justify-content-md-center">
            {question1}
					</Row>
          <Row className="justify-content-md-center">
          <CardGroup>
            <Card style={{ width: '18rem' }} bg="light">
            <OverlayTrigger
              trigger="click"
              key='top'
              rootClose
              placement='top'
              overlay={
                <Popover id='popover-positioned-top'>
                  <Popover.Title as="h3">{questionHeaders1['A']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses1['A']}
                  </Popover.Content>
                </Popover>
              }>
              <Button className="question-button" variant="outline-primary" size="sm"> A </Button>
            </OverlayTrigger>
              {questionAnswers1[0]}
            </Card>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='top'
                rootClose
                placement='top'
                overlay={
                  <Popover id='popover-positioned-top'>
                    <Popover.Title as="h3">{questionHeaders1['B']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses1['B']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button className="question-button" variant="outline-primary" size="sm"> B </Button>
              </OverlayTrigger>
              {questionAnswers1[1]}
            </Card>
          </CardGroup>
          </Row>
          <Row className="justify-content-md-center">
          <CardGroup>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='bottom'
                rootClose
                placement='bottom'
                overlay={
                  <Popover id='popover-positioned-bottom'>
                    <Popover.Title as="h3">{questionHeaders1['C']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses1['C']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button className="question-button" variant="outline-primary" size="sm"> C </Button>
              </OverlayTrigger>
              {questionAnswers1[2]}
            </Card>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='bottom'
                rootClose
                placement='bottom'
                overlay={
                  <Popover id='popover-positioned-top'>
                    <Popover.Title as="h3">{questionHeaders1['D']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses1['D']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button  className="question-button" variant="outline-primary" size="sm" value='correct1' onClick={this.handleCorrectChoice}> D </Button>
              </OverlayTrigger>
              {questionAnswers1[3]}
            </Card>
          </CardGroup>
          </Row>
        </Container>
    }

    let questionSetup2 = null;
    if(this.state.q1Correct) {
      questionSetup2 =
        <Container>
          <Row className="justify-content-md-center">
            {question2}
					</Row>
          <Row className="justify-content-md-center">
          <CardGroup>
            <Card style={{ width: '18rem' }} bg="light">
            <OverlayTrigger
              trigger="click"
              key='top'
              rootClose
              placement='top'
              overlay={
                <Popover id='popover-positioned-top'>
                  <Popover.Title as="h3">{questionHeaders2['A']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses2['A']}
                  </Popover.Content>
                </Popover>
              }>
              <Button className="question-button" variant="outline-primary" size="sm"> A </Button>
            </OverlayTrigger>
              {questionAnswers2[0]}
            </Card>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='top'
                rootClose
                placement='top'
                overlay={
                  <Popover id='popover-positioned-top'>
                    <Popover.Title as="h3">{questionHeaders2['B']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses2['B']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button className="question-button" variant="outline-primary" size="sm" value='correct2' onClick={this.handleCorrectChoice}> B </Button>
              </OverlayTrigger>
              {questionAnswers2[1]}
            </Card>
          </CardGroup>
          </Row>
          <Row className="justify-content-md-center">
          <CardGroup>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='bottom'
                rootClose
                placement='bottom'
                overlay={
                  <Popover id='popover-positioned-bottom'>
                    <Popover.Title as="h3">{questionHeaders2['C']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses2['C']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button className="question-button" variant="outline-primary" size="sm"> C </Button>
              </OverlayTrigger>
              {questionAnswers2[2]}
            </Card>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='bottom'
                rootClose
                placement='bottom'
                overlay={
                  <Popover id='popover-positioned-top'>
                    <Popover.Title as="h3">{questionHeaders2['D']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses2['D']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button  className="question-button" variant="outline-primary" size="sm"> D </Button>
              </OverlayTrigger>
              {questionAnswers2[3]}
            </Card>
          </CardGroup>
          </Row>
        </Container>
    } 
    
    let questionSetup3 = null;
    if(this.state.q2Correct) {
      questionSetup3 =
      <Container>
        <Row className="justify-content-md-center">
          {question3}
        </Row>
        <Row className="justify-content-md-center">
        <CardGroup>
          <Card style={{ width: '18rem' }} bg="light">
          <OverlayTrigger
            trigger="click"
            key='top'
            rootClose
            placement='top'
            overlay={
              <Popover id='popover-positioned-top'>
                <Popover.Title as="h3">{questionHeaders3['A']}</Popover.Title>
                <Popover.Content>
                  {questionResponses3['A']}
                </Popover.Content>
              </Popover>
            }>
            <Button className="question-button" variant="outline-primary" size="sm" value='correct3' onClick={this.handleCorrectChoice}> True </Button>
          </OverlayTrigger>
            {questionAnswers3[0]}
          </Card>
          <Card style={{ width: '18rem' }} bg="light">
            <OverlayTrigger
              trigger="click"
              key='top'
              rootClose
              placement='top'
              overlay={
                <Popover id='popover-positioned-top'>
                  <Popover.Title as="h3">{questionHeaders3['B']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses3['B']}
                  </Popover.Content>
                </Popover>
              }>
              <Button className="question-button" variant="outline-primary" size="sm"> False </Button>
            </OverlayTrigger>
            {questionAnswers3[1]}
          </Card>
        </CardGroup>
        </Row>
      </Container>
    }

    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Step Two: You're in!</h2>
        <p>Congratulations, you're in! Now that you've bypassed Tony's user authentication system it's time to answer a few questions. <b>Click GO to begin answering questions.</b></p>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <div align="center">
              <Button variant="primary" onClick={this.handleClick}>GO</Button>
            </div>
          </Col>
        </Row>
        {surpriseResponse}
        {questionSetup1}
        {questionSetup2}
        {questionSetup3}
        <Button variant="outline-primary float-right" href="/step3">Continue</Button>
        <Button variant="outline-primary float-left" href="/step1">Back</Button>
      </Container>
      
    );
  }
}


export default Step2;