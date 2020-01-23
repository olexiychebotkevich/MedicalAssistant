import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import NormalHomeForm from './components/HomePage/Home';
import WrappedRegistrationForm from './components/RegistrationPage';
import PageDoctor from './components/PageDoctor';
import PagePatient from './components/PagePatient/PagePatient';

import WrappedNormalLoginForm from './components/LoginPage/Login';


export default () => (
  <Layout>
    <Route exact path='/' component={NormalHomeForm} />
    <Route path='/registr' component={WrappedRegistrationForm} />
    <Route path='/pagedoctor' component={PageDoctor} />
    <Route path='/pagepatient' component={PagePatient} />
    <Route path='/login' component={WrappedNormalLoginForm} />
 

  </Layout>
);
