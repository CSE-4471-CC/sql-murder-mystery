import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Practice extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Let's Practice!</h2>
        <p>TBD</p>
        <Button variant="outline-primary" href="/step1">Next</Button>
      </Container>

    );
  }
}


export default Practice;