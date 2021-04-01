import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


class Step3 extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Step Three: Figure out the table names</h2>
        <p>In order to retrieve information from the database, you will need more information about the underlying database schema. <b>Use SQL injection to retrieve the names of the tables in the database.</b></p>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <Accordion className='hint'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Hint
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hint tbd... </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8}>
          <p>form should go here eventually, but i don't want to mess with backend stuff just yet</p>
          </Col>
        </Row>
        <Button variant="outline-primary float-left" href="/step2" >Back</Button>
        <Button variant="outline-primary float-right" href="/step4">Continue</Button>
      </Container>

    );
  }
}


export default Step3;