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
	this.setState({isClicked: true});
	this.props.batchSqlCorrect(isQuerySuccessful);
}

async executeQuery(user_id, pwd, isQuerySuccessful){
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
	
  render(){
		let queryResponse, continueButton;
		if(this.state.isClicked && this.state.isQuerySuccessful){
			queryResponse = <div className="instruction-div">
				<p  className="helper-text"> 
					{this.props.congratsMessage}
				</p>
			</div>;
			continueButton = <Button variant="outline-primary float-right" href="/step2">Continue</Button>;
		} else if (this.state.isClicked && !this.state.isQuerySuccessful){
			queryResponse = <div className="instruction-div">
				<p  className="helper-text"> 
					{this.props.failureMessage}
				</p>
			</div>;
			continueButton = null;
		}

    return(
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
						<Form.Control value= {this.state.password} type='password' placeholder="Enter password here" onChange={this.handlePasswordChange} ></Form.Control>
					</Form.Group>
					<Button className = 'login-button' variant='primary' onClick = {this.handleQuery}>Login</Button>
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