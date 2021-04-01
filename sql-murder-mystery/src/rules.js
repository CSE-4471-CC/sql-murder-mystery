import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
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
        <p>
          This is an interactive game that will show you how SQL Injection can be used to exploit webpages in order to retrieve confidential information from their underlying database.
          You will also test your knowledge of SQL Injection and other important security topics through quiz-style questions and interactive activities.
          Each step of the game will require you to successfully execute SQL statements or prove your knowledge about SQL Injection to uncover clues that will help you to solve the unsolved murder of Tony Stark.
          There will be helpful hints along the way if you need help with the task at hand. 
          
          As part of the game, text files may be downloaded onto your computer in order to relay important clues or information to you. They will be stored in a file called "SQL-Mystery-Game-Files" on your Desktop. <b> Good luck and happy hacking!</b>
        </p>
        <Button variant="outline-primary float-left" href="/backstory" >Back</Button>
        <Button variant="outline-primary float-right" href="/practice" >Practice!</Button>
      </Container>

    );
  }
}


export default Rules;