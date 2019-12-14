import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import NormalHomeForm from './components/HomePage/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import WrappedRegistrationForm from './RegistrationPage';
import PageDoctor from './components/PageDoctor';


import WrappedNormalLoginForm from './components/LoginPage/Login';


export default () => (
  <Layout>
    <Route exact path='/' component={NormalHomeForm} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/registr' component={WrappedRegistrationForm} />
    <Route path='/pagedoctor' component={PageDoctor} />
    <Route path='/login' component={WrappedNormalLoginForm} />
 

  </Layout>
);
