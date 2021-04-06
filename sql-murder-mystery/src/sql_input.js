import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SQLInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //   <Container fluid="md">
            <Form>
                <Form.Group controlId="query">
                    <Form.Label>Enter your SQL query below:</Form.Label>
                    <Form.Control type="sql" placeholder="..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Run
                </Button>
                <Button variant="primary" type="submit">
                    Reset
                    {/* would want the input box cleared out on click */}
                </Button>
            </Form>
            //   </Container>
        );
    }
}

export default SQLInput;