import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import WrappedNormalLoginForm from './components/HomePage/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import WrappedRegistrationForm from './RegistrationPage';



export default () => (
  <Layout>
    <Route exact path='/' component={WrappedNormalLoginForm} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/registr' component={WrappedRegistrationForm} />
 

  </Layout>
);
