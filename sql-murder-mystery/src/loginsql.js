import React from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

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


async handleQuery(){
	var response = await this.executeQuery(this.state.user_id, this.state.password);
	var isQuerySuccessful = response.isQuerySuccessful == 'true' ? true : false;
	var correctResults = response.correctResults == 'true' ? true : false;
	this.setState({isQuerySuccessful: isQuerySuccessful});
	this.setState({correctResults: correctResults});
	this.setState({isClicked: true});
	this.setState({errorMessage: response.error});
  if (isQuerySuccessful && correctResults) {
    this.props.batchSqlCorrect(true);
  } else {
    this.props.batchSqlCorrect(false);
  }
  if (this.props.processResults != null) {
    this.props.processResults(response.results);
  }
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
			password: pwd,
			game_step: this.props.game_step
		})
	}) 
	return await response.json();
}
	
  render(){
		let queryResponse, continueButton;
		if(this.state.isClicked && this.state.isQuerySuccessful && this.state.correctResults){
			queryResponse = <div className="instruction-div">
				<p  className="helper-text"> 
					{this.props.congratsMessage}
				</p>
			</div>;
			continueButton = <Button variant="outline-primary float-right" href="/step2">Continue</Button>;
		} else if (this.state.isClicked && (!this.state.isQuerySuccessful || !this.state.correctResults)){
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