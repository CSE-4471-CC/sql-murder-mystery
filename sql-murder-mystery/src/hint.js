import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

// Written by Lia Ferguson

class Hint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Accordion className='hint'>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Hint
                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>{this.props.hint}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Hint;