import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step1 extends React.Component{
  constructor (props) {
    super(props);

    this.state = {isClicked: false, isQuerySuccessful: false, user_id: '', password: ''};

    this.handleQuery = this.handleQuery.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserIdChange(e){
    e.preventDefault()
    this.setState({user_id: e.target.value});
  }

  handlePasswordChange(e){
    e.preventDefault()
    this.setState({password: e.target.value});
  }


  async handleQuery(){
    var response = await this.executeQuery(this.state.user_id, this.state.password);
		var isQuerySuccessful = response.isQuerySuccessful == 'true' ? true : false
		this.setState({isQuerySuccessful: isQuerySuccessful});
		this.setState({isClicked: true})
  }

  async executeQuery(user_id, pwd, isQuerySuccessful){
    const response = await fetch(BACKEND_API_URL + "/login_query", {
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


  
  render(){
		let queryResponse, continueButton;
		if(this.state.isClicked && this.state.isQuerySuccessful){
			queryResponse = <div>
				<p> Congratulations! You successfully bypassed authentication by using SQL Injection!
					If a website's backend does not sanitize user input before using it in a SQL query,
					you are able to "hijack" the query by placing a condition that is always true into
					the query in order to bypass the intended programatic flow.
				</p>
			</div>;
			continueButton = <Button variant="outline-primary float-right" href="/step2">Continue</Button>;
		} else if (this.state.isClicked && !this.state.isQuerySuccessful){
			queryResponse = <div>
				<p> Hmm, looks like your SQL Injection wasn't quite right. Please try again.
					Remember, use the hint if you are stumped!
				</p>
			</div>;
			continueButton = null;
		}
    return(
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
                <Form.Control value= {this.state.password} type='password' placeholder="Enter password here" onChange={this.handlePasswordChange} ></Form.Control>
              </Form.Group>
              <Button className = 'login-button' variant='primary' onClick = {this.handleQuery}>Login</Button>
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