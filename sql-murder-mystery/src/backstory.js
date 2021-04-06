import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

// Written by Julia Workum and Lia Ferguson
class Backstory extends React.Component {
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid="md">
        <h2 className='sub-headers' >Backstory</h2>
        <p>
          Your best friend and boss of 5 years, Tony Stark, has just been found dead in the office break room right next to the coffee machine. 
          Unfortunately, the police don’t have any suspects and the case has gone cold. 
          However, you think that one of your coworkers must be responsible. 
          In order to see who's had access to the breakroom, you know you'll have to break into the secret employee database on Tony's computer. 
          Now, it’s up to you to use your SQL skills and find out who murdered Tony Stark.
        </p>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant="outline-primary float-right" href="/rules">Next</Button>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Backstory;