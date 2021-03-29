import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';


class Tables extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>the page where you get info on the tables</h2>
        <p>TBD</p>
        <Button variant="outline-primary float-left" href="/honey" >Back</Button>
        <Button variant="outline-primary float-right" href="/users">Continue</Button>
      </Container>

    );
  }
}


export default Tables;