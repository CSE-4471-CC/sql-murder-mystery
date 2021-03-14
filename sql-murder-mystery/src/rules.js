import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

class Rules extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Rules</h2>
        <p>TBD</p>
        <Button variant="outline-primary" href="/practice" >Start Game!</Button>
      </Container>

    );
  }
}


export default Rules;