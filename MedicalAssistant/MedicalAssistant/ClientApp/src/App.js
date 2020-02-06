import React from 'react';
import { Route,Switch} from 'react-router-dom';
import Layout from './components/Layout';
import DefaultLayout from './components/containers/DefaultLayout/DefaultLayout'
import PatientLayout from './components/containers/PatientLayout/PatientLayout'


export default () => (
  <Switch>
    <Route path="/patient" name="Patient" render={props => <PatientLayout {...props} />} />
    <Route path="/" name="Default" render={props => <DefaultLayout {...props} />} />
  </Switch>
);

