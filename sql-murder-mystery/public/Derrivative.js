//backstory.js
import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//confirmsuspect.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//header.js
import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//hint.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

// Written by Lia Ferguson, Julia Workum, and Andrew Fecher
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header></Header>
            <div>
                <Switch>
                    <Route path='/step3'>
                        <Step3 />
                    </Route>
                    <Route path='/step2'>
                        <Step2 />
                    </Route>
                    <Route path='/rules'>
                        <Rules />
                    </Route>
                    <Route path='/practice'>
                        <Practice />
                    </Route>
                    <Route path='/step1'>
                        <Step1 />
                    </Route>
                    <Route exact path='/'>
                        <Backstory />
                    </Route>
                    <Route path='/step4'>
                        <Step4 />
                    </Route>
                    <Route path='/step5'>
                        <Step5 />
                    </Route>
                    <Route path='/paddedcell'>
                        <PaddedCell />
                    </Route>
                    <Route path='/step6'>
                        <Step6 />
                    </Route>
                    <Route path='/step7'>
                        <Step7 />
                    </Route>
                </Switch>
            </div>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

//loginsql.js
import React from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//paddedcell.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//practice.js
import React from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//responseTable.js
import React from 'react';
import './table.css'

//rules.js
import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//step1.js
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//step2.js
import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

//step3.js
import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ResponseTable from './ResponseTable'
import LoginSQL from './loginsql';
import Hint from './hint';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//step4.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Hint from './hint';
import LoginSQL from './loginsql';
import ResponseTable from './ResponseTable';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//step5.js
import React from 'react';
import Row from 'react-bootstrap/Row';
import ReactTimeout from 'react-timeout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import TrojanModal from './trojanmodal';
import Hint from './hint';
import Suspect from './suspect';
import ResponseTable from './ResponseTable';

//step6.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Hint from './hint'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import Suspect from './suspect';
import ConfirmSuspect from './confirmsuspect';
import ResponseTable from './ResponseTable';

//step7.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Hint from './hint'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSQL from './loginsql';
import Suspect from './suspect';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ResponseTable from './ResponseTable';
import Modal from 'react-bootstrap/Modal';

//style.css
/* Written by Lia Ferguson */

.header - content{
    text - align: center;
}

.sub - headers {
    text - align: center;
}


.login - form {
    margin - top: 50px;
    margin - bottom: 100px;
}

.login - button{
    width: 70 %;
}

.form - control{
    width: 70 % !important;
}

.login - labels {
    padding - right: 400px;
}

.hint {
    margin - top: 50px;
}

.sql - results {
    margin - top: 50px;
    width: 70 %;
}

.question - button {
    width: 30 %;
    margin - top: 20px;
    margin - left: 100px;
    margin - bottom: 10px;
}

.answer - text {
    margin: 20px;
}

.sub - headers {
    text - align: center;
}

.mb - 2 {
    margin - left: 225px;
}

.helper - text {
    text - align: center;
}

.instruction - div {
    margin - top: 25px;
}

table, th, td {
    border: 1px solid black;
    border - collapse: collapse;
}

th, td {
    padding: 15px;
}

.second - row - qq {
    margin - left: 14px;
}

.col - table {
    margin - top: 80px;
}

.suspect - field {
    width: 100 %;
}


.button - padding {
    margin - top: 30px;
}

.begin - button {
    margin - left: 527px;
}

.pad - cell - button {
    margin - left: 475px;
}

.question - text {
    text - align: center;
}

.q - text {
    width: 50 %;
}

.button - group - suspect {
    margin - left: 500px;
}

.center - text {
    margin - left: 240px;
}

.text - under - table {
    margin - top: 50px;
}

suspect.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';

//table.css
/*Andrew Fecher*/
.sqltable {
    font - family: Arial, Helvetica, sans - serif;
    border - collapse: collapse;
    width: 100 %;
    display: flex;
    justify - content: center;
    align - items: center;
}

    .sqltable td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

    .sqltable tr: nth - child(even) {
    background - color: #f2f2f2;
}

    .sqltable tr: hover {
    background - color: #ddd;
}

    .sqltable th {
    padding - top: 12px;
    padding - bottom: 12px;
    text - align: left;
    background - color: #ABCDEF;
    color: white;
}

//trojanmodal.js
import React from 'react';
import ReactTimeout from 'react-timeout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';
