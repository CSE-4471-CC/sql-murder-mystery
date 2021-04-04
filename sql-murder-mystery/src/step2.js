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
    this.state = {clickGo: false, q1Correct: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleCorrectChoice = this.handleCorrectChoice.bind(this)
  }

  handleClick() {
		this.setState({clickGo: true});
	}

  handleCorrectChoice(e) {
    switch(e.target.value) {
      case 'correct':
        this.setState({q1Correct: true})
        break;
      default:
        break;
    };
  }

  render(){

    const question1 = <p className="helper-text"><b>Question 1: </b>this is a test question!</p>;
    const questionAnswers1 = [
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">this is an example answer <br></br><br></br></Card.Text>
    ];

    const questionHeaders1 = new Map();
		questionHeaders1['A'] = 'Incorrect';
		questionHeaders1['B'] = 'Incorrect';
		questionHeaders1['C'] = 'Incorrect';
		questionHeaders1['D'] = 'Correct';

    const questionResponses1 = new Map();
    questionResponses1['A'] = 'test';
    questionResponses1['B'] = 'test';
    questionResponses1['C'] = 'test';
    questionResponses1['D'] = 'test';

    let surpriseResponse, questionSetup1 = null;
    if(this.state.clickGo) {
      surpriseResponse = <div><p style={{marginTop: 16}}>Surprise! In the spirit of Dr. Jones' quizzes, you're being timed! You'll have 3 minutes to answer 7 questions pertaining to what we've learned this semester in CSE 4471.</p> <div className="helper-text"> <Timer/> </div></div>;
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
                <Button  className="question-button" variant="outline-primary" size="sm" value='correct' onClick={this.handleCorrectChoice}> D </Button>
              </OverlayTrigger>
              {questionAnswers1[3]}
            </Card>
          </CardGroup>
          </Row>
        </Container>
    }

    let correct1 = null;
    if(this.state.q1Correct) {
      correct1 = <p><b>CORRECT!!!!</b></p>
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
        {correct1}
        <Button variant="outline-primary float-right" href="/step3">Continue</Button>
        <Button variant="outline-primary float-left" href="/step1">Back</Button>
      </Container>
      
    );
  }
}


export default Step2;