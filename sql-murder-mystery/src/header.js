import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid='true'>
                <Jumbotron>
                    <h1 class="display-4 header-content">Welcome to SQL Murder Mystery!</h1>
                    <p class="lead header-content">Can you figure out who murdered Tony Stark?</p>
                </Jumbotron>
            </Container>
        );
    }
}

export default Header;