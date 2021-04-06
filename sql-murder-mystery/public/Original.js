//Backstory.js
// Written by Julia Workum and Lia Ferguson
class Backstory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid="md">
                <h2 className='sub-headers' >Backstory</h2>
                <p>
                    Your best friend and boss of 5 years, Tony Stark, has just been found dead in the office break room right next to the coffee machine.
                    Unfortunately, the police don’t have any suspects and the case has gone cold.
                    However, you think that one of your coworkers must be responsible.
                    In order to see who's had access to the breakroom, you know you'll have to break into the secret employee database on Tony's computer.
                    Now, it’s up to you to use your SQL skills and find out who murdered Tony Stark.
        </p>
                <Row className="justify-content-md-center">
                    <Col>
                        <Button variant="outline-primary float-right" href="/rules">Next</Button>
                    </Col>
                </Row>
            </Container>

        );
    }
}
export default Backstory;

//confirmsuspect.js
//Lia Ferguson
class ConfirmSuspect extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClicked: false, isCorrect: false };
        this.handleCorrectSuspectButton = this.handleCorrectSuspectButton.bind(this);
    }

    handleCorrectSuspectButton(e) {
        this.setState({ isClicked: true });
        if (e.target.value == 'correct') {
            this.setState({ isCorrect: true });
            this.props.suspectConfirmCorrect(true);
        } else {
            this.setState({ isCorrect: false });
            this.props.suspectConfirmCorrect(false);
        }
    }

    render() {
        let buttonResponse = null;
        if (this.state.isClicked) {
            if (this.state.isCorrect) {
                buttonResponse = <div><p className='helper-text'>You're right, both Natasha and Bruce didn't check into the building until after Tony was found in the break room, so
                it is unlikely that either of them are responsible for Tony's death.
			</p></div>
            } else {
                buttonResponse = <div className='center-text'><p className='helper-text'>Are you sure? Remember, Tony accessed the building at <b>11:30am</b> and was found dead <b>before noon</b></p></div>;
            }
        }

        return (
            <Container>
                <div>
                    <h5>Re-evaluate Suspect List</h5>
                    <p className='helper-text'>Based on the results of your query, do you think that Natasha and Bruce should still be on our suspect list?</p>
                </div>

                <Row>
                    <div className='button-group-suspect'>
                        <ButtonGroup>
                            <Button variant='primary' value='incorrect' onClick={this.handleCorrectSuspectButton}>Yes</Button>
                            <Button variant='primary' value='correct' onClick={this.handleCorrectSuspectButton}>No</Button>
                        </ButtonGroup>
                    </div>
                    {buttonResponse}
                </Row>
            </Container>
        );
    }
}

export default ConfirmSuspect;

//Header.js
//Lia Ferguson and Julia Workum
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid='true'>
                <Jumbotron>
                    <h1 class="display-4 header-content">Welcome to SQL Murder Mystery!</h1>
                    <p class="lead header-content">Can you figure out who murdered Tony Stark?</p>
                </Jumbotron>
            </Container>
        );
    }
}

export default Header;

//hint.js
// Written by Lia Ferguson

class Hint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Accordion className='hint'>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Hint
                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>{this.props.hint}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Hint;

//loginsql.js
// lines 40, 48-50 written by Andrew Fecher
// all other code written by Lia Ferguson
const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class LoginSQL extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClicked: false, isQuerySuccessful: false, user_id: '', password: '', results: '', correctResults: false, errorMessage: '' };

        this.handleQuery = this.handleQuery.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserIdChange(e) {
        e.preventDefault()
        this.setState({ user_id: e.target.value });
    }

    handlePasswordChange(e) {
        e.preventDefault()
        this.setState({ password: e.target.value });
    }

    async handleQuery() {
        var response = await this.executeQuery(this.state.user_id, this.state.password);
        var isQuerySuccessful = response.isQuerySuccessful == 'true' ? true : false;
        var correctResults = response.correctResults == 'true' ? true : false;
        this.setState({ isQuerySuccessful: isQuerySuccessful });
        this.setState({ correctResults: correctResults });
        this.setState({ isClicked: true });
        this.setState({ errorMessage: response.error });
        if (isQuerySuccessful && correctResults) {
            this.props.batchSqlCorrect(true);
        } else {
            this.props.batchSqlCorrect(false);
        }
        if (this.props.processResults != null) {
            this.props.processResults(response.results);
        }
    }

    async executeQuery(user_id, pwd, isQuerySuccessful) {
        const response = await fetch(BACKEND_API_URL + "/login_query", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isQuerySuccessful: isQuerySuccessful,
                user_id: user_id,
                password: pwd,
                game_step: this.props.game_step
            })
        })
        return await response.json();
    }

    render() {
        let queryResponse, continueButton;
        if (this.state.isClicked && this.state.isQuerySuccessful && this.state.correctResults) {
            queryResponse = <div className="instruction-div">
                <p className="helper-text">
                    {this.props.congratsMessage}
                </p>
            </div>;
            continueButton = <Button variant="outline-primary float-right" href="/step2">Continue</Button>;
        } else if (this.state.isClicked && (!this.state.isQuerySuccessful || !this.state.correctResults)) {
            queryResponse = <div className="instruction-div">
                <p>
                    {this.state.errorMessage}
                </p>
            </div>;
            continueButton = null;
        }
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.user_id} type='username' placeholder="Enter User_ID here" onChange={this.handleUserIdChange}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label className='login-labels' >Password</Form.Label>
                                    <Form.Control value={this.state.password} type='password' placeholder="Enter password here" onChange={this.handlePasswordChange} ></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleQuery}>Login</Button>
                                {queryResponse}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginSQL;

//paddedcell.js
// Written by Lia Ferguson
class PaddedCell extends React.Component {
	constructor(props) {
		super(props);

		this.state = { buttonClicked: false, correctQQ1: false, correctQQ2: false, correctQQ3: false };
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleCorrectChoice = this.handleCorrectChoice.bind(this);
	}

	handleButtonClick() {
		this.setState({ buttonClicked: true });
	}


	handleCorrectChoice(e) {
		switch (e.target.value) {
			case 'qq1':
				this.setState({ correctQQ1: true });
				break;
			case 'qq2':
				this.setState({ correctQQ2: true });
				break;
			case 'qq3':
				this.setState({ correctQQ3: true });
				break;
		};
	}

	render() {
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
		if (this.state.buttonClicked) {
			question1 = <Container>
				<Row className="justify-content-md-center">
					<p className="q-text">
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
								<Button className="question-button" variant="outline-primary" size="sm"> D </Button>
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
								<Button className="question-button" variant="outline-primary" size="sm" value="qq2" onClick={this.handleCorrectChoice}> B </Button>
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
								<Button className="question-button" variant="outline-primary" size="sm"> D </Button>
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
								<Button className="question-button" variant="outline-primary" size="sm" value="qq3" onClick={this.handleCorrectChoice}> B </Button>
							</OverlayTrigger>
							<Card.Body className='question-text'>{qq3Answers[1]}</Card.Body>
						</Card>
					</CardGroup>
				</Row>
			</Container>;
		}

		let sendoffMessage, exitButton = null;
		if (this.state.correctQQ1 && this.state.correctQQ2 && this.state.correctQQ3) {
			sendoffMessage = <p className="helper-text">Congratulations, you've found your way out of the padded cell! Once you find out who the real murder is, the fake confession will be removed from your computer.</p>
			exitButton = <div className="pad-cell-button"><Button variant='primary' href='/step5'>Exit Padded Cell</Button></div>;
		}
		return (
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

//practice.js
//Written in HTML by Thomas Chmura and reactified/edited by Andrew Fecher
class Practice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: '', queryResponse: '', sql1: '', sql1Response: '', sql2: '', sql2Response: '' }

        this.handleQuery = this.handleQuery.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSQL1 = this.handleSQL1.bind(this);
        this.handleSQL1Change = this.handleSQL1Change.bind(this);
        this.handleSQL2 = this.handleSQL2.bind(this);
        this.handleSQL2Change = this.handleSQL2Change.bind(this);
    }
    handleQueryChange(e) {
        e.preventDefault()
        this.setState({ query: e.target.value });
    }
    handleQuery() {
        if (this.state.query == 'SELECT Password FROM Users WHERE name = \'John Doe\'') {
            this.setState({ queryResponse: 'This is an accurate query to get John Doe' });
        }
        else {
            this.setState({ queryResponse: 'try again' });
        }
    }
    handleSQL1() {
        if (this.state.sql1 == '" OR 1=1 --') {
            this.setState({ sql1Response: 'This is an accurate SQL Injection!' });
        }
        else {
            this.setState({ sql1Response: 'try again' });
        }
    }
    handleSQL1Change(e) {
        e.preventDefault()
        this.setState({ sql1: e.target.value });
    }
    handleSQL2() {
        if (this.state.sql2 == '"; SELECT Computer_Number FROM Computers WHERE Name = \'John Doe\' --') {
            this.setState({ sql2Response: 'This is an accurate SQL Batch Injection!' });
        }
        else {
            this.setState({ sql2Response: 'try again' });
        }
    }
    handleSQL2Change(e) {
        e.preventDefault()
        this.setState({ sql2: e.target.value });
    }
    render() {
        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Let's Practice!</h2>
                <p>SQL Injection can occur when a user is prompted for input on a piece of information, such as a User ID. Instead of putting in their ID, they would input a SQL Statement that runs through the systems database retrieves sensitive information.
              Let's run through this process with a few simple practice problems so we can get your feet wet before we embark on the real challenge! </p>
                <br />
                <p>In the form below, we're going to retrieve the password information for "John Doe". In the "Username" slot, input the following SQL Query:
                  <b>SELECT Password FROM Users WHERE name = 'John Doe'</b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>SQL Query</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>Query</Form.Label>
                                    <Form.Control value={this.state.query} type='username' placeholder="Enter query here" onChange={this.handleQueryChange}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleQuery}>Run Query</Button>
                                <p> {this.state.queryResponse} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <br />
                <p> Now lets see how we can utilize the above for SQL Injection. For example, if we want to login as the admin, we can use the fact that
                    the admin is generallyfirst entry in the user database. So all we would need to do is to get the SQL statement above to return at least the admins information <br />
                    So, we know that the login will typically use something like: SELECT User_ID FROM Users WHERE User_ID = "$userID" AND Password = "$password" <br />
                    If we were to type in: " OR 1=1 -- in the user name space, the SQL query would look like... <br />
                    SELECT User_ID FROM Users WHERE User_ID = "" OR 1=1 --" AND Password = "$password"<br />
                    Since -- is a comment and 1=1 is true, it will always return all users <br />
                    <b>Type in : " OR 1=1 -- below to sql inject into the system! </b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.sql1} type='username' placeholder="Enter SQL Injection here" onChange={this.handleSQL1Change}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleSQL1}>Login</Button>
                                <p> {this.state.sql1Response} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <p>SQL Batch Injection can be utilitzed to manipulate data outside of the confines of the table used in the login. Multiple SQL statements are joined together in order to retrieve sensitive information from the database.
                In the example below, we're going to retrieve information related to "John Doe" that exists in the same schema as the previous example, but within a different table than the login Users table.
                 </p>
                <br />
                <p>The first SQL statement below is used to access the schema, while we retrieve the necessary server information with the second statement.Copy the combined statement into the following login box below:
                          <b>"; SELECT Computer_Number FROM Computers WHERE Name = 'John Doe' --
                          </b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.sql2} type='username' placeholder="Enter SQL Batch injection here" onChange={this.handleSQL2Change}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleSQL2}>Login</Button>
                                <p> {this.state.sql2Response} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <p> <b>Good luck with the Mystery!</b></p>
                <Button variant="outline-primary float-left" href="/rules" >Back</Button>
                <Button variant="outline-primary float-right" href="/step1">Start Game!</Button>
            </Container >

        );
    }
}

export default Practice;

//ResponseTable.js
//Andrew Fecher
export default class ResponseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.props = props;
    }

    render() {
        let sqltable = null;
        if (this.props.results != '') {
            var HTMLrows = [];
            let obj = JSON.parse(this.props.results);
            var header = [];
            let ir = 0;
            Object.keys(obj).forEach(function (rowInt) {
                var rowData = obj[rowInt];
                var HTMLrow = [];
                Object.keys(rowData).forEach(function (colName) {
                    var value = rowData[colName];
                    if (ir == 0) {
                        header.push(<th>{colName}</th>)
                    }
                    HTMLrow.push(<td>{value}</td>);
                });
                HTMLrows.push(<tr>{HTMLrow}</tr>);
                ir += 1;
            });
            sqltable = <table><tr>{header}</tr>{HTMLrows}</table>;
        }
        return (
            <div align='center' className="sqltable">
                {sqltable}
            </div>
        )
    }
}

//rules.js
//Written by Julia Workum and Lia Ferguson

class Rules extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Rules</h2>
                <p>
                    This is an interactive game that will show you how SQL Injection can be used to exploit webpages in order to retrieve confidential information from their underlying database.
                    You will also test your knowledge of SQL Injection and other important security topics through quiz-style questions and interactive activities.
                    Each step of the game will require you to successfully execute SQL statements or prove your knowledge about SQL Injection to uncover clues that will help you to solve the unsolved murder of Tony Stark.
          There will be helpful hints along the way if you need help with the task at hand. <br></br> <br></br>

          As part of the game, text files may be downloaded onto your computer in order to relay important clues or information to you. They will be stored in a file called "SQL-Mystery-Game-Files" on your Desktop. <b> Good luck and happy hacking!</b>

                </p>
                <Button variant="outline-primary float-left" href="/" >Back</Button>
                <Button variant="outline-primary float-right" href="/practice" >Practice!</Button>
            </Container>

        );
    }
}
export default Rules;

//SQLInput.js
//Julia Workum
class SQLInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //   <Container fluid="md">
            <Form>
                <Form.Group controlId="query">
                    <Form.Label>Enter your SQL query below:</Form.Label>
                    <Form.Control type="sql" placeholder="..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Run
                </Button>
                <Button variant="primary" type="submit">
                    Reset
                    {/* would want the input box cleared out on click */}
                </Button>
            </Form>
            //   </Container>
        );
    }
}

export default SQLInput;

//Step1.js
// Written by Lia Ferguson and Julia Workum

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClicked: false, isQuerySuccessful: false, user_id: '', password: '' };

        this.handleQuery = this.handleQuery.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserIdChange(e) {
        e.preventDefault()
        this.setState({ user_id: e.target.value });
    }

    handlePasswordChange(e) {
        e.preventDefault()
        this.setState({ password: e.target.value });
    }

    async handleQuery() {
        var response = await this.executeQuery(this.state.user_id, this.state.password);
        var isQuerySuccessful = response.isQuerySuccessful == 'true' ? true : false
        this.setState({ isQuerySuccessful: isQuerySuccessful });
        this.setState({ isClicked: true })
    }

    async executeQuery(user_id, pwd, isQuerySuccessful) {
        const response = await fetch(BACKEND_API_URL + "/login_bypass", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isQuerySuccessful: isQuerySuccessful,
                user_id: user_id,
                password: pwd
            })
        })
        return await response.json();
    }

    render() {
        let queryResponse, continueButton;
        if (this.state.isClicked && this.state.isQuerySuccessful) {
            queryResponse = <div>
                <p> Congratulations! You successfully bypassed authentication by using SQL Injection!
                If a website's backend does not sanitize user input before using it in a SQL query,
                you are able to "hijack" the query by placing a condition that is always true into
                the query in order to bypass the intended programatic flow.
				</p>
            </div>;
            continueButton = <Button variant="outline-primary float-right" href="/step2">Continue</Button>;
        } else if (this.state.isClicked && !this.state.isQuerySuccessful) {
            queryResponse = <div>
                <p> Hmm, looks like your SQL Injection wasn't quite right. Please try again.
                Remember, use the hint if you are stumped!
				</p>
            </div>;
            continueButton = null;
        }
        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Step One: Credential SQL Injection</h2>
                <p>
                    You now have Tony's computer, which you can use to view the company database. There's only one problem: you do not know his password to access the database. You can only think of one option to get access to his computer, SQL Injection! While it is a form of hacking, you deem it worthy in order to try to find out who murdered your friend, Tony.<br></br><br></br><b>Use SQL injection to bypass the authentication system.</b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Accordion className='hint'>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Hint
                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>Think back to the practice section you just completed. Rely on you knowledge of how to write comments in SQL, and where the admin account is usually stored in a database to write a query that will bypass the login function. </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.user_id} type='username' placeholder="Enter User_ID here" onChange={this.handleUserIdChange}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label className='login-labels' >Password</Form.Label>
                                    <Form.Control value={this.state.password} type='password' placeholder="Enter password here" onChange={this.handlePasswordChange} ></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleQuery}>Login</Button>
                            </div>
                            {queryResponse}
                            {/*<div className='sql-results'>
                <ListGroup>
                  <ListGroup.Item> Results of SQL Injection</ListGroup.Item>
                  <ListGroup.Item>UserId = ...</ListGroup.Item>
                  <ListGroup.Item>Username = ...</ListGroup.Item>
                  <ListGroup.Item>Password = ...</ListGroup.Item>
                </ListGroup>
              </div>*/
                            }
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Button variant="outline-primary float-left" href="/practice">Back</Button>
                        {continueButton}
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default Step1;

//step2.js
//Julia Workum
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { q1Correct: false, q2Correct: false, q3Correct: false, q4Correct: false, q5Correct: false, minutes: 2, seconds: 0 };
        this.handleCorrectChoice = this.handleCorrectChoice.bind(this)
    }

    handleCorrectChoice(e) {
        switch (e.target.value) {
            case 'correct1':
                this.setState({ q1Correct: true })
                break;
            case 'correct2':
                this.setState({ q2Correct: true })
                break;
            case 'correct3':
                this.setState({ q3Correct: true })
                break;
            case 'correct4':
                this.setState({ q4Correct: true })
                break;
            case 'correct5':
                this.setState({ q5Correct: true })
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

    render() {
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

        const question2 = <p className="helper-text" style={{ marginTop: 16 }}><b>Question 2: </b>Which of the following best describes a padded cell?</p>;
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

        const question3 = <p className="helper-text" style={{ marginTop: 16 }}><b>Question 3:</b> True or false, a honey net is a collection of honey pots connecting several honey pot systems on a subnet? </p>;
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

        const question4 = <p className="helper-text" style={{ marginTop: 16 }}><b>Question 4: </b>While honey pots have many advantages, according to our textbook which of the following is not one?</p>;
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

        const question5 = <p className="helper-text" style={{ marginTop: 16 }}><b>Question 5: </b> In what way were these last 5 questions a honey pot?</p>;
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
                            <Button className="question-button" variant="outline-primary" size="sm" value='correct1' onClick={this.handleCorrectChoice}> D </Button>
                        </OverlayTrigger>
                        {questionAnswers1[3]}
                    </Card>
                </CardGroup>
            </Row>
        </Container>;

        let startOverButton = null;
        let timer = <h1>Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} </h1>
        if (minutes === 0 && seconds === 0 && !this.state.q5Correct) {
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
        if (this.state.q1Correct) {
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
                                    <Button className="question-button" variant="outline-primary" size="sm"> D </Button>
                                </OverlayTrigger>
                                {questionAnswers2[3]}
                            </Card>
                        </CardGroup>
                    </Row>
                </Container>
        }

        let questionSetup3 = null;
        if (this.state.q2Correct) {
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
        if (this.state.q3Correct) {
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
                                    <Button className="question-button" variant="outline-primary" size="sm"> D </Button>
                                </OverlayTrigger>
                                {questionAnswers4[3]}
                            </Card>
                        </CardGroup>
                    </Row>
                </Container>
        }

        let questionSetup5 = null;
        if (this.state.q4Correct) {
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
                                    <Button className="question-button" variant="outline-primary" size="sm"> D </Button>
                                </OverlayTrigger>
                                {questionAnswers5[3]}
                            </Card>
                        </CardGroup>
                    </Row>
                </Container>
        }

        let continueButton = null;
        if (this.state.q5Correct) {
            continueButton = <Button variant="outline-primary float-right" href="/step3">Continue</Button>
        }

        return (
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

//step3.js
//Andrew Fecher

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClicked: false, isSuccessful: false, batchSqlCorrect: false, step: 0, results: '', user_id: '', password: '' };

        this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
        this.processResults = this.processResults.bind(this);
        this.advance = this.advance.bind(this);
    }

    handleBatchQuerySuccess(isSuccessful) {
        this.setState({ batchSqlCorrect: isSuccessful });
        if (this.state.step < 1) {
            this.setState({ step: 1 });
        }
    }

    processResults(results) {
        this.setState({ results: results });
    }

    advance() {
        if (this.state.step < 2) {
            this.setState({ step: 2 });
        }
    }

    render() {
        let queryResponse = null, continueButton = null, table = null, nextButton = null;
        let loginSQL = <LoginSQL processResults={this.processResults} game_step='S3_B1' batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage="Congratulations, your SQL Injection was successful!" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>;

        if (this.state.step == 1) {
            nextButton = <Button variant="outline-primary float-center" onClick={this.advance}>Got it!</Button>;
        }
        if (this.state.step > 0) {
            queryResponse = <div>
                <p> Logins do not directly output the results of thier queries to the front end, however they can be manipulated to do so using methods such as inducing errors, manipulating the outfile, sniffing, among many others. <br />
                    Luckily many progams such as SQLMap and other will do this automatically. <br />
                    The system being utilized here will do this automatically and just return the value of the second query made.
				</p>
                {nextButton}
            </div>;
        }
        if (this.state.step > 1) {
            table = <ResponseTable results={this.state.results} />;
            continueButton = continueButton = <Button variant="outline-primary float-right" href="/step4">Continue</Button>;
        }

        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Step Three: Figure out the table names</h2>
                <p>In order to retrieve information from the database, you will need more information about the underlying database schema. <b>Use SQL injection to retrieve the names of the tables in the database.</b></p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Container>
                            <h5>Table Names</h5>
                            <h6 className='sub-headers'> SQL Injection</h6>
                            <p className="helper-text"><b>Use SQL Batch Injection to find the names of all tables in the database schema.</b></p>
                            <Hint hint={'We know the database is running SQLite, so you can use the "name" column of SQLite_master to get the list of tables.'}></Hint>
                            <Hint hint={'Make sure to only print out only the type="table" entries.'}></Hint>
                            {loginSQL}
                            {queryResponse}
                            {table}
                        </Container>
                    </Col>
                </Row>
                <Button variant="outline-primary float-left" href="/step2" >Back</Button>
                {continueButton}
            </Container>

        );
    }
}

export default Step3;

//step4.js
// Written by Lia Ferguson

class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCorrectTable: false, clickCorrectQInfo: false,
            batchSqlCorrect: false, correctQQ1: false, correctQQ2: false, batchSql2Correct: false,
            results1: '', results2: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCorrectChoice = this.handleCorrectChoice.bind(this);
        this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
        this.handleBatchQuery2Success = this.handleBatchQuery2Success.bind(this);
        this.processResults1 = this.processResults1.bind(this);
        this.processResults2 = this.processResults2.bind(this);
    }

    handleClick() {
        this.setState({ clickCorrectTable: true });
    }

    handleCorrectChoice(e) {
        switch (e.target.value) {
            case 'infoQ':
                this.setState({ clickCorrectQInfo: true });
                break;
            case 'qq1':
                this.setState({ correctQQ1: true });
                break;
            case 'qq2':
                this.setState({ correctQQ2: true });
                break;
        };
    }

    handleBatchQuerySuccess(isSuccessful) {
        this.setState({ batchSqlCorrect: isSuccessful });
    }

    handleBatchQuery2Success(isSuccessful) {
        this.setState({ batchSql2Correct: isSuccessful });
    }

    processResults1(results) {
        this.setState({ results1: results });
    }

    processResults2(results) {
        this.setState({ results2: results });
    }

    render() {
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
        if (this.state.clickCorrectTable) {
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
                                <Button className="question-button" variant="outline-primary" size="sm" value='infoQ' onClick={this.handleCorrectChoice}> D </Button>
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
        let table1 = null;
        if (this.state.clickCorrectQInfo) {
            batchInjectInstructions = <div className="instruction-div">
                <p className="helper-text"><b>CLUE:</b> The names of the columns you will need are: User_ID, First_name, Last_name</p>
                <h6 className="sub-headers"> SQL Injection</h6>
                <p className="helper-text"><b>Use Batch SQL Injection to retrieve all name and User ID records from the USER_INFO table. Make special note of Tony's ID. </b></p>
            </div>;
            batchInjectSection = <div>
                <Hint hint={"Batch injection is performed by completing the expected query and ending it with a semi colon, and then typing another query following it that will retrieve the information you desire from the database."}></Hint>
                <LoginSQL game_step='S4_B1' processResults={this.processResults1} batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
            </div>
            table1 = <ResponseTable results={this.state.results1} />;
        }
        let questionnaireBackground = null;
        let questionnaireQuestions = null;

        if (this.state.batchSqlCorrect) {
            batchInjectFinal = <div className='text-under-table'>
                <p className="helper-text">Well done! Now we know how to identify Tony's information in all of the database tables.</p>
            </div>;
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
                        <CardGroup className="second-row-qq">
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
                                    <Button className="question-button" variant="outline-primary" size="sm"> D </Button>
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
                                                <Button className="question-button" variant="outline-primary" size="sm"> B </Button>
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
        let table2 = null;
        if (this.state.correctQQ2) {
            batchInjectInstructions2 = <div className="instruction-div">
                <p className="helper-text">Great! Now you have all of the information you need to find Tony's questionnaire information. </p>
                <h6 className="sub-headers"> SQL Injection</h6>
                <p className="helper-text"><b>Use Batch SQL Injection with the column names above to retrieve Tony Stark's Questionnaire information from the QUESTIONNAIRE table.</b></p>
            </div>;
            batchInjectSection2 = <div>
                <Hint hint={"Use the same SQL techniques you used for the first Batch Injection problem, just substitute in the QUESTIONNAIRE table information."}></Hint>
                <LoginSQL game_step='S4_B2' processResults={this.processResults2} batchSqlCorrect={this.handleBatchQuery2Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
            </div>;
            table2 = <ResponseTable results={this.state.results2} />;
        }

        let batchFileOutput = null;
        let continueButton = null;
        if (this.state.batchSql2Correct) {
            batchFileOutput = <div>
                <p className="text-under-table helper-text"> The output of this query was also saved in a text file called "Clues.txt" in the SQL-Mystery-Game-Files folder on your Desktop for future reference.</p>
            </div>;
            continueButton = <Button variant="outline-primary float-right" href="/step5">Continue</Button>;
        }


        return (
            <Container fluid="md">
                <h2 className='sub-headers'>Step Four: Security Knowledge and Targeted SQL</h2>
                <h5>Background</h5>
                <p>
                    From the police report, we know that Tony died from a reaction to some unknown substance. In order to get
                    more insight into Tony's life for clues that might help us, let's query some of the database tables referenced
                    in the partial schema we retrieved.
				</p>
                <h5>Employee User ID</h5>
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
                                <Popover.Content>Trial and error when navigating a schema blind is completely normal! Please try again! </Popover.Content>
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
                                <Popover.Content>Trial and error when navigating a schema blind is completely normal! Please try again!</Popover.Content>
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
                                <Popover.Content>Trial and error when navigating a schema blind is completely normal! Please try again!</Popover.Content>
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
                                <Popover.Content>Trial and error when navigating a schema blind is completely normal! Please try again!</Popover.Content>
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
                {table1}
                {batchInjectFinal}
                {questionnaireBackground}
                {questionnaireQuestions}
                {batchInjectInstructions2}
                {batchInjectSection2}
                {table2}
                {batchFileOutput}
                <Button variant="outline-primary float-left" href="/step3" >Back</Button>
                {continueButton}
            </Container>
        );
    }
}
export default Step4;

//step6.js
//Written by Lia Ferguson
const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step6 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            batch1Correct: false, batch2Correct: false, batch3Correct: false, confirmSuspectCorrect: false,
            suspect1Correct: false, suspect2Correct: false, results1: '', results2: '', results3: ''
        };

        this.handleBatch1Success = this.handleBatch1Success.bind(this);
        this.handleBatch2Success = this.handleBatch2Success.bind(this);
        this.handleBatch3Success = this.handleBatch3Success.bind(this);
        this.handleConfirmSuspect = this.handleConfirmSuspect.bind(this);
        this.handleSuspect1Correct = this.handleSuspect1Correct.bind(this);
        this.handleSuspect2Correct = this.handleSuspect2Correct.bind(this);
        this.processResults1 = this.processResults1.bind(this);
        this.processResults2 = this.processResults2.bind(this);
        this.processResults3 = this.processResults3.bind(this);
    }

    handleBatch1Success() {
        this.setState({ batch1Correct: true });
    }

    handleBatch2Success() {
        this.setState({ batch2Correct: true });
    }

    handleBatch3Success() {
        this.setState({ batch3Correct: true });
    }

    handleConfirmSuspect(isCorrect) {
        this.setState({ confirmSuspectCorrect: isCorrect })
    }

    handleSuspect1Correct(isCorrect) {
        this.setState({ suspect1Correct: isCorrect })
    }

    handleSuspect2Correct(isCorrect) {
        this.setState({ suspect2Correct: isCorrect })
    }

    processResults1(results) {
        this.setState({ results1: results });
    }

    processResults2(results) {
        this.setState({ results2: results });
    }

    processResults3(results) {
        this.setState({ results3: results });
    }
    render() {
        let table1, injection2, confirmSuspect = null;
        if (this.state.batch1Correct) {
            table1 = <ResponseTable results={this.state.results1} />;
            injection2 = <Container>
                <h5>Check Suspect Building Access</h5>
                <p>Great! Now you have enough information to check when Natasha and Bruce entered the building. Remember, you have their User_ID's in your 'Clues.txt' file</p>
                <h6 className='sub-headers'> SQL Injection 2</h6>
                <p className='helper-text'><b>Use SQL Injection to find out what time Natasha and Bruce accessed the building on the day of Tony's death. Remember to return the User_ID column as well so you know who entered the building when!</b></p>
                <LoginSQL game_step='S6_B2' processResults={this.processResults2} batchSqlCorrect={this.handleBatch2Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
            </Container>;
        }

        let table2 = null;
        if (this.state.batch2Correct) {
            table2 = <ResponseTable results={this.state.results2} />;
            confirmSuspect = <ConfirmSuspect suspectConfirmCorrect={this.handleConfirmSuspect}></ConfirmSuspect>;
        }

        let injection3, table3 = null;
        if (this.state.confirmSuspectCorrect) {
            injection3 = <Container>
                <h5>New Suspect Building Access</h5>
                <p className='helper-text'>Hmm... it seems that both Natasha or Bruce didn't check into the building until <b><i>after</i></b> Tony was found in the break room.
						Looks like the lead on liking almonds wasn't quite as fruitful as we hoped. Let's pivot and find out who was in the building before Tony to gain our next round of suspects.</p>
                <h6 className='sub-headers'> SQL Injection 3</h6>
                <p className='helper-text'><b>Use SQL Injection to find out who accessed the building before Tony. Remember, that would be anyone who entered the building before 11:30 am!</b></p>
                <LoginSQL game_step='S6_B3' processResults={this.processResults3} batchSqlCorrect={this.handleBatch3Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
            </Container>
            table3 = <ResponseTable results={this.state.results3} />;
        }

        let suspects = null;
        if (this.state.batch3Correct) {
            suspects = <Container>
                <p className="text-under-table helper-text">The outputs from the past three queries are saved in the Clues.txt file for future reference.</p>
                <h5>New Suspects</h5>
                <p> A new lead! It looks like there are two employees who entered the building before Tony on the day he died.  </p>
                <h6 className='sub-headers'> Declare Suspects</h6>
                <p className="helper-text"><b>Check the list of user data in your list of clues, find the names of employees who entered the building before 11:30am by comparing the User_IDs, and enter them in the fields below.</b></p>
                <Suspect game_step={'S6_S'} suspectCorrect={this.handleSuspect1Correct}></Suspect>
                <Suspect game_step={'S6_S'} suspectCorrect={this.handleSuspect2Correct}></Suspect>
                <p className="helper-text">These suspect names will be saved in the Clues.txt file for future reference.</p>
            </Container>;
        }

        let continueButton = (this.state.suspect1Correct && this.state.suspect2Correct) ? <Button variant="outline-primary float-right" href="/step7">Continue</Button> : null;

        return (
            <Container fluid="md">
                <h2 className='sub-headers'>Step Six: Targeted SQL</h2>
                <h5>Background</h5>
                <p>
                    It looks like Natasha Romanoff and Bruce Banner are your prime suspects so far. It seems hard to believe that they would turn on Tony Because
                    they are all such good friends but... Natasha is a trained assassin and the big green guy can be pretty unpredictable. Let's see if you can find any
					additional evidence that will show you whether you're on the right trail or not. <br></br><br></br>The police report states that Tony was last seen entering the building at 11:30am before he was found in the break room at 12:30pm.
					It's likely that the murderer entered the building before Tony in order to stage their crime.
				</p>
                <h5>BUILDING_ACCESS Table Information</h5>
                <p>
                    First, you need more information about the BUILDING_ACCESS table in order to query for specific information about your suspects. In SQLite, the underlying database system of the company,
                    the function PRAGMA_TABLE_INFO(table_name) returns information about the given table in the database schema. The 'name' property will return the names of the table columns.
				</p>
                <h6 className='sub-headers'> SQL Injection 1</h6>
                <p className='helper-text'><b>Use Batch SQL Injection and the PRAGMA_TABLE_INFO function to determine the column names of the BUILDING_ACCESS table.</b></p>
                <Hint hint={"Use any valid statement to finish the expected query. Use a SELECT statement with the PRAGMA function to find the column names. "}></Hint>
                <LoginSQL game_step='S6_B1' processResults={this.processResults1} batchSqlCorrect={this.handleBatch1Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
                {table1}
                {injection2}
                {table2}
                {confirmSuspect}
                {injection3}
                {table3}
                {suspects}
                <Button variant="outline-primary float-left" href="/step5" >Back</Button>
                {continueButton}
            </Container>
        );
    }
}

export default Step6;

//step7.js
// Written by Lia Ferguson

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step7 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            batch1Correct: false, batch2Correct: false, user_id: '', password: '',
            isLoginSuccessful: false, errorMessage: '', loginClicked: false, suspectCorrect: false,
            results1: '', results2: ''
        };

        this.handleBatch1Success = this.handleBatch1Success.bind(this);
        this.handleBatch2Success = this.handleBatch2Success.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleSuspectCorrect = this.handleSuspectCorrect.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.processResults1 = this.processResults1.bind(this);
        this.processResults2 = this.processResults2.bind(this);
    }

    handleBatch1Success() {
        this.setState({ batch1Correct: true });
    }

    handleBatch2Success() {
        this.setState({ batch2Correct: true });
    }

    handleSuspectCorrect(isCorrect) {
        this.setState({ suspectCorrect: isCorrect })
    }

    handleUserIdChange(e) {
        e.preventDefault()
        this.setState({ user_id: e.target.value });
    }

    handlePasswordChange(e) {
        e.preventDefault()
        this.setState({ password: e.target.value });
    }

    processResults1(results) {
        this.setState({ results1: results });
    }

    processResults2(results) {
        this.setState({ results2: results });
    }

    async handleQuery() {
        var response = await this.executeQuery(this.state.user_id, this.state.password);
        var isQuerySuccessful = response.isLoginSuccessful == 'true' ? true : false;
        this.setState({ isLoginSuccessful: isQuerySuccessful });
        this.setState({ loginClicked: true });
        this.setState({ errorMessage: response.error });
    }

    async executeQuery(user_id, pwd) {
        const response = await fetch(BACKEND_API_URL + "/login", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                password: pwd,
            })
        })
        return await response.json();
    }

    render() {
        let suspect, table1 = null;
        if (this.state.batch1Correct) {
            suspect = <Container>
                <h5>Prime Suspect</h5>
                <p> Based on what we know about Tony's Questionnaire information, where he was found when he died, and the Purchase Order information, can you deduce who the prime suspect should be?</p>
                <h6 className='sub-headers'> Declare Prime Suspect</h6>
                <p className="helper-text"><b>Use all the information you have collected so far, including the files downloaded on your computer, to deduce who the prime suspect should be.</b></p>
                <Suspect game_step='S7_S' suspectCorrect={this.handleSuspectCorrect}></Suspect>
            </Container>;
            table1 = <ResponseTable results={this.state.results1} />;
        }
        let injection2 = null;
        if (this.state.suspectCorrect) {
            injection2 = <Container>
                <h5>Get Suspect Credentials</h5>
                <p>You have Thanos' User_ID. Now all you have to do is find his password and log into his account to see if your hunch is correct about him being guilty!
                Since this database is vulnerable to SQL injection, it's likely that passwords aren't stored securely either.
				</p>
                <h6 className='sub-headers'> SQL Injection 2</h6>
                <p className='helper-text'><b>Use Batch SQL Injection to find out what Thanos's Password is.</b></p>
                <Hint hint="Use the USERS table to find Thanos' password."></Hint>
                <LoginSQL game_step='S7_B2' processResults={this.processResults2} batchSqlCorrect={this.handleBatch2Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
            </Container>;
        }
        let queryResponse = null;
        if (this.state.loginClicked && !this.state.isLoginSuccessful) {
            queryResponse = <div className="instruction-div">
                <p>
                    {this.state.errorMessage}
                </p>
            </div>;
        } else if (this.state.loginClicked && this.state.isLoginSuccessful) {
            queryResponse = <Container fluid="md">
                <Modal
                    show={true}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Dialog>
                        <Modal.Title>Congratulations!! You solved it!</Modal.Title>
                        <Modal.Body>
                            <p>You solved Tony Stark's murder with your expert SQL Injection skills!!<br></br><br></br>
							Thanos was ready to take over Stark Industries (and the greater multiverse at large)
							so he broke into Pepper's computer and stole Tony's Questionnaire data. When he found out that Tony had an Almond allergy,
							he bought almond coffee creamer and swapped the label with a normal creamer. Since Tony's favorite drink is coffee and he's been working
							late nights, he drank a ton of coffee and had a severe allergic reaction to the creamer.
							<br></br><br></br>
							You have cleared your name and helped to avenge Tony's death!
						</p>
                            <Button variant='primary' href='/'> End Game</Button>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal>

            </Container>
        }
        let login, table2 = null;
        if (this.state.batch2Correct) {
            table2 = <ResponseTable results={this.state.results2} />;
            login = <Container>
                <h5>Final Step</h5>
                <p className='helper-text'> This is it! All of your evidence has seemed to converge on one prime suspect. Now it's time to see if all of your hard work has paid off!</p>
                <h6 className='sub-headers'>Login</h6>
                <p className='helper-text'><b>Enter your prime suspect's credentials to see if you've solved the murder!</b></p>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={8}>
                            <Form>
                                <div align='center' className='login-form'>
                                    <h3 className='sub-headers'>Login</h3>
                                    <Form.Group controlId='username'>
                                        <Form.Label className='login-labels'>User_ID</Form.Label>
                                        <Form.Control value={this.state.user_id} type='username' placeholder="Enter User_ID here" onChange={this.handleUserIdChange}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label className='login-labels' >Password</Form.Label>
                                        <Form.Control value={this.state.password} type='password' placeholder="Enter password here" onChange={this.handlePasswordChange} ></Form.Control>
                                    </Form.Group>
                                    <Button className='login-button' variant='primary' onClick={this.handleQuery} href={this.props.history}>Login</Button>
                                    {queryResponse}
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
        }

        return (
            <Container fluid="md">
                <h2 className='sub-headers'>Step Seven: Targeted SQL and Final Conclusion</h2>
                <h5>Background</h5>
                <p>
                    It looks like Peter Parker and Thanos are your new suspects. Either of them would've had time to set up their plan for Tony's demise
                    before he arrived at the office at 11:30am. Now you just need to find out the substance that was used to murder Tony and who was responsible for using it.
                    For any communal resources, employees must submit purchase orders to the company. Maybe someone slipped up and ordered their murder substance through the purchase order sheet?
				</p>
                <h5>PURCHASE_ORDER Table Information</h5>
                <p>
                    Since you don't have any additional information about the PURCHASE_ORDERS table, it might be best to return as much information as possible from the table for your two suspects.
				</p>
                <h6 className='sub-headers'> SQL Injection 1</h6>
                <p className='helper-text'><b>Use Batch SQL Injection to return all columns and records for your suspects from the PURCHASE_ORDERS table.</b></p>
                <Hint hint={"Use any valid statement to finish the expected query. Use a SELECT statement with the PRAGMA function to find the column names. "}></Hint>
                <LoginSQL game_step='S7_B1' processResults={this.processResults1} batchSqlCorrect={this.handleBatch1Success} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
                {table1}
                {suspect}
                {injection2}
                {table2}
                {login}
                <Button variant="outline-primary float-left" href="/step6" >Back</Button>
            </Container>
        );
    }
}

export default Step7;

//suspect.js
// Written by Lia Ferguson

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Suspect extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isSuspect: false, isClicked: false, name: '', responseMessage: '' };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    async handleSubmit() {
        var response = await this.checkName(this.state.name);
        var isQuerySuccessful = response.correct == 'true' ? true : false
        this.setState({ isClicked: true });
        this.setState({ isSuspect: isQuerySuccessful });
        this.props.suspectCorrect(this.state.isSuspect);
        this.setState({ responseMessage: response.message });
    }

    async checkName(name, game_step) {
        const response = await fetch(BACKEND_API_URL + "/suspect", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                game_step: this.props.game_step
            })
        })
        return await response.json();
    }

    render() {
        let validation = this.state.isClicked ? <Row><Col><p>{this.state.responseMessage}</p></Col></Row> : null;
        return (
            <Container fluid="md">
                <Form>
                    <div align='center' className='login-form'>
                        <h6 className='sub-headers'>Enter Suspect</h6>
                        <Form.Row controlId='suspect'>
                            <Col >
                                <Form.Label>Suspect Name</Form.Label>
                                <Form.Control className='suspect-field' value={this.state.name} placeholder="Enter suspect name here" onChange={this.handleNameChange}></Form.Control>
                            </Col>
                            <Col>
                                <div className='button-padding'>
                                    <Button className='login-button' variant='primary' onClick={this.handleSubmit}> Submit</Button>
                                </div>
                            </Col>
                        </Form.Row>
                        {validation}
                    </div>
                </Form>
            </Container>
        );
    }
}

export default Suspect;


//trojanmodal.js
// Written by Lia Ferguson
const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class TrojanModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { show: this.props.show, submitClicked: false, isQuerySuccessful: false, f_name: '', l_name: '', nextButton: false };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showNextButton = this.showNextButton.bind(this);
    }

    handleFirstNameChange(e) {
        e.preventDefault();
        this.setState({ f_name: e.target.value });
    }

    handleLastNameChange(e) {
        e.preventDefault();
        this.setState({ l_name: e.target.value });
    }

    handleClose() {
        this.setState({ show: false });
    }

    showNextButton() {
        this.setState({ nextButton: true })
    }

    async handleName() {
        var response = await this.executeQuery(this.state.f_name, this.state.l_name);
        var isQuerySuccessful = response.isSuccess == 'true' ? true : false
        this.setState({ isQuerySuccessful: isQuerySuccessful });
        this.setState({ submitClicked: true });
        this.props.setTimeout(this.showNextButton, 4000);
    }

    async executeQuery(f_name, l_name) {
        const response = await fetch(BACKEND_API_URL + "/trojan_horse", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: f_name,
                last_name: l_name
            })
        })
        return await response.json();
    }

    render() {
        let submitButton = <Button className='login-button' variant='primary' onClick={this.handleName}>Submit</Button>;
        if (this.state.submitClicked) {
            submitButton = <Button variant="primary" >
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
				Loading...
			</Button>;
        }

        let successText = '';
        let nextButton = null;
        if (this.state.nextButton) {
            submitButton = <Button disabled variant='primary'>Success</Button>;
            successText = <p>Your information was received! On to the shortcut!</p>;
            nextButton = <Button variant='primary' href='/paddedcell'>Continue</Button>;
        }

        return (
            <Container fluid="md">
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Shortcut!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>You have shown mastery of SQL Injection so far! Your skills have unlocked
                            a shortcut to valuable information that will help you solve Tony Stark's murder
                            quicker! The shortcut information will be downloaded to your computer.
                            Please enter your first and last name so you can gain access to the shortcut.
							</p>
                            <Form>
                                <div align='center' className='login-form'>
                                    <h3 className='sub-headers'>Unlock Shortcut</h3>
                                    <Form.Group controlId='First Name'>
                                        <Form.Label className='login-labels'>First Name</Form.Label>
                                        <Form.Control value={this.state.f_name} placeholder="Enter your first name here" onChange={this.handleFirstNameChange}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label className='login-labels' >Last Name</Form.Label>
                                        <Form.Control value={this.state.l_name} placeholder="Enter your last name here" onChange={this.handleLastNameChange} ></Form.Control>
                                    </Form.Group>
                                    {submitButton}
                                    {successText}
                                    {nextButton}
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal>

            </Container>
        );
    }
}

export default ReactTimeout(TrojanModal);