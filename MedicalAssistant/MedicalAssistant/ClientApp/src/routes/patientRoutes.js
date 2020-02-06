import React from 'react';
import PagePatient from '../components/PagePatient/PagePatient';
import WrappedRegistrationForm from '../components/RegistrationPage';
import WrappedNormalLoginForm from '../components/LoginPage/Login';


const patientRoutes=[
    { path: '/pagepatient', exact: true, name: 'Patient', component: PagePatient},
    { path: '/login', exact: true, name: 'Login', component: WrappedNormalLoginForm},
    { path: '/registr', exact: true, name: 'Registration', component: WrappedRegistrationForm}
];

export default patientRoutes;