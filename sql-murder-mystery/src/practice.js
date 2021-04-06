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
        <p>SQL Injection most often when a user is prompted for input on a piece of information, such as a User ID. Instead of putting in their ID, they would input a SQL Statement that runs through the systems database retrieves sensitive information.
              Let's run through this process with a few simple practice problems so we can get your feet wet before we embark on the real challenge! </p>
              </br>
              <p>In the form below, we're going to retrieve the password information for "John Doe". In the "Username" slot, input the following SQL Query:</p>
                  <b>SELECT Password FROM Users WHERE name = 'John Doe'</b>  
                </p>
                <form>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="username" class="form-control">
                  </div>
                  </br>
                  <button type="button" class="btn btn-primary" onclick=sqlRevealPractice()>Login</button>
                </form>
                </br>
                <p>SQL Batch Injection can be utilitzed to manipulate data outside of the confines of the table used in the login. Multiple SQL statements are joined together in order to retrieve sensitive information for the database. 
                  In the example below, we're going to retrieve information related to "John Doe" that exists in the same schema as the previous example, but within a different table that would be impossible to access via the usual login page.
                 </p>
                  </br>
                  <p>The first SQL statement below is used to access the schema, while we retrieve the necessary server information with the second statement. Copy the combined statement into the following login box below: </p>
                      <b>"; SELECT Computer_Number FROM Computers WHERE Name = 'John Doe' --
                      </b>  
                    </p>
                    <form>
                      <div class="form-group">
                        <label for="username">Username</label>
                        <input type="username" class="form-control">
                      </div>
                      </br>
                      <button type="button" class="btn btn-primary" onclick=sqlBatchRevealPractice()>Login</button>
                    </form>
                    </br>
                </br>
                <p> <b>Good luck with the Mystery!</b></p> 
        <Button variant="outline-primary float-left" href="/rules" >Back</Button>
        <Button variant="outline-primary float-right" href="/step1">Start Game!</Button>
      </Container>

    );
  }
}


export default Practice;
