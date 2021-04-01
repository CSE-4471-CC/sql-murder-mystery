import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './header'
import Backstory from './backstory'
import Rules from './rules'
import Practice from './practice'
import Step1 from './step1'
import Honey from './honey';
import Tables from './tables';
import Users from './users';
import Step4 from './step4';
import BuildingAccess from './building_access';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Header></Header>
    <div>
      <Switch>
        <Route path='/building_access'>
          <BuildingAccess/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/tables'>
          <Tables/>
        </Route>
        <Route path='/honey'>
          <Honey/>
        </Route>
        <Route path='/rules'>
          <Rules/>
        </Route>
        <Route path='/practice'>
          <Practice/>
        </Route>
        <Route path='/step1'>
          <Step1/>
        </Route>
        <Route exact path='/'>
          <Backstory/>
        </Route>
				<Route path='/step4'>
					<Step4/>
				</Route>
      </Switch>
    </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

