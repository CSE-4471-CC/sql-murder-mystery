import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class ConfirmSuspect extends React.Component {
  constructor (props) {
    super(props);

		this.state = {isClicked: false, isCorrect: false};
		this.handleCorrectSuspectButton = this.handleCorrectSuspectButton.bind(this);
	}
	
	handleCorrectSuspectButton(e){
		this.setState({isClicked: true});
		if(e.target.value == 'correct'){
			this.setState({isCorrect: true});
			this.props.suspectConfirmCorrect(true);
		} else {
			this.setState({isCorrect: false});
			this.props.suspectConfirmCorrect(false);
		}
	}

  render(){
		let buttonResponse = null;
		if(this.state.isClicked){
			if(this.state.isCorrect){
				buttonResponse = <div><p className='helper-text'>You're right, both Natasha and Bruce didn't check into the building until after Tony was found in the break room, so 
				it is unlikely that either of them are responsible for Tony's death. 
			</p></div>
			} else {
				buttonResponse =<div className='center-text'><p className='helper-text'>Are you sure? Remember, Tony accessed the building at <b>11:30am</b> and was found dead <b>before noon</b></p></div>; 
			}
		}


    return(
			<Container>
				<div>
				<h5>Re-evaluate Suspect List</h5>
				<p className='helper-text'>Based on the results of your query, do you think that Natasha and Bruce should still be on our suspect list?</p>
				</div>
						
					<Row>
						<div className ='button-group-suspect'>
							<ButtonGroup>
									<Button variant='primary' value='incorrect' onClick={this.handleCorrectSuspectButton}>Yes</Button>
									<Button variant ='primary' value='correct' onClick={this.handleCorrectSuspectButton}>No</Button>
							</ButtonGroup>
						</div>
						{buttonResponse}	
					</Row>
				</Container>
    );
  }
}

export default ConfirmSuspect;