import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

class Step1 extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Step One: Credential SQL Injection</h2>
        <p>
          You now have Tony's computer, which you can use to view the database. There's only one problem: you do not know his password to access his private database. You can only think of one option to get access to his computer, SQL Injection! While it is a form of hacking, you deem it worthy in order to try to find out who murdered your friend, Tony. 
        </p>
        <Row>
        <Col>
        <Accordion className='hint'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Hint
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Think back to the practice section you just completed. Rely on you knowledge of how to retrieve a single row from the users table when you know a user's credentials... </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Col>
        <Col xs={8}>
        <Form>
          <div align='center' className='login-form'>
          <h3 className='sub-headers'>Login</h3>
          <Form.Group controlId='username'>
            <Form.Label className='login-labels'>Username</Form.Label>
            <Form.Control type='username' placeholder="Enter username here" ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='login-labels' >Password</Form.Label>
            <Form.Control type='password' placeholder="Enter password here" ></Form.Control>
          </Form.Group>
          <Button className = 'login-button' variant='primary'>Login</Button>
          </div>
        </Form> 
        </Col>
        </Row>
        
      </Container>


    );
  }
}


export default Step1;