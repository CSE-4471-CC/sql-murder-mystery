import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class PaddedCell extends React.Component {
  constructor (props) {
    super(props);

		this.state = {buttonClicked: false, correctQQ1: false, correctQQ2: false, correctQQ3: false};
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleCorrectChoice = this.handleCorrectChoice.bind(this);
	}
	
	handleButtonClick(){
		this.setState({buttonClicked: true});
	}


	handleCorrectChoice(e){
		switch(e.target.value){
			case 'qq1':
				this.setState({correctQQ1: true});
				break;
			case 'qq2':
				this.setState({correctQQ2: true});
				break;
			case 'qq3':
				this.setState({correctQQ3: true});
				break;
		};
	}

  render(){
		const qq1Question = 'The fake confession was downloaded onto your computer while it seemed like you were just submitting a shortcut form in the game. This action of executing a process behind the front of a “normal” looking process is what kind of attack?';
		
		const qq1Answers = [
			<Card.Text className="answer-text"> Memory Scanner <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Key Logger <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Trojan Horse <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Polymorphic Virus <br></br><br></br></Card.Text>
		];

		const qq1Header = new Map();
		qq1Header['A'] = 'Incorrect';
		qq1Header['B'] = 'Incorrect';
		qq1Header['C'] = 'Correct';
		qq1Header['D'] = 'Incorrect';	
		
		const qq1Responses = new Map();
		qq1Responses['A'] = 'A memory scanner attack takes advantage of how memory is used on the host device. Nothing related to memory happened during this attack.';
		qq1Responses['B'] = 'A key logger tracks your key strokes. While the window did collect your information, it was done via a form and not with key logging.';
		qq1Responses['C'] = 'Trojan horses use social engineering or some other masking technique to get users to download malicious software under the guise of legitimate software. In this case, you thought you were downloading a helpful text file which turned out to be a false confession.';
		qq1Responses['D'] = 'Polymorphic viruses change themselves throughout the attack in order to mask their signatures.';
		
		const qq2Question = 'The shortcut popup window was a simplified and obvious example of a technique called ________ where applications might try to lure attackers in with desirable information in order to get more information about the attacker.';
		
		const qq2Answers = [
			<Card.Text className="answer-text"> Baiting <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Trap and Trace <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Honey Netting <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Being Sneaky <br></br><br></br></Card.Text>
		];

		const qq2Header = new Map();
		qq2Header['A'] = 'Incorrect';
		qq2Header['B'] = 'Correct';
		qq2Header['C'] = 'Incorrect';
		qq2Header['D'] = 'Incorrect';	
		
		const qq3Question = 'Because the game tried to pin the murder of Tony Stark on you after you fell for the shortcut padded cell which is all kinds of illegal, this trap and trace scenario fits most closely under the category of…';
		
		const qq3Answers = [
			<Card.Text className="answer-text"> Enticement <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Entrapment <br></br><br></br></Card.Text>
		];

		const qq3Header = new Map();
		qq3Header['A'] = 'Incorrect';
		qq3Header['B'] = 'Correct';
		
		const qq3Responses = new Map();
		qq3Responses['A'] = 'Enticement involves dangling desirable pieces of information in order to attract attackers to a specific part of a system, but it\'s still considered to be on the "right" side of the law.';
		qq3Responses['B'] = 'Entrapment is an illegal practice that involves luring an attacker into a situation where they will break a law and be open to conviction.';
		
		let question1, question2, question3 = null;
		if(this.state.buttonClicked){
			question1 = <Container>
			<Row className="justify-content-md-center">
				<p  className="q-text">
					<b>Question</b><br></br>
					{qq1Question}
				</p>
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
								<Popover.Title as="h3">{qq1Header['A']}</Popover.Title>
								<Popover.Content>
									{qq1Responses['A']}
								</Popover.Content>
							</Popover>
						}>
						<Button className="question-button" variant="outline-primary" size="sm"> A </Button>
					</OverlayTrigger>
					<Card.Body className='question-text'>{qq1Answers[0]}</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
							trigger="click"
							key='top'
							rootClose
							placement='top'
							overlay={
								<Popover id='popover-positioned-top'>
									<Popover.Title as="h3">{qq1Header['B']}</Popover.Title>
									<Popover.Content>
										{qq1Responses['B']}
									</Popover.Content>
								</Popover>
							}>
							<Button className="question-button" variant="outline-primary" size="sm" > B </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq1Answers[1]}</Card.Body>
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
									<Popover.Title as="h3">{qq1Header['C']}</Popover.Title>
									<Popover.Content>
										{qq1Responses['C']}
									</Popover.Content>
								</Popover>
							}>
							<Button className="question-button" variant="outline-primary" size="sm" value="qq1" onClick={this.handleCorrectChoice}> C </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq1Answers[2]}</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
							trigger="click"
							key='bottom'
							rootClose
							placement='bottom'
							overlay={
								<Popover id='popover-positioned-bottom'>
									<Popover.Title as="h3">{qq1Header['D']}</Popover.Title>
									<Popover.Content>
										{qq1Responses['D']}
									</Popover.Content>
								</Popover>
							}>
							<Button  className="question-button" variant="outline-primary" size="sm"> D </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq1Answers[3]}</Card.Body>
					</Card>
				</CardGroup>
				</Row>
			</Container>;

			question2 = <Container>
			<Row className="justify-content-md-center">
				<p className="q-text">
					<b>Question</b><br></br>
					{qq2Question}
				</p>
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
								<Popover.Title as="h3">{qq2Header['A']}</Popover.Title>
							</Popover>
						}>
						<Button className="question-button" variant="outline-primary" size="sm"> A </Button>
					</OverlayTrigger>
					<Card.Body className='question-text'>{qq2Answers[0]}</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
							trigger="click"
							key='top'
							rootClose
							placement='top'
							overlay={
								<Popover id='popover-positioned-top'>
									<Popover.Title as="h3">{qq2Header['B']}</Popover.Title>
								</Popover>
							}>
							<Button className="question-button" variant="outline-primary" size="sm"  value="qq2" onClick={this.handleCorrectChoice}> B </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq2Answers[1]}</Card.Body>
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
									<Popover.Title as="h3">{qq2Header['C']}</Popover.Title>
								</Popover>
							}>
							<Button className="question-button" variant="outline-primary" size="sm"> C </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq2Answers[2]}</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
							trigger="click"
							key='bottom'
							rootClose
							placement='bottom'
							overlay={
								<Popover id='popover-positioned-bottom'>
									<Popover.Title as="h3">{qq2Header['D']}</Popover.Title>
								</Popover>
							}>
							<Button  className="question-button" variant="outline-primary" size="sm"> D </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq2Answers[3]}</Card.Body>
					</Card>
				</CardGroup>
				</Row>
			</Container>;

			question3 = <Container>
			<Row className="justify-content-md-center">
				<p className="q-text">
					<b>Question</b><br></br>
					{qq3Question}
				</p>
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
								<Popover.Title as="h3">{qq3Header['A']}</Popover.Title>
								<Popover.Content>
									{qq3Responses['A']}
								</Popover.Content>
							</Popover>
						}>
						<Button className="question-button" variant="outline-primary" size="sm"> A </Button>
					</OverlayTrigger>
					<Card.Body className='question-text'> {qq3Answers[0]}</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
							trigger="click"
							key='top'
							rootClose
							placement='top'
							overlay={
								<Popover id='popover-positioned-top'>
									<Popover.Title as="h3">{qq3Header['B']}</Popover.Title>
									<Popover.Content>
										{qq3Responses['B']}
									</Popover.Content>
								</Popover>
							}>
							<Button className="question-button" variant="outline-primary" size="sm"  value="qq3" onClick={this.handleCorrectChoice}> B </Button>
						</OverlayTrigger>
						<Card.Body className='question-text'>{qq3Answers[1]}</Card.Body>
					</Card>
				</CardGroup>
				</Row>
			</Container>;
		}

		let sendoffMessage, exitButton = null;
		if(this.state.correctQQ1 && this.state.correctQQ2 && this.state.correctQQ3){
			sendoffMessage = <p className="helper-text">Congratulations, you've found your way out of the padded cell! Once you find out who the real murder is, the fake confession will be removed from your computer.</p>
			exitButton = <div className="pad-cell-button"><Button variant='primary' href = '/step5'>Exit Padded Cell</Button></div>;
		}
    return(
			<Container>
				<h2 className='sub-headers'>PADDED CELL</h2>
				<h5>You've Been Framed!!</h5>
				<p>
					Oh no! You fell for a padded cell! It seems like the murderer is attempting to cover up their tracks.
					They must have hacked into the environment and placed that shortcut offer there in attempts to slow down
					anyone trying to retrace their steps through the database!<br></br><br></br>

					To make matters worse, the company was just alerted that there was a document found on your computer titled 'For Police'
					that contains a dated, full confession to Tony's murder! You've been framed! <br></br><br></br>

					Don't panic, we can fix this. It seems like the murderer left a back door that used during their testing open. All you have to do 
					is answer the following security questions! <br></br><br></br>
				</p>
				<p className="helper-text"><b>Answer the following security questions correctly in order to escape the padded cell and clear your name!</b></p>
				<div className="begin-button">
					<Button variant='primary' onClick={this.handleButtonClick}> Begin </Button>
				</div>
				<br></br><br></br>
				{question1}
				<br></br><br></br>
				{question2}
				<br></br><br></br>
				{question3}
				<br></br><br></br>
				{sendoffMessage}
				{exitButton}
				
			</Container>
    );
  }
}

export default PaddedCell;