import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Suspect extends React.Component{
  constructor (props) {
    super(props);

    this.state = {isSuspect: false, isClicked: false, name: '', responseMessage: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e){
    e.preventDefault();
    this.setState({name: e.target.value});
  }


	async handleSubmit(){
		var response = await this.checkName(this.state.name, this.props.game_step);
		var isQuerySuccessful = response.correct == 'true' ? true : false
		this.setState({isClicked: true});
		this.setState({isSuspect: isQuerySuccessful});
		this.props.suspectCorrect(this.state.isSuspect);
		this.setState({responseMessage: response.message});
	}

	async checkName(name, game_step){
		const response = await fetch(BACKEND_API_URL + "/suspect", {
			method: "POST",
			mode: 'cors', 
			headers: {
				'Content-Type': 'application/json'
			 },
			body: JSON.stringify({
				name: name,
				game_step: game_step
			})
		}) 
		return await response.json();
	}
  
  render(){

		let validation = this.state.isClicked ? <Row><Col><p>{this.state.responseMessage}</p></Col></Row> : null;
    return(
			<Container fluid="md">
				<Form>
					<div align='center' className='login-form'>
					<h6 className='sub-headers'>Enter Suspect</h6>
					<Form.Row controlId='suspect'>
						<Col >
							<Form.Label>Suspect Name</Form.Label>
							<Form.Control className= 'suspect-field' value={this.state.name}  placeholder="Enter suspect name here" onChange={this.handleNameChange}></Form.Control>
						</Col>
						<Col>
							<div className='button-padding'>
								<Button className = 'login-button' variant='primary' onClick = {this.handleSubmit}> Submit</Button>
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