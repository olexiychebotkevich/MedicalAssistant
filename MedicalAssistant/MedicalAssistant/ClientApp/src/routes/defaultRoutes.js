import React from 'react';


const NormalHomeForm = React.lazy(() => import("../components/HomePage"));
const WrappedNormalLoginForm = React.lazy(() => import("../components/LoginPage"));
const WrappedRegistrationForm = React.lazy(() => import("../components/RegistrationPage"));


const defaultRoutes=[
    { path: '/home', exact: true, name: 'home', component: NormalHomeForm  },
    { path: '/login', exact: true, name: 'login', component: WrappedNormalLoginForm  },
    { path: '/registr', exact: true, name: 'registration', component: WrappedRegistrationForm}
];

export default defaultRoutes;
