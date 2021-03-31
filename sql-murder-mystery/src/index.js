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
import BuildingAccess from './building_access';
import TableList from './table_list';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Header></Header>
    <div>
      <Switch>
        <Route path='/building_access'>
          <BuildingAccess/>
        </Route>
        <Route path='/table_list'>
          <TableList/>
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
        <Route path='/'>
          <Backstory/>
        </Route>
      </Switch>
    </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

