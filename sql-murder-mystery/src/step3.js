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

        this.state = { isClicked: false, isSuccessful: false, batchSqlCorrect: false, step:0, results: '', user_id: '', password: '' };

        this.handleBatchQuerySuccess = this.handleBatchQuerySuccess.bind(this);
        this.processResults = this.processResults.bind(this);
        this.advance = this.advance.bind(this);
    }

    handleBatchQuerySuccess(isSuccessful) {
        this.setState({ batchSqlCorrect: isSuccessful });
        if (this.state.step < 1) {
            this.setState({ step: 1 });
        }
    }

    processResults(results) {
        this.setState({ results: results });
    }

    advance() {
        if (this.state.step < 2) {
            this.setState({ step: 2 });
        }
    }

    render() {
        let queryResponse = null, continueButton = null, table = null, nextButton = null;
        let loginSQL = <LoginSQL processResults={this.processResults} game_step='S3_B1' batchSqlCorrect={this.handleBatchQuerySuccess} congratsMessage="Congratulations, your SQL Injection was successful!" failureMessage="Hmm it doesn't look like your Injection Query was successful. Please try again."></LoginSQL>;

        if (this.state.step == 1) {
            nextButton = <Button variant="outline-primary float-center" onClick={this.advance}>Got it!</Button>;
        } 
        if (this.state.step > 0) {
            queryResponse = <div>
                <p> Logins do not directly output the results of thier queries to the front end, however they can be manipulated to do so using methods such as inducing errors, manipulating the outfile, sniffing, among many others. <br />
                    Luckily many progams such as SQLMap and other will do this automatically. <br />
                    The system being utilized here will do this automatically and just return the value of the second query made.
				</p>
                {nextButton}
            </div>;
        }
        if (this.state.step > 1) {
            table = <ResponseTable results={this.state.results} />;
            continueButton = continueButton = <Button variant="outline-primary float-right" href="/step4">Continue</Button>;
        }
        
        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Step Three: Figure out the table names</h2>
                <p>In order to retrieve information from the database, you will need more information about the underlying database schema. <b>Use SQL injection to retrieve the names of the tables in the database.</b></p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Container>
                            <h5>Table Names</h5>
                            <h6 className='sub-headers'> SQL Injection</h6>
                            <p className="helper-text"><b>Use SQL Batch Injection to find the names of all tables in the database schema.</b></p>
                            <Hint hint={'We know the database is running SQLite, so you can use the "name" column of SQLite_master to get the list of tables.'}></Hint>
                            <Hint hint={'Make sure to only print out only the type="table" entries.'}></Hint>
                            {loginSQL}
                            {queryResponse}
                            {table}
                        </Container>
                    </Col>
                </Row>
                <Button variant="outline-primary float-left" href="/step2" >Back</Button>
                {continueButton}
            </Container>

        );
    }
}

export default Step3;