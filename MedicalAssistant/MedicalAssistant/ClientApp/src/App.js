import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import NormalHomeForm from './components/HomePage/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import WrappedRegistrationForm from './RegistrationPage';
import PageDoctor from './components/PageDoctor';
import PagePatient from './components/PagePatient';

import WrappedNormalLoginForm from './components/LoginPage/Login';
import WrappedDynamicFieldSet from './components/Add-recipe/Add-recipe'


export default () => (
  <Layout>
    <Route exact path='/' component={NormalHomeForm} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/registr' component={WrappedRegistrationForm} />
    <Route path='/pagedoctor' component={PageDoctor} />
    <Route path='/pagepatient' component={PagePatient} />
    <Route path='/login' component={WrappedNormalLoginForm} />
    <Route path='/addrecipe' component={WrappedDynamicFieldSet} />
    
 

  </Layout>
);
