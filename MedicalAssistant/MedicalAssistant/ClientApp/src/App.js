import React, { Suspense, Component } from "react";
import {Redirect, Route, Switch } from "react-router";
import SpinnerWidget from './components/spinner';

//Containers
import DefaultLayout from './components/containers/DefaultLayout/DefaultLayout'
import PatientLayout from './components/containers/PatientLayout/PatientLayout'

//components
const Home = React.lazy(() => import("./components/HomePage/Home"));
const WrappedRegistrationForm = React.lazy(() => import("./components/RegistrationPage"));
const WrappedNormalLoginForm = React.lazy(() => import("./components/LoginPage/Login"));
const PageDoctor = React.lazy(() => import("./components/PageDoctor"));
const PagePatient = React.lazy(() => import("./components/PagePatient/PagePatient"));




class App extends Component {
  render() {
      return (
          // <Layout>
        <Suspense fallback={<SpinnerWidget loading="true"/>}>
          <Switch>

            <Route path="/patient" name="Patient" render={props => <PatientLayout {...props} />} />
            <Route path="/" name="Default" render={props => <DefaultLayout {...props} />} />
          

          </Switch>
        </Suspense>
      
      );
  }
};
export default App;


