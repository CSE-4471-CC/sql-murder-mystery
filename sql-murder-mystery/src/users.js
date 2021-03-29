import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Users extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>users?</h2>
        <p>TBD</p>
        <Button variant="outline-primary float-left" href="/tables" >Back</Button>
        <Button variant="outline-primary float-right" href="/building_access">Continue</Button>
      </Container>

    );
  }
}


export default Users;