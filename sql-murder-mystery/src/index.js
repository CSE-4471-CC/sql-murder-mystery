import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './header'
import Backstory from './backstory'
import Rules from './rules'
import Practice from './practice'
import Step1 from './step1'
import Step2 from './step2';
import Step3 from './step3';
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
        <Route path='/step4'>
          <Step4/>
        </Route>
        <Route path='/step3'>
          <Step3/>
        </Route>
        <Route path='/step2'>
          <Step2/>
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

