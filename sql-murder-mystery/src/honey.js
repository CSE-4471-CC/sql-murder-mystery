import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Honey extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Uh oh!</h2>
        <p>Honey pot time! Not sure if y'all wanted me to do this part, but i'll make a questions template beneath to get things started... </p>
        <Button variant="outline-primary float-right" href="/tables">Continue</Button>
        <Button variant="outline-primary float-left" href="/step1">Back</Button>
      </Container>

    );
  }
}


export default Honey;