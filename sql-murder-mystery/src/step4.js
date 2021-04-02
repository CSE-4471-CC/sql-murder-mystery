import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Hint from './hint';
import LoginSQL from './loginsql';
import Question from './question';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Step4 extends React.Component {
  constructor (props) {
    super(props);
		this.state = {clickCorrectTable: false, clickCorrectQInfo: false, batchSqlCorrect: false};

		this.handleClick = this.handleClick.bind(this);
		this.handleCorrectChoice = this.handleCorrectChoice.bind(this);
		this.handleQuerySuccess = this.handleQuerySuccess.bind(this);
		this.handleCorrectQInfo = this.handleCorrectQInfo.bind(this);
  }

	handleClick() {
		this.setState({clickCorrectTable: true});
	}

	handleCorrectChoice(){
		this.setState({clickCorrectQInfo: true});
	}

	handleQuerySuccess(isSuccessful){
		this.setState({batchSqlCorrect: isSuccessful});
	}

	handleCorrectQInfo(isCorrect){
		this.setState({clickCorrectQInfo: isCorrect});
	}

  render(){
		const question = 'What is the best way to protect an application from SQL Injection?';
		const answers = [
			<Card.Text className="answer-text"> Encrypt all data stored in the database <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Limit admin access to as few users as possible <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Make a really complex schema that would be hard for an attacker to reverse engineer <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Sanitize all user input from form fields <br></br><br></br></Card.Text>
		];
		let header = new Map();
		header['A'] = 'Incorrect';
		header['B'] = 'Incorrect';
		header['C'] = 'Incorrect';
		header['D'] = 'Correct';

		const responses = new Map();
		responses['A'] = 'Encrypting important data is good practice, however encryption alone doesn\'t have a direct correlation to preventing SQL Injection';
		responses['B'] = 'Limiting admin privileges is good practice, but if admin credentials are stored in a database not protected against SQL Injection, attackers can still exploit them.';
		responses['C'] = 'Having a complex schema might limit the amount of info that could be retrieved using SQL Injection, but it isn\'t the best countermeasure';
		responses['D'] = 'Sanitizing all user input ensures that any unexpected input either won\'t be accepted by your form, or it won\'t be executed as a SQL query, protecting your database.';

		let userIdColumnText = null;
		let userIdQuestion = null;
		if(this.state.clickCorrectTable){
			userIdColumnText = 
			<div>
				<p>
				As a backup, Stark Industries keeps a collection of quick access information that database 
				administrators can use in order to refresh their memory about the database without having
				to sift through the large schema. To safeguard this inforamtion, database administrators are required to
			 	prove their security knowledge to ensure that only trusted, skilled professionals have access to the info.
				<br></br><br></br> 
			</p>
			<p className="helper-text">
				<b>Answer the following security question to reveal the column names you need to query from the USER_INFO table.</b>
			</p>
			</div>;

			userIdQuestion = <Container>
			<Row className="justify-content-md-center">
							<p>
								<b>Question</b><br></br>
								{this.props.question}
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
											<Popover.Title as="h3">{header['A']}</Popover.Title>
											<Popover.Content>
												{responses['A']}
											</Popover.Content>
										</Popover>
									}>
									<Button className="question-button" variant="outline-primary" size="sm" value='A' > A </Button>
								</OverlayTrigger>
									{answers[0]}
								</Card>
								<Card style={{ width: '18rem' }} bg="light">
									<OverlayTrigger
										trigger="click"
										key='top'
										rootClose
										placement='top'
										overlay={
											<Popover id='popover-positioned-top'>
												<Popover.Title as="h3">{header['B']}</Popover.Title>
												<Popover.Content>
													{responses['B']}
												</Popover.Content>
											</Popover>
										}>
										<Button className="question-button" variant="outline-primary" size="sm" value='B'  > B </Button>
									</OverlayTrigger>
									{answers[1]}
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
												<Popover.Title as="h3">{header['C']}</Popover.Title>
												<Popover.Content>
													{responses['C']}
												</Popover.Content>
											</Popover>
										}>
										<Button className="question-button" variant="outline-primary" size="sm" value='C'> C </Button>
									</OverlayTrigger>
									{answers[2]}
								</Card>
								<Card style={{ width: '18rem' }} bg="light">
									<OverlayTrigger
										trigger="click"
										key='bottom'
										rootClose
										placement='bottom'
										overlay={
											<Popover id='popover-positioned-top'>
												<Popover.Title as="h3">{header['D']}</Popover.Title>
												<Popover.Content>
													{responses['D']}
												</Popover.Content>
											</Popover>
										}>
										<Button  className="question-button" variant="outline-primary" size="sm" value='D' onClick={this.handleCorrectChoice}> D </Button>
									</OverlayTrigger>
									{answers[3]}
								</Card>
							</CardGroup>
							</Row>
							</Container>;			
				
		}
			let batchInjectInstructions = null;
			let batchInjectSection = null;
			let batchInjectFinal = null;
			if(this.state.clickCorrectQInfo){
				batchInjectInstructions = <div className="instruction-div">
			<p className="helper-text"><b>CLUE:</b> The first and last name columns are named in snake case with only the first letter capitalized.</p>
			<h6 className="sub-headers"> SQL Injection</h6>
			<p className="helper-text"><b>Use Batch SQL Injection to retrieve Tony Stark's User_ID from the USER_INFO table.</b></p>
			</div>;
				batchInjectSection = <div>
					<Hint hint={"Batch injection is performed by completing the expected query and ending it with a semi colon, and then typing another query following it that will retrieve the information you desire from the database."}></Hint>
					<LoginSQL batchSqlCorrect={this.handleQuerySuccess} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
					</div>
			}
			let userInfoBackground = null;
			if(this.state.batchSqlCorrect){
				batchInjectFinal = <p className="helper-text">Well done! Now we know how to identify Tony's information in all of the database tables.</p>;
				userInfoBackground = <div>
					<h5>Background</h5>
					<p>
						The police report also mentioned that Pepper Pots sent out a questionnaire to all the company's employees
						to collect personal information from employees in order to tailor events to their food and activity preferences.
						Pepper kept a copy of the questionnaire responses in a text document in her company account in addition to the database copy, 
						and police suspect that the murderer hacked into her account to retrieve the personal information about Tony so they
						could plot their crime. <br></br><br></br>
					</p>
					<p className="helper-text">
						<b>Answer the following security questions to reveal the column names you need to query the QUESTIONNAIRE table for Tony's responses.</b>
					</p>
				</div>
				
			}
		

    return(
      <Container fluid="md">
				<h2 className='sub-headers'>Step Four: Security Knowledge and Targeted SQL</h2>
				<h5>Background</h5>
				<p>
					From the police report, we know that Tony died from a reaction to some unknown substance. In order to get
					more insight into Tony's life for clues that might help us, let's query some of the database tables referenced
					in the partial schema we retrieved.
				</p>
				<h5>Tony's User ID</h5>
				<p>
					Everyone in the company has a unique user ID number that is used to link all of their data back to them.
					Based on the table names, which table should we use to find Tony's ID?
				</p>
				<h6 className="sub-headers">Table Names</h6>
				<br />
				<ButtonGroup className='mb-2'>
					<OverlayTrigger
      				trigger="click"
      				key='top'
							rootClose
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">Incorrect</Popover.Title>
          				<Popover.Content> add explanation?</Popover.Content>
        				</Popover>
      				}>
							<Button variant='outline-primary'>USERS</Button>
						</OverlayTrigger>
						<OverlayTrigger
      				trigger="click"
      				key='top'
							rootClose
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">Correct!</Popover.Title>
          				<Popover.Content> add explanation?</Popover.Content>
        				</Popover>
      				}>
							<Button variant='outline-primary' onClick={this.handleClick}>USER_INFO</Button>
						</OverlayTrigger>
						<OverlayTrigger
      				trigger="click"
      				key='top'
							rootClose
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">Incorrect</Popover.Title>
          				<Popover.Content> add explanation?</Popover.Content>
        				</Popover>
      				}>
							<Button variant='outline-primary'>QUESTIONNAIRE</Button>
						</OverlayTrigger>
						<OverlayTrigger
      				trigger="click"
      				key='top'
							rootClose
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">Incorrect</Popover.Title>
          				<Popover.Content> add explanation?</Popover.Content>
        				</Popover>
      				}>
							<Button variant='outline-primary'>PURCHASE_ORDERS</Button>
						</OverlayTrigger>
						<OverlayTrigger
      				trigger="click"
      				key='top'
							rootClose
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">Incorrect</Popover.Title>
          				<Popover.Content> add explanation?</Popover.Content>
        				</Popover>
      				}>
							<Button variant='outline-primary'>BUILDING_ACCESS</Button>
						</OverlayTrigger>
				</ButtonGroup>
				<br />
				<br />
				<br />
				{userIdColumnText}
				{userIdQuestion}
				{batchInjectInstructions}
				{batchInjectSection}
				{batchInjectFinal}
				{userInfoBackground}
				
				<Button variant="outline-primary float-left" href="/step2" >Back</Button>
      </Container>
    );
  }
}
export default Step4;