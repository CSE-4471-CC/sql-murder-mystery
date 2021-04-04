import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Hint from './hint';
import LoginSQL from './loginsql';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Step4 extends React.Component {
  constructor (props) {
    super(props);
		this.state = {clickCorrectTable: false, clickCorrectQInfo: false,
			batchSqlCorrect: false, correctQQ1: false, correctQQ2: false, batchSql2Correct: false};

		this.handleClick = this.handleClick.bind(this);
		this.handleCorrectChoice = this.handleCorrectChoice.bind(this);
		this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
		this.handleBatchQuery2Success = this.handleBatchQuery2Success.bind(this);
  }

	handleClick() {
		this.setState({clickCorrectTable: true});
	}

	handleCorrectChoice(e){
		switch(e.target.value){
			case 'infoQ':
				this.setState({clickCorrectQInfo: true});
				break;
			case 'qq1':
				this.setState({correctQQ1: true});
				break;
			case 'qq2':
				this.setState({correctQQ2: true});
				break;
		};
	}

	handleBatchQuerySuccess(isSuccessful){
		this.setState({batchSqlCorrect: isSuccessful});
	}

	handleBatchQuery2Success(isSuccessful){
		this.setState({batchSql2Correct: isSuccessful});
	}


  render(){
		const userQuestion = 'What is the best way to protect an application from SQL Injection?';
		const userAnswers = [
			<Card.Text className="answer-text"> Encrypt all data stored in the database <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Limit admin access to as few users as possible <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Make a really complex schema that would be hard for an attacker to reverse engineer <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Sanitize all user input from form fields <br></br><br></br></Card.Text>
		];

		let userHeader = new Map();
		userHeader['A'] = 'Incorrect';
		userHeader['B'] = 'Incorrect';
		userHeader['C'] = 'Incorrect';
		userHeader['D'] = 'Correct';

		const userResponses = new Map();
		userResponses['A'] = 'Encrypting important data is good practice, however encryption alone doesn\'t have a direct correlation to preventing SQL Injection';
		userResponses['B'] = 'Limiting admin privileges is good practice, but if admin credentials are stored in a database not protected against SQL Injection, attackers can still exploit them.';
		userResponses['C'] = 'Having a complex schema might limit the amount of info that could be retrieved using SQL Injection, but it isn\'t the best countermeasure';
		userResponses['D'] = 'Sanitizing all user input ensures that any unexpected input either won\'t be accepted by your form, or it won\'t be executed as a SQL query, protecting your database.';

		const qq1Question = 'What is one way to test if an application is vulnerable to SQL Injection?';
		
		const qq1Answers = [
			<Card.Text className="answer-text"> Enter random expected values into the form field <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Enter a single or double quote into the form fields to see if there is an internal server error or other unexpected error message <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Open a website in multiple browsers to look for visible differences
			<br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Use a packet sniffer to examine packets coming in and out of network ports related to the application
			<br></br><br></br></Card.Text>
		];

		const qq1Header = new Map();
		qq1Header['A'] = 'Incorrect';
		qq1Header['B'] = 'Correct';
		qq1Header['C'] = 'Incorrect';
		qq1Header['D'] = 'Incorrect';	
		
		const qq1Responses = new Map();
		qq1Responses['A'] = 'Even though values are being guessed, this is really just using the website as it was intended';
		qq1Responses['B'] = 'Internal server errors or generic error messages after a single or double quote often mean that user input isn’t being sanitized properly and SQL Injection might be possible';
		qq1Responses['C'] = 'Vulnerability to SQL Injection can’t be identified just by observing the frontend design of an application';
		qq1Responses['D'] = 'This technique could be used to find out information about the database that is used, but it won’t necessarily tell you if the application itself is vulnerable to SQL Injection';
		
		const qq2Question = 'What data properties are most at risk from SQL Injection?';
		
		const qq2Answers = [
			<Card.Text className="answer-text"> Confidentiality and Integrity <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Authenticity and Utility <br></br><br></br></Card.Text>
		];

		const qq2Header = new Map();
		qq2Header['A'] = 'Correct';
		qq2Header['B'] = 'Incorrect';
		
		const qq2Responses = new Map();
		qq2Responses['A'] = 'SQL Injection exposes confidential data from an application’s databases to threat actors, and it is possible for attackers to delete or change data using injection, thus compromising data’s confidentiality and integrity.';
		qq2Responses['B'] = 'SQL Injection doesn’t necessarily change the authenticity of data, it makes authentic data accessible by attackers. The utility of data is extremely high in the hands of an attacker and remains high for the application it belongs to.';


		let userIdColumnText = null;
		let userIdQuestion = null;
		if(this.state.clickCorrectTable){
			userIdColumnText = <div>
			<p>
			As a backup, Stark Industries keeps a collection of quick access information that database 
			administrators can use in order to refresh their memory about the database without having
			to sift through the large schema. To safeguard this information, database administrators are required to
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
								{userQuestion}
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
											<Popover.Title as="h3">{userHeader['A']}</Popover.Title>
											<Popover.Content>
												{userResponses['A']}
											</Popover.Content>
										</Popover>
									}>
									<Button className="question-button" variant="outline-primary" size="sm"> A </Button>
								</OverlayTrigger>
									{userAnswers[0]}
								</Card>
								<Card style={{ width: '18rem' }} bg="light">
									<OverlayTrigger
										trigger="click"
										key='top'
										rootClose
										placement='top'
										overlay={
											<Popover id='popover-positioned-top'>
												<Popover.Title as="h3">{userHeader['B']}</Popover.Title>
												<Popover.Content>
													{userResponses['B']}
												</Popover.Content>
											</Popover>
										}>
										<Button className="question-button" variant="outline-primary" size="sm"> B </Button>
									</OverlayTrigger>
									{userAnswers[1]}
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
												<Popover.Title as="h3">{userHeader['C']}</Popover.Title>
												<Popover.Content>
													{userResponses['C']}
												</Popover.Content>
											</Popover>
										}>
										<Button className="question-button" variant="outline-primary" size="sm"> C </Button>
									</OverlayTrigger>
									{userAnswers[2]}
								</Card>
								<Card style={{ width: '18rem' }} bg="light">
									<OverlayTrigger
										trigger="click"
										key='bottom'
										rootClose
										placement='bottom'
										overlay={
											<Popover id='popover-positioned-top'>
												<Popover.Title as="h3">{userHeader['D']}</Popover.Title>
												<Popover.Content>
													{userResponses['D']}
												</Popover.Content>
											</Popover>
										}>
										<Button  className="question-button" variant="outline-primary" size="sm" value='infoQ' onClick={this.handleCorrectChoice}> D </Button>
									</OverlayTrigger>
									{userAnswers[3]}
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
					<LoginSQL game_step = 'S4_B1' batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
					</div>
			}
			let questionnaireBackground = null;
			let questionnaireQuestions = null;

			if(this.state.batchSqlCorrect){
				batchInjectFinal = <p className="helper-text">Well done! Now we know how to identify Tony's information in all of the database tables.</p>;
				questionnaireBackground = <div>
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
				</div>;
				questionnaireQuestions = <Container>
					<Container>
						<Row>
							<p>
								<b>Question</b><br></br>
								{qq1Question}
							</p>
							</Row>
							<Row >
								<Col>
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
									{qq1Answers[0]}
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
										<Button className="question-button" variant="outline-primary" size="sm" value="qq1" onClick={this.handleCorrectChoice}> B </Button>
									</OverlayTrigger>
									{qq1Answers[1]}
								</Card>
							</CardGroup>
							</Col>
							<Col>
							<div className="col-table">
								<Row className="justify-content-md-center">
									<h6 className="sub-headers">Column Names</h6>
								</Row>
								<Row className="justify-content-md-center">
									<table>
										<tr>
											<th>Column 1</th>
											<th>Column 2</th>
											<th>Column 3</th>
											<th>Column 4</th>
										</tr>
										<tr>
											<td>{this.state.correctQQ1 ? 'Favorite_food' : '?'}</td>
											<td>{this.state.correctQQ1 ? 'Favorite_hobby' : '?'}</td>
											<td>{this.state.correctQQ2 ? 'Favorite_drink' : '?'}</td>
											<td>{this.state.correctQQ2 ? 'Allergies' : '?'}</td>
										</tr>
									</table>
								</Row>
								</div>
							</Col>
						</Row>
						<Row>
							<CardGroup className = "second-row-qq">
								<Card style={{ width: '16rem' }} bg="light">
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
										<Button className="question-button" variant="outline-primary" size="sm"> C </Button>
									</OverlayTrigger>
									{qq1Answers[2]}
								</Card>
								<Card style={{ width: '16rem' }} bg="light">
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
									{qq1Answers[3]}
								</Card>
							</CardGroup>
						</Row>
						<br></br> <br></br>
						<Row>
							<div className="second-row-qq">
							<Col>
								<Row>
									<p>
										<b>Question</b><br></br>
										{qq2Question}
									</p>
								</Row>
								<Row>
									<CardGroup>
									<Card style={{ width: '16rem' }} bg="light">
										<OverlayTrigger
											trigger="click"
											key='top'
											rootClose
											placement='top'
											overlay={
												<Popover id='popover-positioned-top'>
													<Popover.Title as="h3">{qq2Header['A']}</Popover.Title>
													<Popover.Content>
														{qq2Responses['A']}
													</Popover.Content>
												</Popover>
											}>
											<Button className="question-button" variant="outline-primary" size="sm" value="qq2" onClick={this.handleCorrectChoice} > A </Button>
										</OverlayTrigger>
										{qq2Answers[0]}
									</Card>
									<Card style={{ width: '16rem' }} bg="light">
										<OverlayTrigger
											trigger="click"
											key='top'
											rootClose
											placement='top'
											overlay={
												<Popover id='popover-positioned-top'>
													<Popover.Title as="h3">{qq2Header['B']}</Popover.Title>
													<Popover.Content>
														{qq2Responses['B']}
													</Popover.Content>
												</Popover>
											}>
											<Button  className="question-button" variant="outline-primary" size="sm"> B </Button>
										</OverlayTrigger>
										{qq2Answers[1]}
									</Card>
								</CardGroup>
								</Row>
							</Col>
							</div>
						</Row>
					</Container>
				</Container>;
			}
			let batchInjectInstructions2 = null;
			let batchInjectSection2 = null;
			if(this.state.correctQQ2){
				batchInjectInstructions2 = <div className="instruction-div">
				<p className="helper-text">Great! Now you have all of the information you need to find Tony's questionnaire information. </p>
				<h6 className="sub-headers"> SQL Injection</h6>
				<p className="helper-text"><b>Use Batch SQL Injection with the column names above to retrieve Tony Stark's Questionnaire information from the QUESTIONNAIRE table.</b></p>
				</div>;
				batchInjectSection2 = <div>
				<Hint hint={"Use the same SQL techniques you used for the first Batch Injection problem, just substitute in the QUESTIONNAIRE table information."}></Hint>
				<LoginSQL game_step = 'S4_B2' batchSqlCorrect={this.handleBatchQuery2Success} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
				</div>
			}

			let batchFileOutput = null;
			let continueButton = null;
			if(this.state.batchSql2Correct){
				batchFileOutput = <div>
					<p className="helper-text"> The output of this query was also saved in a text file called "Clues.txt" in the SQL-Mystery-Game-Files folder on your Desktop for future reference.</p>
				</div>;
				continueButton = <Button variant="outline-primary float-right" href="/step5">Continue</Button>;
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
				{questionnaireBackground}
				{questionnaireQuestions}
				{batchInjectInstructions2}
				{batchInjectSection2}
				{batchFileOutput}
				<Button variant="outline-primary float-left" href="/step3" >Back</Button>
				{continueButton}
      </Container>
    );
  }
}
export default Step4;