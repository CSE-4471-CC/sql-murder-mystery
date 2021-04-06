import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Hint from './hint'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import Suspect from './suspect';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ResponseTable from './ResponseTable';
import Modal from 'react-bootstrap/Modal';

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