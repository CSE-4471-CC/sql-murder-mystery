import React from 'react';
import ReactTimeout from 'react-timeout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class TrojanModal extends React.Component{
  constructor (props) {
    super(props);

    this.state = {show: this.props.show, isQuerySuccessful: false, f_name: '', l_name: ''};

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleClose = this.handleClose.bind(this);
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

	async handleName(){
		var response = await this.executeQuery(this.state.f_name, this.state.l_name);
		var isQuerySuccessful = response.isSuccess == 'true' ? true : false
		this.setState({isQuerySuccessful: isQuerySuccessful});
		this.setState({isClicked: true});
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
								quicker! Please enter your first and last name so you can gain access to the shortcut.
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
							<Button className = 'login-button' variant='primary' onClick = {this.handleName}>Submit</Button>
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