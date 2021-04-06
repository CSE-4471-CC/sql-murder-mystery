import React from 'react';
import Row from 'react-bootstrap/Row';
import ReactTimeout from 'react-timeout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import TrojanModal from './trojanmodal';
import Hint from './hint';
import Suspect from './suspect';
import ResponseTable from './ResponseTable';

// Written by Lia Ferguson
const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step5 extends React.Component{
  constructor (props) {
    super(props);

    this.state = {launchModal: false, continueClicked: false, renderBatch1: false,
			 isClicked: false, batchSqlCorrect: false, suspect1Correct: false, suspect2Correct: false,
				results: ''};

		this.handleFirstContinue = this.handleFirstContinue.bind(this);
		this.launchModal = this.launchModal.bind(this);
		this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
		this.handleSuspect1Correct = this.handleSuspect1Correct.bind(this);
		this.handleSuspect2Correct = this.handleSuspect2Correct.bind(this);
		this.processResults = this.processResults.bind(this);
  }

	launchModal(){
		this.setState({launchModal: true});
		
	}

	handleBatchQuerySuccess(isSuccessful){
		this.setState({batchSqlCorrect: isSuccessful});
	}

	handleFirstContinue(){
		this.setState({continueClicked: true});
		this.setState({renderBatch1: true});
		this.props.setTimeout(this.launchModal, 5000);
	}
  
	handleSuspect1Correct(isCorrect){
		this.setState({suspect1Correct: isCorrect});
	}

	handleSuspect2Correct(isCorrect){
		this.setState({suspect2Correct: isCorrect});
	}

	processResults(results) {
		this.setState({ results: results });
	}

  render(){
		let firstContinueButton = <Button variant='primary' onClick={this.handleFirstContinue}>Continue</Button>;
		if(this.state.continueClicked){
			firstContinueButton = null;
		}
		let modal = null;
		if(this.state.launchModal){
			modal = <TrojanModal show={true}></TrojanModal>;
		}
		let batchSQL1, table = null;
		if(this.state.renderBatch1){
			batchSQL1 = <Container>
				<h5>Office Almond Snackers</h5>
				<h6 className='sub-headers'> SQL Injection</h6>
				<p  className="helper-text"><b>Use SQL Batch Injection to check if anyone in the office has an affinity for almonds. Only use columns you absolutely need in your query please.</b></p>
				<Hint hint={'Think back to the table, columns, and technique you used for your most recent SQL Injection.'}></Hint>
				<LoginSQL game_step = 'S5_B1' processResults={this.processResults} batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
			</Container>;
			table = <ResponseTable results={this.state.results} />;

		}
		let suspects = null;
		if(this.state.batchSqlCorrect){
			suspects = <Container>
				<p className=" text-under-table helper-text">The output of your query will also be saved in the Clues.txt file for future reference.</p>
				<h5>Office Almond Snackers</h5>
				<p>It looks like there are two almond snackers in the office. Perhaps one of them snapped and weaponized their favorite snack against Tony? You need more information about them in order to add them to your official suspect list.  </p>
				<h6 className='sub-headers'> Declare Suspects</h6>
				<p  className="helper-text"><b>Check the list of user data in your list of clues, find the names of employees who like almonds, and enter them in the fields below.</b></p>
				<Suspect game_step = {'S5_S'} suspectCorrect = {this.handleSuspect1Correct}></Suspect>
				<Suspect game_step = {'S5_S'} suspectCorrect = {this.handleSuspect2Correct}></Suspect>
				<p className="helper-text">These suspect names will be saved in the Clues.txt file for future reference.</p>
			</Container>;
		}

		let secContinueButton = (this.state.suspect1Correct && this.state.suspect2Correct) ? <Button variant="outline-primary float-right" href="/step6">Continue</Button> : null;

    return(
			<Container fluid="md">
				{modal}
				<h2 className='sub-headers'>Step Five: Targeted SQL</h2>
				<h5>Background</h5>
				<p>
					Great! Now you have some more information about Tony. Let's see... Since Tony was found in the break room and he has a 
					known almond allergy, maybe we should look for people in the office who really like almonds?
				</p>
				<Row className="justify-content-md-center">
					{firstContinueButton}
				</Row>
				{batchSQL1}
				{table}
				{suspects}
				<Button variant="outline-primary float-left" href="/step4" >Back</Button>
				{secContinueButton}
      </Container>
    );
  }
}


export default ReactTimeout(Step5);