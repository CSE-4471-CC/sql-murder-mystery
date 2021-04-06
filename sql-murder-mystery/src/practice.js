import React from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//Written in HTML by Thomas Chmura and reactified/edited by Andrew Fecher
class Practice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: '', queryResponse: '', sql1: '', sql1Response: '', sql2: '', sql2Response: '' }

        this.handleQuery = this.handleQuery.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSQL1 = this.handleSQL1.bind(this);
        this.handleSQL1Change = this.handleSQL1Change.bind(this);
        this.handleSQL2 = this.handleSQL2.bind(this);
        this.handleSQL2Change = this.handleSQL2Change.bind(this);
    }
    handleQueryChange(e) {
        e.preventDefault()
        this.setState({ query: e.target.value });
    }
    handleQuery() {
        if (this.state.query == 'SELECT Password FROM Users WHERE name = \'John Doe\'') {
            this.setState({ queryResponse: 'This is an accurate query to get John Doe' });
        }
        else {
            this.setState({ queryResponse: 'try again' });
        }
    }
    handleSQL1() {
        if (this.state.sql1 == '" OR 1=1 --') {
            this.setState({ sql1Response: 'This is an accurate SQL Injection!' });
        }
        else {
            this.setState({ sql1Response: 'try again' });
        }
    }
    handleSQL1Change(e) {
        e.preventDefault()
        this.setState({ sql1: e.target.value });
    }
    handleSQL2() {
        if (this.state.sql2 == '"; SELECT Computer_Number FROM Computers WHERE Name = \'John Doe\' --') {
            this.setState({ sql2Response: 'This is an accurate SQL Batch Injection!' });
        }
        else {
            this.setState({ sql2Response: 'try again' });
        }
    }
    handleSQL2Change(e) {
        e.preventDefault()
        this.setState({ sql2: e.target.value });
    }
    render() {
        return (
            <Container fluid='md'>
                <h2 className='sub-headers'>Let's Practice!</h2>
                <p>SQL Injection can occur when a user is prompted for input on a piece of information, such as a User ID. Instead of putting in their ID, they would input a SQL Statement that runs through the systems database and retrieves sensitive information.
              Let's run through this process with a few simple practice problems so we can get your feet wet before we embark on the real challenge! </p>
                <br />
                <p>In the form below, we're going to retrieve the password information for "John Doe". In the "Username" slot, input the following SQL Query:
                  <b>SELECT Password FROM Users WHERE name = 'John Doe'</b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>SQL Query</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>Query</Form.Label>
                                    <Form.Control value={this.state.query} type='username' placeholder="Enter query here" onChange={this.handleQueryChange}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleQuery}>Run Query</Button>
                                <p> {this.state.queryResponse} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <br />
                <p> Now lets see how we can utilize the above for SQL Injection. For example, if we want to login as the admin, we can use the fact that
                    the admin is generally the first entry in the user database. All we would need to do is get the SQL statement above to return at least the admin's information <br />
                    So, we know that the login will typically use something like: SELECT User_ID FROM Users WHERE User_ID = "$userID" AND Password = "$password" <br />
                    If we were to type in: " OR 1=1 -- in the user name space, the SQL query would look like... <br />
                    SELECT User_ID FROM Users WHERE User_ID = "" OR 1=1 --" AND Password = "$password"<br />
                    Since -- is a comment and 1=1 is true, it will always return all users <br />
                    <b>Type in : " OR 1=1 -- below to sql inject into the system! </b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.sql1} type='username' placeholder="Enter SQL Injection here" onChange={this.handleSQL1Change}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleSQL1}>Login</Button>
                                <p> {this.state.sql1Response} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <p>SQL Batch Injection can be utilitzed to manipulate data outside of the confines of the table used in the login. Multiple SQL statements are joined together in order to retrieve sensitive information from the database.
                In the example below, we're going to retrieve information related to "John Doe" that exists in the same schema as the previous example, but within a different table than the login Users table.
                 </p>
                <br />
                <p>The first SQL statement below is used to access the schema, while we retrieve the necessary server information with the second statement. Copy the combined statement into the login box below:
                          <b>"; SELECT Computer_Number FROM Computers WHERE Name = 'John Doe' --
                          </b>
                </p>
                <Row className="justify-content-md-center">
                    <Col xs={8}>
                        <Form>
                            <div align='center' className='login-form'>
                                <h3 className='sub-headers'>Login</h3>
                                <Form.Group controlId='username'>
                                    <Form.Label className='login-labels'>User_ID</Form.Label>
                                    <Form.Control value={this.state.sql2} type='username' placeholder="Enter SQL Batch injection here" onChange={this.handleSQL2Change}></Form.Control>
                                </Form.Group>
                                <Button className='login-button' variant='primary' onClick={this.handleSQL2}>Login</Button>
                                <p> {this.state.sql2Response} </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <p> <b>Good luck with the Mystery!</b></p>
                <Button variant="outline-primary float-left" href="/rules" >Back</Button>
                <Button variant="outline-primary float-right" href="/step1">Start Game!</Button>
            </Container >

        );
    }
}

export default Practice;
