import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import SQLInput from './sql_input'


class BuildingAccess extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Get the Tables!</h2>
        <p>We know from our experiance with Tony, that he would only be using a SQLite server. So, we can use standard practices for SQLite to get the </p>
        <SQLInput />
        <Button variant="outline-primary float-left" href="/users" >Back</Button>
        <Button variant="outline-primary float-right" href="/building_access">Continue</Button>
      </Container>

    );
  }
}


export default BuildingAccess;