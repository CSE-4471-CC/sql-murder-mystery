import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Timer from './timer';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormGroup from 'react-bootstrap/esm/FormGroup';

class Step2 extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Uh oh!</h2>
        <p>Honey pot time! Not sure if y'all wanted me to do this part, but i'll make a questions template beneath to get things started... </p>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <Form>
                {["1", "2", "3"].map((num) => (
                  <Form.Group>
                    <Form.Label>
                      This is question #{num}. I haven't written the questions yet though so this is all we've got.
                    </Form.Label>
                    <Form.Check 
                      label="answer"
                      type="radio"
                      id={`answer${num}`}/>
                      <Form.Check 
                      label="answer"
                      type="radio"
                      id={`answer${num}`}/>
                      <Form.Check 
                      label="answer"
                      type="radio"
                      id={`answer${num}`}/>
                  </Form.Group>
                ))}
                <Form.Group>
                  <Button>
                    Check answers
                  </Button>
                </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <Timer/>
          </Col>
        </Row>
        <Button variant="outline-primary float-right" href="/step3">Continue</Button>

        <Button variant="outline-primary float-left" href="/step1">Back</Button>
      </Container>

    );
  }
}


export default Step2;