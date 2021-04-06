import React from 'react';
import ReactTimeout from 'react-timeout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

// Written by Lia Ferguson
const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class TrojanModal extends React.Component{
  constructor (props) {
    super(props);

    this.state = {show: this.props.show, submitClicked: false, isQuerySuccessful: false, f_name: '', l_name: '', nextButton: false};

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.showNextButton = this.showNextButton.bind(this);
  }

  handleFirstNameChange(e){
    e.preventDefault();
    this.setState({f_name: e.target.value});
  }

  handleLastNameChange(e){
    e.preventDefault();
    this.setState({l_name: e.target.value});
  }

	handleClose(){
		this.setState({show: false});
	}


	showNextButton(){
		this.setState({nextButton: true})
	}

	async handleName(){
		var response = await this.executeQuery(this.state.f_name, this.state.l_name);
		var isQuerySuccessful = response.isSuccess == 'true' ? true : false
		this.setState({isQuerySuccessful: isQuerySuccessful});
		this.setState({submitClicked: true});
		this.props.setTimeout(this.showNextButton, 4000);
	}
	
	async executeQuery(f_name, l_name){
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
  
  render(){

		let submitButton = <Button className = 'login-button' variant='primary' onClick = {this.handleName}>Submit</Button>;
		if (this.state.submitClicked){
			submitButton =   <Button variant="primary" >
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
		if(this.state.nextButton){
			submitButton = <Button disabled variant='primary'>Success</Button>;
			successText = <p>Your information was received! On to the shortcut!</p>;
			nextButton = <Button variant='primary' href='/paddedcell'>Continue</Button>;
		}

    return(
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
										<Form.Control value= {this.state.l_name}  placeholder="Enter your last name here" onChange={this.handleLastNameChange} ></Form.Control>
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