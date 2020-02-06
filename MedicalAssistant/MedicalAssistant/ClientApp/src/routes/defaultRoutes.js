import React from 'react';
import NormalHomeForm from '../components/HomePage/Home';
import WrappedRegistrationForm from '../components/RegistrationPage';
import WrappedNormalLoginForm from '../components/LoginPage/Login';


const defaultRoutes=[
    { path: '/home', exact: true, name: 'Головна', component: NormalHomeForm  },
    { path: '/login', exact: true, name: 'Логін', component: WrappedNormalLoginForm  },
    { path: '/registr', exact: true, name: 'Реєстрація', component: WrappedRegistrationForm}
];

export default defaultRoutes;
