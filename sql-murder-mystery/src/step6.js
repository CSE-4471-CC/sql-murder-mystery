import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Hint from './hint'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import Suspect from './suspect';
import ConfirmSuspect from './confirmsuspect';


const BACKEND_API_URL = 'http://127.0.0.1:5000/endpoints';

class Step6 extends React.Component{
  constructor (props) {
    super(props);

		this.state = {batch1Correct: false, batch2Correct: false, batch3Correct: false, confirmSuspectCorrect: false,
		suspect1Correct: false, suspect2Correct: false};

		this.handleBatch1Success = this.handleBatch1Success.bind(this);
		this.handleBatch2Success = this.handleBatch2Success.bind(this);
		this.handleBatch3Success = this.handleBatch3Success.bind(this);
		this.handleConfirmSuspect = this.handleConfirmSuspect.bind(this);
		this.handleSuspect1Correct = this.handleSuspect1Correct.bind(this);
		this.handleSuspect2Correct = this.handleSuspect2Correct.bind(this);
  }

	handleBatch1Success(){
		this.setState({batch1Correct: true});
	}

	handleBatch2Success(){
		this.setState({batch2Correct: true});
	}

	handleBatch3Success(){
		this.setState({batch3Correct: true});
	}

	handleConfirmSuspect(isCorrect){
		this.setState({confirmSuspectCorrect: isCorrect})
	}

	handleSuspect1Correct(isCorrect){
		this.setState({suspect1Correct: isCorrect})
	}

	handleSuspect2Correct(isCorrect){
		this.setState({suspect2Correct: isCorrect})
	}

  render(){
		
		let injection2, confirmSuspect = null;
		if(this.state.batch1Correct){
			injection2 = <Container>
				<h5>Check Suspect Building Access</h5>
				<p>Great! Now you have enough information to check when Natasha and Bruce entered the building. Remember, you have their User_ID's in your 'Clues.txt' file</p>
				<h6 className='sub-headers'> SQL Injection 2</h6>
				<p className='helper-text'><b>Use SQL Injection to find out what time Natasha and Bruce accessed the building on the day of Tony's death. Remember to return the User_ID column as well so you know who entered the building when!</b></p>
				<LoginSQL game_step = 'S6_B2' batchSqlCorrect={this.handleBatch2Success} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
			</Container>;

		}

		if(this.state.batch2Correct){
			confirmSuspect = <ConfirmSuspect suspectConfirmCorrect = {this.handleConfirmSuspect}></ConfirmSuspect>;
		}

		let injection3 = null;
		if(this.state.confirmSuspectCorrect){
			injection3 = 	<Container>
					<h5>New Suspect Building Access</h5>
					<p className='helper-text'>Hmm... it seems that both Natasha or Bruce didn't check into the building until <b><i>after</i></b> Tony was found in the break room. 
						Looks like the lead on liking almonds wasn't quite as fruitful as we hoped. Let's pivot and find out who was in the building before Tony to gain our next round of suspects.</p> 
					<h6 className='sub-headers'> SQL Injection 3</h6>
					<p className='helper-text'><b>Use SQL Injection to find out who accessed the building before Tony. Remember, that would be anyone who entered the building before 11:30 am!</b></p>
					<LoginSQL game_step = 'S6_B3' batchSqlCorrect={this.handleBatch3Success} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
				</Container>
		}
			
		let suspects = null;
		if(this.state.batch3Correct){		
			suspects = <Container>
				<p className="helper-text">The outputs from the past three queries are saved in the Clues.txt file for future reference.</p>
				<h5>New Suspects</h5>
				<p> A new lead! It looks like there are two employees who entered the building before Tony on the day he died.  </p>
				<h6 className='sub-headers'> Declare Suspects</h6>
				<p  className="helper-text"><b>Check the list of user data in your list of clues, find the names of employees who entered the building before 11:30am by comparing the User_IDs, and enter them in the fields below.</b></p>
				<Suspect game_step = {'S6_S'} suspectCorrect = {this.handleSuspect1Correct}></Suspect>
				<Suspect game_step = {'S6_S'} suspectCorrect = {this.handleSuspect2Correct}></Suspect>
				<p className="helper-text">These suspect names will be saved in the Clues.txt file for future reference.</p>
			</Container>;
		}
		
		let continueButton = (this.state.suspect1Correct && this.state.suspect2Correct) ? <Button variant="outline-primary float-right" href="/step7">Continue</Button> : null;

		


    return(
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
				<LoginSQL game_step = 'S6_B1' batchSqlCorrect={this.handleBatch1Success} congratsMessage = "Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage = "Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>
				{injection2}
				{confirmSuspect}
				{injection3}
				{suspects}
				<Button variant="outline-primary float-left" href="/step5" >Back</Button>
				{continueButton}
      </Container>
    );
  }
}


export default Step6;