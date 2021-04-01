import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import SQLInput from './sql_input'


class Step4 extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <Container fluid='md'>
        <h2 className='sub-headers'>Step Four: User Info</h2>
        <p>finding Tony's user ID... don't want to mess with backend rn but it goes below this</p>
        <p>Now that we know what tables Tony has in his database and what Tony's user ID is, we need to figure out what the column names are. <b>Answer Tony's security questions to learn the column names.</b></p>
        {/* <SQLInput/> */}
        <p>Questions will go here.</p>
        <Button variant="outline-primary float-left" href="/step3" >Back</Button>
        <Button variant="outline-primary float-right" href="/building_access">Continue</Button>
      </Container>

    );
  }
}


export default Step4;