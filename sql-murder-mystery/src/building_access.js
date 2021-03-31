import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class BuildingAccess extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>building access stuff here!</h2>
        <p>TBD</p>
        <Button variant="outline-primary float-left" href="/table_list" >Back</Button>
        <Button variant="outline-primary float-right" href="/step1" disabled>Continue</Button>
      </Container>

    );
  }
}


export default BuildingAccess;