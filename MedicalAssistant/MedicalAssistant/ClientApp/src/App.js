import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import WrappedNormalLoginForm from './components/HomePage/Home';
import WrappedRegistrationForm from './components/RegistrationPage';
import PageDoctor from './components/PageDoctor';




export default () => (
  <Layout>
    <Route exact path='/' component={WrappedNormalLoginForm} />
    <Route path='/registr' component={WrappedRegistrationForm} />
    <Route path='/pagedoctor' component={PageDoctor} />
 

  </Layout>
);
