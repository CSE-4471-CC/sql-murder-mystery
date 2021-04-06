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

// Written by Julia Workum

class Step2 extends React.Component{
  constructor (props) {
    super(props);
    this.state = {q1Correct: false, q2Correct: false, q3Correct: false, q4Correct: false, q5Correct: false, minutes: 2, seconds: 0};
    this.handleCorrectChoice = this.handleCorrectChoice.bind(this)
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

  componentDidMount() {
    this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state

        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        } 
    }, 1000)
}

componentWillUnmount() {
    clearInterval(this.myInterval)
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
    questionResponses1['C'] = 'No, that sounds like an attack protocol.';
    questionResponses1['D'] = 'Hmmm... that sounds kind of like this exercise...';

    const question2 = <p className="helper-text" style={{marginTop: 16}}><b>Question 2: </b>Which of the following best describes a padded cell?</p>;
    const questionAnswers2 = [
      <Card.Text className="answer-text"> A behavior-based IDPS that samples network activity and compares it with traffic that is known to be normal <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> A type of honey pot that has increased protection so it cannot be compromised <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> The systematic survey of all available applications (open ports) on all footprinted hosts <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> A room with padded walls <br></br><br></br></Card.Text>
    ];

    const questionHeaders2 = new Map();
		questionHeaders2['A'] = 'Incorrect';
		questionHeaders2['B'] = 'Correct';
		questionHeaders2['C'] = 'Incorrect';
		questionHeaders2['D'] = 'Incorrect';

    const questionResponses2 = new Map();
    questionResponses2['A'] = 'This is actually a statistical anomaly-based IDPS.';
    questionResponses2['B'] = 'Great job!';
    questionResponses2['C'] = 'Try again! This is fingerprinting.';
    questionResponses2['D'] = 'Not quite...';

    const question3 = <p className="helper-text" style={{marginTop: 16}}><b>Question 3:</b> True or false, a honey net is a collection of honey pots connecting several honey pot systems on a subnet? </p>;
    const questionAnswers3 = [
      <Card.Text className="answer-text">True <br></br><br></br></Card.Text>,
      <Card.Text className="answer-text">False <br></br><br></br></Card.Text>
    ];

    const questionHeaders3 = new Map();
		questionHeaders3['A'] = 'Correct';
		questionHeaders3['B'] = 'Incorrect';

    const questionResponses3 = new Map();
    questionResponses3['A'] = 'Correct!';
    questionResponses3['B'] = 'Sorry, try again!';

    const question4 = <p className="helper-text" style={{marginTop: 16}}><b>Question 4: </b>While honey pots have many advantages, according to our textbook which of the following is not one?</p>;
    const questionAnswers4 = [
      <Card.Text className="answer-text"> Attackers can be diverted to targets that they cannot damage.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> Administrators have time to decide how to respond to an attacker.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> The legal implications of using honeypots are well understood.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> Attackers’ actions can be easily and more extensively monitored with honeypots, and the records can be used to refine threat models and improve system protections.<br></br><br></br></Card.Text>
    ];

    const questionHeaders4 = new Map();
		questionHeaders4['A'] = 'Incorrect';
		questionHeaders4['B'] = 'Incorrect';
		questionHeaders4['C'] = 'Correct';
		questionHeaders4['D'] = 'Incorrect';

    const questionResponses4 = new Map();
    questionResponses4['A'] = 'Nope, this is actually one of the main benefits of using a honey pot.';
    questionResponses4['B'] = 'Not quite. This is a huge advantage of honeypots.';
    questionResponses4['C'] = 'Exactly. The legal implications of honey pots are complicated and unclear.';
    questionResponses4['D'] = 'Try again!';

    const question5 = <p className="helper-text" style={{marginTop: 16}}><b>Question 5: </b> In what way were these last 5 questions a honey pot?</p>;
    const questionAnswers5 = [
      <Card.Text className="answer-text"> We included a key characteristic of a honey pot, the countdown.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> These questions distracted and delayed you from achieving your actual goal.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> This activity was not a honey pot.<br></br><br></br></Card.Text>,
      <Card.Text className="answer-text"> We stole your identity while you completed this exercise.<br></br><br></br></Card.Text>
    ];

    const questionHeaders5 = new Map();
		questionHeaders5['A'] = 'Incorrect';
		questionHeaders5['B'] = 'Correct';
		questionHeaders5['C'] = 'Incorrect';
		questionHeaders5['D'] = 'Incorrect';

    const questionResponses5 = new Map();
    questionResponses5['A'] = 'Nope. This is not part of a honey pot.';
    questionResponses5['B'] = 'Correct! You just wasted 2 minutes of your life that you will never get back.';
    questionResponses5['C'] = 'No. Unfortunately it was a honey pot.';
    questionResponses5['D'] = 'Try again. Even if this was a characteristic of a honey pot, we this isn\'t something we did (as far as you know...)';

    const { minutes, seconds } = this.state


    let questionSetup1 = <Container>
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
        </Container>;

    let startOverButton = null;
    let timer = <h1>Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} </h1>
    if(minutes === 0 && seconds === 0 && !this.state.q5Correct) {
        this.state.q1Correct = false;
        this.state.q2Correct = false;
        this.state.q3Correct = false;
        this.state.q4Correct = false;
        this.state.q5Correct = false;
        questionSetup1 = null;
        timer = null;
        startOverButton = 
        <Container>
          <Row className="justify-content-md-center"><h1>Time's up!</h1></Row>
          <Row className="justify-content-md-center"><Button variant="danger float-right" href="/step1">Start Over</Button></Row>
        </Container>
      } else if (minutes === 0 && seconds === 0 && this.state.q5Correct) {
        timer = <Row className="justify-content-md-center"><h1>Success!</h1></Row>
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
            <Button className="question-button" variant="outline-primary" size="sm" value='correct3' onClick={this.handleCorrectChoice}> T </Button>
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
              <Button className="question-button" variant="outline-primary" size="sm"> F </Button>
            </OverlayTrigger>
            {questionAnswers3[1]}
          </Card>
        </CardGroup>
        </Row>
      </Container>
    }

    let questionSetup4 = null;
    if(this.state.q3Correct) {
      questionSetup4 =
      <Container>
        <Row className="justify-content-md-center">
          {question4}
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
                <Popover.Title as="h3">{questionHeaders4['A']}</Popover.Title>
                <Popover.Content>
                  {questionResponses4['A']}
                </Popover.Content>
              </Popover>
            }>
            <Button className="question-button" variant="outline-primary" size="sm"> A </Button>
          </OverlayTrigger>
            {questionAnswers4[0]}
          </Card>
          <Card style={{ width: '18rem' }} bg="light">
            <OverlayTrigger
              trigger="click"
              key='top'
              rootClose
              placement='top'
              overlay={
                <Popover id='popover-positioned-top'>
                  <Popover.Title as="h3">{questionHeaders4['B']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses4['B']}
                  </Popover.Content>
                </Popover>
              }>
              <Button className="question-button" variant="outline-primary" size="sm"> B </Button>
            </OverlayTrigger>
            {questionAnswers4[1]}
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
                    <Popover.Title as="h3">{questionHeaders4['C']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses4['C']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button className="question-button" variant="outline-primary" size="sm" value='correct4' onClick={this.handleCorrectChoice}> C </Button>
              </OverlayTrigger>
              {questionAnswers4[2]}
            </Card>
            <Card style={{ width: '18rem' }} bg="light">
              <OverlayTrigger
                trigger="click"
                key='bottom'
                rootClose
                placement='bottom'
                overlay={
                  <Popover id='popover-positioned-top'>
                    <Popover.Title as="h3">{questionHeaders4['D']}</Popover.Title>
                    <Popover.Content>
                      {questionResponses4['D']}
                    </Popover.Content>
                  </Popover>
                }>
                <Button  className="question-button" variant="outline-primary" size="sm"> D </Button>
              </OverlayTrigger>
              {questionAnswers4[3]}
            </Card>
          </CardGroup>
          </Row>
      </Container>
    }

    let questionSetup5 = null;
    if(this.state.q4Correct) {
      questionSetup5 = 
      <Container>
      <Row className="justify-content-md-center">
        {question5}
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
              <Popover.Title as="h3">{questionHeaders5['A']}</Popover.Title>
              <Popover.Content>
                {questionResponses5['A']}
              </Popover.Content>
            </Popover>
          }>
          <Button className="question-button" variant="outline-primary" size="sm"> A </Button>
        </OverlayTrigger>
          {questionAnswers5[0]}
        </Card>
        <Card style={{ width: '18rem' }} bg="light">
          <OverlayTrigger
            trigger="click"
            key='top'
            rootClose
            placement='top'
            overlay={
              <Popover id='popover-positioned-top'>
                <Popover.Title as="h3">{questionHeaders5['B']}</Popover.Title>
                <Popover.Content>
                  {questionResponses5['B']}
                </Popover.Content>
              </Popover>
            }>
            <Button className="question-button" variant="outline-primary" size="sm" value='correct5' onClick={this.handleCorrectChoice}> B </Button>
          </OverlayTrigger>
          {questionAnswers5[1]}
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
                  <Popover.Title as="h3">{questionHeaders5['C']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses5['C']}
                  </Popover.Content>
                </Popover>
              }>
              <Button className="question-button" variant="outline-primary" size="sm"> C </Button>
            </OverlayTrigger>
            {questionAnswers5[2]}
          </Card>
          <Card style={{ width: '18rem' }} bg="light">
            <OverlayTrigger
              trigger="click"
              key='bottom'
              rootClose
              placement='bottom'
              overlay={
                <Popover id='popover-positioned-top'>
                  <Popover.Title as="h3">{questionHeaders5['D']}</Popover.Title>
                  <Popover.Content>
                    {questionResponses5['D']}
                  </Popover.Content>
                </Popover>
              }>
              <Button  className="question-button" variant="outline-primary" size="sm"> D </Button>
            </OverlayTrigger>
            {questionAnswers5[3]}
          </Card>
        </CardGroup>
        </Row>
    </Container>
    }

    let continueButton = null;
    if(this.state.q5Correct) {
      continueButton = <Button variant="outline-primary float-right" href="/step3">Continue</Button>

    }

    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Step Two: You're in!</h2>
        <p>Congratulations, you're in! Now that you've bypassed Tony's user authentication system it's time to answer a few questions. However, in the spirit of Dr. Jones' quizzes, you're being timed!<b> You'll have 2 minutes to answer 5 questions pertaining to what we've learned this semester in CSE 4471.</b></p>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <div className="helper-text"> {timer} </div>
          </Col>
        </Row>
        {startOverButton}
        {questionSetup1}
        {questionSetup2}
        {questionSetup3}
        {questionSetup4}
        {questionSetup5}
        {continueButton}
        <Button variant="outline-primary float-left" href="/step1">Back</Button>
      </Container>
      
    );
  }
}


export default Step2;
