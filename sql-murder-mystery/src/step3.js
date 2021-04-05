import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ResponseTable from './ResponseTable'
import ListGroup from 'react-bootstrap/ListGroup';
import LoginSQL from './loginsql';
import Hint from './hint';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//Andrew Fecher

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClicked: false, isQuerySuccessful: false, batchSqlCorrect: false, results: '', user_id: '', password: '' };

        this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
        this.processResults = this.processResults.bind(this);
    }

    handleBatchQuerySuccess(isSuccessful) {
        this.setState({ batchSqlCorrect: isSuccessful });
    }

    processResults(results) {
        this.setState({ results: results });
    }

    render() {
        let queryResponse, continueButton;
        let loginSQL = <LoginSQL processResults={this.processResults} game_step='S3_B1' batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage="Congratulations, your SQL Injection was successful! Here are the results of your query:" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>;
        let batchSQL1 = <Container>
                <h5>Office Almond Snackers</h5>
                <h6 className='sub-headers'> SQL Injection</h6>
                <p className="helper-text"><b>Use SQL Batch Injection to check if anyone in the office has an affinity for almonds. Only use columns you absolutely need in your query please.</b></p>
                <Hint hint={'Think back to the table, columns, and technique you used for your most recent SQL Injection.'}></Hint>
                {loginSQL}
            </Container>;
        
        if (this.state.isClicked && this.state.isQuerySuccessful) {
            queryResponse = <div>
                <p> Congratulations! You successfully bypassed authentication by using SQL Injection!
                If a website's backend does not sanitize user input before using it in a SQL query,
                you are able to "hijack" the query by placing a condition that is always true into
                the query in order to bypass the intended programatic flow.
				</p>
            </div>;
            continueButton = <Button variant="outline-primary float-right" href="/step4">Continue</Button>;
        } else if (this.state.isClicked && !this.state.isQuerySuccessful) {
            queryResponse = <div>
                <p> Hmm, looks like your SQL Injection wasn't quite right. Please try again.
                Remember, use the hint if you are stumped!
				</p>
            </div>;
            continueButton = null;
        }
        return (
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
                <Row className="justify-content-md-center">
                    {batchSQL1}
                    <ResponseTable results={this.state.results} />
                </Row>
                <Button variant="outline-primary float-left" href="/step2" >Back</Button>
                {continueButton}
            </Container>

        );
    }
}

export default Step3;