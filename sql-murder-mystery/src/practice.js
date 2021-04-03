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
        <p>SQL Injection most often happens when a user is prompted for input on a piece of information, such as a User ID. Instead of putting in their ID, they would input a SQL Statement that will run through the systems database and retrieve sensitive information.
              Let's run through this process with a simple practice problem so we can get your feet wet before we embark on the real challenge! </p>
              </br>
              <p>In the form below, we're going to retrieve the password information for "John Doe". In the "Username" slot, input the following SQL Query:</p>
                  <b>SELECT Password FROM user_database WHERE name = 'John Doe'</b>  
                </p>
                <form>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="username" class="form-control">
                  </div>
                  </br>
                  <button type="button" class="btn btn-primary" onclick="sqlReveal()">Login</button>
                </form>
                </br>
                <ul class="list-group" id="sql-output-reveal">
                  <li class="list-group-item">Password = Password123</li>
                </ul>
                </br>
                <p> <b>Good luck with the Mystery!</b></p>
        <Button variant="outline-primary float-left" href="/rules" >Back</Button>
        <Button variant="outline-primary float-right" href="/step1">Start Game!</Button>
      </Container>

    );
  }
}


export default Practice;
