import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Question extends React.Component {
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid="md">
				<Row className="justify-content-md-center">
					<p>
						<b>Question</b><br></br>
						{this.props.question}
					</p>
				</Row>
				<Row className="justify-content-md-center">
					<CardGroup>
						<Card style={{ width: '18rem' }} bg="light">
							<Button className="question-button" variant="outline-primary" size="sm"  > A </Button>
							{this.props.answers[0]}
						</Card>
						<Card style={{ width: '18rem' }} bg="light">
							<Button className="question-button" variant="outline-primary" size="sm"> B </Button>
							{this.props.answers[1]}
						</Card>
					</CardGroup>
				</Row>
				<Row className="justify-content-md-center">
					<CardGroup>
						<Card style={{ width: '18rem' }} bg="light">
							<Button className="question-button" variant="outline-primary" size="sm"> C </Button>
							{this.props.answers[2]}
						</Card>
						<Card style={{ width: '18rem' }} bg="light">
							<Button className="question-button" variant="outline-primary" size="sm"> D </Button>
							{this.props.answers[3]}
						</Card>
					</CardGroup>
				</Row>
      </Container>
    );
  }
}

export default Question;