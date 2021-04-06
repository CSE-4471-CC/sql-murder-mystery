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
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';
import BuildingAccess from './building_access';
import PaddedCell from './paddedcell';
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
				<Route path='/step5'>
					<Step5/>
				</Route>
				<Route path='/paddedcell'>
					<PaddedCell/>
				</Route>
				<Route path='/step6'>
					<Step6/>
				</Route>
				<Route path='/step7'>
					<Step7/>
				</Route>
      </Switch>
    </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

