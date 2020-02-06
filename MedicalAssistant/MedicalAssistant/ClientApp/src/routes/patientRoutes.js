import React from 'react';

const PagePatient = React.lazy(() => import("../components/PagePatient/PagePatient"));



const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient }
];

export default patientRoutes;
