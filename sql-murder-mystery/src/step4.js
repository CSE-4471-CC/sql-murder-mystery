import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Question from './question';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Step4 extends React.Component {
  constructor (props) {
    super(props);
  }

  render(){
		const question = 'What is the best way to protect an application from SQL Injection?';
		const answers = [
			<Card.Text className="answer-text"> Encrypt all data stored in the database <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Limit admin access to as few users as possible <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Make a really complex schema that would be hard for an attacker to reverse engineer <br></br><br></br></Card.Text>,
			<Card.Text className="answer-text"> Sanitize all user input from form fields <br></br><br></br></Card.Text>
		];
		let header = new Map();
		header['A'] = 'Incorrect';
		header['B'] = 'Incorrect';
		header['C'] = 'Incorrect';
		header['D'] = 'Correct';

		const responses = new Map();
		responses['A'] = 'Encrypting important data is good practice, however encryption alone doesn\'t have a direct correlation to preventing SQL Injection';
		responses['B'] = 'Limiting admin privileges is good practice, but if admin credentials are stored in a database not protected against SQL Injection, attackers can still exploit them.';
		responses['C'] = 'Having a complex schema might limit the amount of info that could be retrieved using SQL Injection, but it isn\'t the best countermeasure';
		responses['D'] = 'Sanitizing all user input ensures that any unexpected input either won\'t be accepted by your form, or it won\'t be executed as a SQL query, protecting your database.';

    return(
      <Container fluid="md">
				<Question question = {question} answers = {answers} header={header} responses={responses}/>
      </Container>

    );
  }
}
export default Step4;